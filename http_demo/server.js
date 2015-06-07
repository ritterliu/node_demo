var http = require('http');
var url = require('url');
//var http = require('http');

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;

    //Drop the favicon request
    if (pathname == "/favicon.ico") {
      return;
    }

    console.log("onRequest pathname:" + pathname);
    route(pathname, handle, response, request);

    // var postData;
    // request.setEncoding("utf8");
    // request.addListener("data", function(postDataChunk) {
    //   postData += postDataChunk;
    //   console.log("data:" + postDataChunk);
    // });
    //
    // request.addListener("end", function() {
    //   route(pathname, handle, response, postData);
    // });
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server start");
}

exports.start = start;
