const fs = require('fs');
const API = require('./api/api');
const parseData = require('./modules/dataParser.js');

(async () => {
  try {
    const total = await API.getTotal();
    console.log('Tracks to process:', total);
    console.log('Starting...');

    const data = [];

    for (let offset = 0; offset <= total; offset = offset + 50) {
      const dataToParse = await API.getSongsData(offset);
      const tracks = parseData(dataToParse, offset);

      data.push(...tracks);
    }

    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

    console.log('Finished. Results are saved in data.json file');
  } catch (e) {
    console.log('Error: ', e);
  }
})();
