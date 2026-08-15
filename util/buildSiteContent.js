const fs = require('fs');
const fsExtra = require('fs-extra');
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

// fast-xml-parser gives `{ '#text': '...', '@_isPermaLink': 'false' }` for tags
// that carry attributes, so unwrap before use.
const getPodcastGuid = p => {
  const guid = p && p.guid;
  if (guid && typeof guid === 'object') return String(guid['#text'] || '').trim();
  return guid ? String(guid).trim() : '';
};

// Identity for a sermon, most stable first. The podcast URL is NOT stable — the
// host moved episodes from anchor.fm to podcasters.spotify.com, which is why the
// archive accumulated a second copy of every 2018-2021 sermon. The trailing
// Anchor episode id survived that move, so it re-links the legacy records.
const getEpisodeId = url => {
  const match = /\/episodes?\/.*-(e[0-9a-z]{5,})\/?$/.exec(url || '');
  return match ? match[1] : '';
};

// A record is indexed under EVERY identity it carries, and matched by trying
// them in order. Existing records predate the guid field, so a feed item has to
// be able to find them by episode id or URL and adopt them.
const getSermonKeys = sermon => {
  const keys = [];
  if (sermon.guid) keys.push(`guid:${sermon.guid}`);
  const episodeId = getEpisodeId(sermon.podcastUrl);
  if (episodeId) keys.push(`episode:${episodeId}`);
  if (sermon.podcastUrl) keys.push(`url:${sermon.podcastUrl}`);
  if (!keys.length) keys.push(`title:${sermon.title}|${new Date(sermon.date).getTime()}`);
  return keys;
};

// Strip a date down to local midnight so year bucketing never drifts across
// timezones. Parsing '2026-01-01' with `new Date` yields UTC midnight, which is
// still Dec 31 in US timezones and would file the sermon under the wrong year.
const toLocalMidnight = date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const getDefaultDateFromPodcast = p => toLocalMidnight(new Date(Date.parse(p.pubDate)));

const parseSermonDate = value => {
  const ymd = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(value.trim());
  if (ymd) return new Date(+ymd[1], +ymd[2] - 1, +ymd[3]);
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : toLocalMidnight(parsed);
};

// Series names are free text typed into the podcast description, so the same
// series arrives spelled several ways ('Acts 2023', 'Acts - 23/24', 'Acts
// 23/24'). Collapse the variants onto one canonical name. Keys are compared
// with case and punctuation flattened, so 'Acts - 23/24' and 'acts 23/24' both
// resolve to the same entry. Add new variants here as they show up.
const SERIES_ALIASES = {
  'acts 2023': 'Acts',
  'acts 2024': 'Acts',
  'acts 23 24': 'Acts',
  philppians: 'Philippians',
  '1 john 3': '1 John',
  '1 john 5': '1 John',
};

// Same idea for speaker names, which are typed by hand into each episode too.
const LEADER_ALIASES = {
  'jeremy buck': 'Jeremy Buck',
};

const normalizeLeader = name => {
  const raw = String(name || '').trim();
  if (!raw) return raw;
  return LEADER_ALIASES[seriesKey(raw)] || raw;
};

const seriesKey = name =>
  String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const normalizeSeries = name => {
  const raw = String(name || '').trim();
  if (!raw) return '';
  const key = seriesKey(raw);
  // Advent is one perennial series, so every Advent sermon lands in the same
  // bucket regardless of the year or theme it was labelled with.
  if (key === 'advent' || key.indexOf('advent ') === 0) return 'Advent';
  return SERIES_ALIASES[key] || raw;
};

const decodeEntities = str =>
  str
    .replace(/&nbsp;/gi, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&amp;/gi, '&');

// The podcast host emits each field as its own block element with no newlines
// between them. Turn block boundaries into line breaks BEFORE stripping tags,
// otherwise every field collapses into one string and only the first survives.
const descriptionToLines = html =>
  html
    .replace(/<\/(p|div|li|h[1-6])\s*>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .split('\n')
    .map(line => decodeEntities(line).replace(/\s+/g, ' ').trim())
    .filter(Boolean);

const getSermonFromPodcast = podcast => {
  const sermon = {
    guid: getPodcastGuid(podcast),
    title: podcast.title,
    leader: 'Jeremy Buck',
    series: '',
    date: getDefaultDateFromPodcast(podcast),
    summary: '',
    podcastUrl: podcast.link,
    files: [],
  };
  if (podcast.description) {
    descriptionToLines(podcast.description).forEach(line => {
      // Split on the FIRST colon only, so values containing colons
      // ('Matthew 12:38-50') survive intact.
      const separator = line.indexOf(':');
      if (separator < 1) return;
      const key = line.slice(0, separator).trim().toLowerCase();
      const value = line.slice(separator + 1).trim();
      if (!value) return;
      switch (key) {
        case 'leader':
          sermon.leader = value;
          break;
        case 'series':
          sermon.series = value;
          break;
        case 'date': {
          const date = parseSermonDate(value);
          if (date) sermon.date = date;
          break;
        }
        case 'summary':
          sermon.summary = value;
          break;
      }
    });
  }
  // Canonicalize here so feed data arrives already normalized and repeat builds
  // are a no-op.
  sermon.series = normalizeSeries(sermon.series);
  sermon.leader = normalizeLeader(sermon.leader);
  return sermon;
};

const getYearFromSermon = sermon => {
  const year = new Date(sermon.date).getFullYear();
  if (isNaN(year) || !year) return 'Unknown';
  return year;
};

const yearDir = () => path.resolve('./content/sermons/year');

// Load every existing sermon into one list. Year files are only a storage
// layout, so dedupe and re-filing have to happen across all of them at once —
// a sermon whose corrected date moves it into another year must not leave a
// stale copy behind in the old one.
const loadExistingSermons = () => {
  const dir = yearDir();
  if (!fs.existsSync(dir)) return [];
  const sermons = [];
  enumerateJSONFiles(dir, ({ data }) => {
    if (data && Array.isArray(data.sermons)) sermons.push(...data.sermons);
  });
  return sermons;
};

const fetchPodcasts = async () => {
  console.log(`Fetching sermons at ${podcastUrl}`);
  const res = await axios.get(podcastUrl, { responseType: 'xml' });
  if (!parser.validate(res.data)) {
    throw new Error(`Podcast feed at ${podcastUrl} is not valid XML`);
  }

  const json = parser.parse(res.data, { ignoreAttributes: false });
  const podcastsFromFeed = [].concat(json.rss.channel.item || []);

  // Seed with what's already on disk. Sermons predating the podcast (the
  // 2011-2017 archive hosted on Backblaze) are not in the feed and must survive
  // untouched.
  const records = [];
  const index = new Map();
  const register = record =>
    getSermonKeys(record).forEach(key => index.set(key, record));
  const lookup = record => {
    const key = getSermonKeys(record).find(k => index.has(k));
    return key ? index.get(key) : null;
  };

  let duplicatesCollapsed = 0;
  loadExistingSermons().forEach(sermon => {
    if (lookup(sermon)) {
      duplicatesCollapsed++;
      return;
    }
    records.push(sermon);
    register(sermon);
  });

  // Merge the feed over the top. The feed is authoritative for the fields it
  // publishes; anything added locally (files) is preserved.
  let added = 0;
  let repaired = 0;
  podcastsFromFeed.forEach(p => {
    const sermon = getSermonFromPodcast(p);
    const existing = lookup(sermon);
    if (!existing) {
      records.push(sermon);
      register(sermon);
      added++;
      return;
    }
    const changed =
      ['leader', 'series', 'summary', 'title'].some(
        field => existing[field] !== sermon[field],
      ) || +new Date(existing.date) !== +new Date(sermon.date);
    if (changed) repaired++;
    // Mutate in place so the record stays the one already in `records`.
    Object.assign(existing, sermon, {
      files: existing.files && existing.files.length ? existing.files : sermon.files,
    });
    register(existing);
  });

  // Canonicalize series names across the whole archive, feed and committed
  // records alike, so the sidebar shows one entry per series.
  let seriesRenamed = 0;
  let leadersRenamed = 0;
  records.forEach(sermon => {
    const series = normalizeSeries(sermon.series);
    if (series !== sermon.series) seriesRenamed++;
    sermon.series = series;
    const leader = normalizeLeader(sermon.leader);
    if (leader !== sermon.leader) leadersRenamed++;
    sermon.leader = leader;
  });
  console.log(
    `Normalized ${seriesRenamed} series names and ${leadersRenamed} speaker names`,
  );

  // Re-bucket everything by year from scratch.
  const byYear = {};
  records.forEach(sermon => {
    const year = getYearFromSermon(sermon);
    (byYear[year] = byYear[year] || []).push(sermon);
  });

  console.log(
    `Added ${added} new sermons, repaired ${repaired}, collapsed ${duplicatesCollapsed} duplicates`,
  );

  // Remove year files that no longer have any sermons, so nothing stale lingers.
  fs.readdirSync(yearDir())
    .filter(file => file.endsWith('.json'))
    .forEach(file => {
      if (!byYear[file.replace('.json', '')]) {
        fs.unlinkSync(path.resolve(yearDir(), file));
      }
    });

  Object.keys(byYear).forEach(year => {
    const filePath = path.resolve(yearDir(), `${year}.json`);
    const sermonList = byYear[year].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );
    console.log(`Saving ${sermonList.length} sermons to ${filePath}...`);
    fs.writeFileSync(
      filePath,
      JSON.stringify({ title: year, sermons: sermonList }, null, 2),
    );
  });
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
      // Read, don't require — require caches, and this file is rewritten below.
      const existing = JSON.parse(fs.readFileSync(seriesFilePath));
      seriesData = {
        ...existing,
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

const buildSiteContent = async () => {
  const dirSermons = path.resolve('./content/sermons/year');
  const dirSeries = path.resolve('./content/sermons/series');
  // Clear content directories
  console.log('Clearing existing sermon series data...')
  fsExtra.emptyDirSync(dirSeries);
  // Refresh sermon content from the podcast feed. The archive is committed to
  // the repo, so a feed outage must not fail the deploy — warn loudly and build
  // from what's already on disk. (Before this was awaited, a failure here was an
  // unhandled rejection that happened to let the build continue.)
  try {
    await fetchPodcasts();
  } catch (err) {
    console.warn(
      `WARNING: could not refresh sermons from the podcast feed, building from committed content instead.\n  ${err.message}`,
    );
  }
  // Fill the series content
  buildSeries();
  // Build sermon indices
  console.log(`Building index for sermons at ${dirSermons}...`);
  const sermons = [];
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

// Run directly (`node util/buildSiteContent.js`) but NOT on require — importing
// this module from nuxt.config.js used to kick off a second, concurrent build
// racing the one the generate hook starts.
if (require.main === module) {
  buildSiteContent().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = buildSiteContent;
