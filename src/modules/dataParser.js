module.exports = parseData = ({ items }, offset) => {
  const songsData = [];

  items.forEach((item, i) => {
    const artistsArray = item.track.artists;

    const albumName = item.track.album.name;
    const albumCover = item.track.album.images.filter(
      (el) => el.height === 640
    )[0].url;

    const artists = [];

    artistsArray.forEach((a, i) => {
      if (i === artistsArray.length - 1 || artistsArray.length === 1) {
        return (artists += a.name);
      }

      artists += a.name + ', ';
    });

    const name = item.track.name;

    songsData.push({
      id: i + offset + 1,
      artist: artists,
      track: name,
      album: {
        name: albumName,
        artwork: albumCover,
      },
    });
  });

  return songsData;
};
