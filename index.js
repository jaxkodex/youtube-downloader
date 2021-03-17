let Youtube = require('./youtube.js');

async function search (url) {
  document.getElementById('buscar').disabled = true;
  document.getElementById('search-result').classList.remove('show');
  let info = await Youtube.getInfo(url);
  document.getElementById('result-title').innerText = info.videoDetails.title;
  document.getElementById('result-image').src = info.videoDetails.thumbnail.thumbnails.filter(i => i.width > 240).map(i => i.url)[0];
  document.getElementById('buscar').disabled = false;
  document.getElementById('result').innerText = '';
  document.getElementById('search-result').classList.add('show');
}

async function download(url) {
  document.getElementById('descargar-wrapper').classList.add('loading');
  let { fileName } = await Youtube.download(url);
  document.getElementById('result').innerText = `Archivo descargado en: ${fileName}`;
  document.getElementById('descargar-wrapper').className = '';
}

async function openFolder() {
  Youtube.openFolder();
}

function init () {
  document.getElementById('buscar').addEventListener('click', (e) => {
    e.preventDefault();
    let url = document.getElementById('url').value;
    search(url);
  });

  document.getElementById('descargar').addEventListener('click', (e) => {
    e.preventDefault();
    let url = document.getElementById('url').value;
    download(url);
  });

  document.getElementById('open-folder').addEventListener('click', (e) => {
    e.preventDefault();
    openFolder();
  });
};

(async function () {
  init();
  // await getInfo('DuGoIWZ4CN8');
  // await download('https://www.youtube.com/watch?v=DuGoIWZ4CN8');

  console.info('done');
})();