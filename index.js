let request = require('request-promise');
let original_request = require('request');
let fs = require('fs');

let fetchAllStickers = (access_token) => {
  return request('https://graph.facebook.com/graphql', {
    qs: {
      q: 'viewer(){sticker_store{available_packs{nodes{name,stickers{nodes{animated_image,thread_image}}}}}}',
      access_token
    },
    json: true
  })
  .then(res => res.viewer.sticker_store.available_packs.nodes);
}

let download = (url, path) => {
  return new Promise(cb => {
    original_request(url).pipe(fs.createWriteStream(path)).on('finish', cb);
  });
}

(async() => {
  let config = JSON.parse(fs.readFileSync(__dirname + '/config.json'));

  let { access_token } = config;

  let stickerPacks = await fetchAllStickers(access_token);

  let stickersFolderPath = `${__dirname}/stickers`;

  if (!fs.existsSync(stickersFolderPath)) {
    fs.mkdirSync(stickersFolderPath);
  }

  for (pack of stickerPacks) {
    console.log(`Fetching ${pack.name}`);
    continue;

    let stickersPacksPath = `${stickersFolderPath}/${pack.name}`;

    if (!fs.existsSync(stickersPacksPath)) {
      fs.mkdirSync(stickersPacksPath);
    }

    for ([i, sticker] of pack.stickers.nodes.entries()) {
      let uri = null;

      if (sticker.thread_image) {
        uri = sticker.thread_image.uri;

      }

      if (sticker.animated_image) {
        uri = sticker.animated_image.uri;
      }

      let stickerPath = `${stickersPacksPath}/${i}.webp`;

      await download(uri, stickerPath);

      console.log(`Fetched ${pack.name}/${i}`);
    }
  }
})();