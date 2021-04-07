const fs = require('fs');
const path = require('path');
const axios = require('axios');
const parser = require('fast-xml-parser');
const dashify = require('dashify');

const podcastUrl = 'https://anchor.fm/s/530ebe8/podcast/rss';

const enumerateJSONFiles = (dir, action) => {
  const files = fs.readdirSync(dir).filter(path => path.includes('.json'));
  files.forEach(file => {
    const fileName = file.split('.')[0];
    const filePath = path.resolve(dir, file);
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    action({ data, fileName, filePath });
  });
};

const getDefaultDateFromPodcast = p => {
  let date = new Date(Date.parse(p.pubDate));
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return new Date(year, month, day);
};

const getSermonFromPodcast = podcast => {
  const defaultSermon = {
    title: podcast.title,
    leader: 'Jeremy Buck',
    series: '',
    date: getDefaultDateFromPodcast(podcast),
    summary: '',
    podcastUrl: podcast.link,
    files: [],
  };
  if (podcast.description) {
    const dataPairs = podcast.description.split('\n');
    dataPairs.forEach(pair => {
      const [key, value] = pair.split(':').map(p => p.trim());
      switch (key.toLowerCase()) {
        case 'leader':
          defaultSermon.leader = value;
          break;
        case 'series':
          defaultSermon.series = value;
          break;
        case 'date':
          defaultSermon.date = new Date(value);
          break;
        case 'summary':
          defaultSermon.summary = value;
          break;
      }
    });
  }
  return defaultSermon;
};

const fetchPodcasts = async () => {
  let newSermonCount = 0;
  console.log(`Fetching sermons at ${podcastUrl}`);
  const res = await axios.get(podcastUrl, {
    responseType: 'xml',
  });
  // Validate the podcast xml data
  if (parser.validate(res.data)) {
    var sermons = {};
    var json = parser.parse(res.data, {
      ignoreAttributes: false,
    });
    // Get the podcasts from the fetched rss data
    var podcastsFromFeed = json.rss.channel.item;
    // For each podcast...
    podcastsFromFeed.forEach(p => {
      const sermon = getSermonFromPodcast(p);
      const year = sermon.date.getFullYear();
      const filePath = path.resolve(`./content/sermons/year/${year}.json`);
      const fileExists = fs.existsSync(filePath);
      // Load file if it exists and hasn't been loaded
      if (fileExists && !sermons[year]) {
        console.log(year);
        sermons[year] = {
          sermons: require(filePath).sermons,
          filePath,
          save: false,
        };
      }
      // Initialize to new object if needed
      sermons[year] = sermons[year] || {
        sermons: [],
        filePath,
        save: true,
      };
      const sermonsList = sermons[year].sermons;
      // Add sermon to list if it hasn't already been added
      if (!sermonsList.find(s => s.podcastUrl === p.link)) {
        sermonsList.push(sermon);
        sermons[year].save = true;
        newSermonCount++;
      }
    });
    console.log(`Added ${newSermonCount} new sermons`);
    // Save sermon files that changed
    Object.keys(sermons).forEach(key => {
      if (sermons[key].save) {
        // Sort sermons before saving
        const sermonList = sermons[key].sermons.sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );
        const data = {
          title: key,
          sermons: sermonList,
        };
        console.log(`Saving sermons to ${sermons[key].filePath}...`);
        fs.writeFileSync(sermons[key].filePath, JSON.stringify(data, null, 2));
      }
    });
  }
};

const buildSeries = () => {
  const sermonsDir = path.resolve('./content/sermons/year');
  const seriesDir = path.resolve('./content/sermons/series');
  const seriesFiles = {};
  enumerateJSONFiles(sermonsDir, ({ data }) => {
    data.sermons.forEach(s => {
      if (s.series) {
        seriesFiles[s.series] = [...(seriesFiles[s.series] || []), s];
      }
    });
  });
  Object.keys(seriesFiles).forEach(key => {
    const fileName = dashify(key);
    const seriesSermons = [...seriesFiles[key]].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );
    const seriesFilePath = path.resolve(seriesDir, `${fileName}.json`);
    let seriesData;
    if (fs.existsSync(seriesFilePath)) {
      const requireFile = require(seriesFilePath);
      seriesData = {
        ...requireFile,
        title: key,
        sermons: seriesSermons,
      };
    } else {
      seriesData = {
        title: key,
        sermons: seriesSermons,
      };
    }
    // Save series data back to file
    fs.writeFileSync(seriesFilePath, JSON.stringify(seriesData, null, 2));
  });
};

const buildIndex = (dir, entryGenerator) => {
  const indexPaths = [];
  enumerateJSONFiles(dir, ({ data, fileName, filePath }) => {
    indexPaths.push(entryGenerator({ data, fileName, filePath }));
  });
  return indexPaths;
};

const writeSermonsToIndex = (filePath, sermons) => {
  // Read the original file
  const fileData = fs.readFileSync(filePath);
  // Parse into data object
  const data = JSON.parse(fileData);
  // Write the sermons to the data object
  data.sermons = sermons;
  // Write the data object back to the file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const writeIndex = (index, filePath) => {
  // Create the index file
  fs.writeFileSync(filePath, JSON.stringify(index, null, 2));
};

const buildSiteContent = () => {
  // Fetch the podcasts to update sermon content
  fetchPodcasts();
  // Fill the series content
  buildSeries();
  const sermons = [];
  const dirSermons = path.resolve('./content/sermons/year');
  const dirSeries = path.resolve('./content/sermons/series');
  console.log(`Building index for sermons at ${dirSermons}...`);
  const sermonIndex = buildIndex(dirSermons, ({ data, fileName }) => {
    sermons.push(...data.sermons);
    return {
      title: data.title,
      path: `/year/${fileName}`,
    };
  }).reverse();
  console.log(`Building index for series at ${dirSeries}`);
  sermonIndex.push(
    ...buildIndex(dirSeries, ({ data, fileName, filePath }) => {
      writeSermonsToIndex(
        filePath,
        sermons.filter(sermon => sermon.series === data.title),
      );
      return {
        title: data.title,
        path: `/series/${fileName}`,
      };
    }),
  );
  console.log('Writing index...');
  writeIndex(sermonIndex, path.resolve('./content/sermons', 'index.json'));
};

buildSiteContent();

module.exports = buildSiteContent;
