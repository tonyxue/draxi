// The original download.js was downloaded from 
// http://www.storminthecastle.com/projects/scrape/scrape.zip
// and the uncessary parts for this project are removed.

var http = require("http");
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

