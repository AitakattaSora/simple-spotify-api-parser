const axios = require('axios');
const config = require('config');

const OAUTH_TOKEN = config.get('oAuthToken');

const instance = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + OAUTH_TOKEN,
  },
  params: {
    market: 'ES',
  },
});

module.exports = API = {
  getTotal: async () => {
    try {
      const response = await instance.get('me/tracks');

      return response.data.total;
    } catch (e) {
      console.log('Error: ', e);
    }
  },
  getSongsData: async (offset) => {
    try {
      const response = await instance.get('me/tracks', {
        params: {
          limit: 50,
          offset,
        },
      });

      return response.data;
    } catch (e) {
      console.log('Error: ', e);
    }
  },
};
