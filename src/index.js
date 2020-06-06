const fetch = require('node-fetch');
const fs = require('fs');
const config = require('config');

const OAUTH_TOKEN = config.get('oAuthToken');

const getTotal = async () => {
  try {
    const url = `https://api.spotify.com/v1/me/tracks?market=ES`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: OAUTH_TOKEN,
      },
    });
    const data = await response.json();
    return data.total;
  } catch (e) {
    console.log('Error: ', e);
  }
};

const fetchAndParseData = async (offset) => {
  try {
    const url = `https://api.spotify.com/v1/me/tracks?market=ES&limit=50&offset=${offset}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: OAUTH_TOKEN,
      },
    });
    const data = await response.json();

    return parseData(data, offset);
  } catch (e) {
    console.log('Error: ', e);
  }
};

const parseData = (data, offset) => {
  const { items } = data;

  let songData = [];

  items.forEach((item, i) => {
    const artistsArray = item.track.artists;

    let artists = [];

    artistsArray.forEach((a, i) => {
      if (i === artistsArray.length - 1 || artistsArray.length === 1) {
        return (artists += a.name);
      }

      artists += a.name + ', ';
    });

    const name = item.track.name;
    const metadata = `${artists} - ${name}`;

    i = i + offset;
    console.log(i, metadata);
    songData.push(metadata);
  });
  return songData;
};

(async function () {
  try {
    console.log('Starting...');
    console.log('');

    const total = await getTotal();
    console.log(total);
    let data = [];

    for (let i = 1; i <= total; i = i + 50) {
      const someData = await fetchAndParseData(i);
      data = [...data, ...someData];
    }

    const sortedArray = data.sort();

    fs.writeFileSync('songs.txt', sortedArray.join('\n'));
    console.log('-------------------------------------------------');

    console.log('');

    console.log('Finished');
  } catch (e) {
    console.log('Error: ', e);
  }
})();
