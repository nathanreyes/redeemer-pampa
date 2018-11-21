const fs = require('fs');
const path = require('path');

const buildIndex = (dir, keyGenerator) => {
  const files = fs
    .readdirSync(dir)
    .filter(path => path.includes('.json') && path !== 'index.json');
  const indexPaths = [];
  files.forEach(file => {
    if (typeof keyGenerator === 'function') {
      const filePath = path.resolve(dir, file);
      const fileData = fs.readFileSync(filePath);
      const data = JSON.parse(fileData);
      indexPaths.push(keyGenerator(data));
    } else {
      indexPaths.push(file.split('.')[0]);
    }
  });
  // Create the index file
  fs.writeFileSync(
    path.resolve(dir, 'index.json'),
    JSON.stringify(indexPaths, null, 2),
  );
  console.log(indexPaths);
};

module.exports = buildIndex;
