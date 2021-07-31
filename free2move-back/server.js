var express = require('express');
var app = express();

const chokidar = require("chokidar");
const watcher = chokidar.watch(".", { persistent: true, cwd: __dirname, ignored: "server.js" });

const port = 8080;

const init = function () {
  // on nettoie les requires
  clearRequires();
};

init();

watcher.on("ready", () => {
  console.log("chokidar ready");

  watcher.on("change", (path, stats) => {
    console.log("Clearing node cache");
    clearRequires();
    // si on a changé les fichiers, on recharge tout
    init();
  });
});
/**
 * GESTION DU CACHE DE REQUIRE
 */

function clearRequires() {
  Object.keys(require.cache).forEach(function (id) {
    if (id.toString().includes(__dirname)) {
      console.log(`Clearing key ${id}`);
      delete require.cache[id];
    }
  });
}
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world');
});


app.get('/file', function (req, res) {
  var file = require('./files/file.json')
  res.status(200).json(file)
});



app.listen(port, () => console.log('Express server started'))
