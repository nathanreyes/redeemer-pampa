const fs = require('fs');
const path = require('path');

const buildIndex = (dir, entryGenerator) => {
  const files = fs
    .readdirSync(dir)
    .filter(path => path.includes('.json') && path !== 'index.json');
  const indexPaths = [];
  files.forEach(file => {
    const fileName = file.split('.')[0];
    const filePath = path.resolve(dir, file);
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
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

module.exports = {
  buildIndex,
  writeSermonsToIndex,
  writeIndex,
};
