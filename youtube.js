const { shell } = require('electron');
const path = require('path');
const fs = require('fs');
const ytdl = require('ytdl-core');

async function getInfo(url) {
  let id = ytdl.getURLVideoID(url);
  console.log(id);
  let info = await ytdl.getInfo(id);
  console.log('title:', info.videoDetails.title);
  console.log('rating:', info.player_response.videoDetails.averageRating);
  console.log('uploaded by:', info.videoDetails.author.name);
  console.log('Thumbnail', info.videoDetails.thumbnail.thumbnails.filter(i => i.width > 240).map(i => i.url)[0]);
  return info;
}

async function download (url) {
  let info = await getInfo(url);
  return new Promise((resolve, reject) => {
    let fileName = info.videoDetails.title.replace(/[^a-zA-Z ]/g, "");
    fileName = fileName.replace(/ /g, '-');
    let basePath = path.join(process.env.USERPROFILE, '/youtube');
    console.log(`saving to ${basePath}`);
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath);
    }
    fileName = `${basePath}/${fileName}.mp4`;
    let downloaded = ytdl(url).pipe(fs.createWriteStream(fileName));
    downloaded.on('end', () => { resolve({ fileName }) });
    downloaded.on('close', () => { resolve({ fileName }) });
    downloaded.on('error', () => { reject() });
  });
}

async function openFolder() {
  let basePath = path.join(process.env.USERPROFILE, '/youtube');
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
  }
  shell.openPath(basePath);
}

module.exports = {
  getInfo,
  download,
  openFolder
};