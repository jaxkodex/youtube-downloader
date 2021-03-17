let Youtube = require('./youtube.js');

(async function () {
  let info = await Youtube.getInfo('https://www.youtube.com/watch?v=KzVw4TSBN5E');
})()