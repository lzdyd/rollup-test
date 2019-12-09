const { readdirSync } = require('fs');

const getDirList = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(dir => dir.name);

export default getDirList;
