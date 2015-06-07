var exec = require('child_process').exec;
var querystring1 = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function defaulthaha(response, request) {
  console.log("requestHandlers default");
  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}
exports.defaulthaha = defaulthaha;

function start(response,request) {
  console.log("Handler start");

  exec("sleep 8 && ls -l", { timeout: 10000, maxBuffer: 20000 * 1024},
  function (error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();
  });
}
exports.start = start;

function upload(response, request) {
  console.log("Handler upload");
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    console.log("upload parsing done");
    fs.renameSync(files.upload.path, "/tmp/test.png");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Handler upload rev image: <img src='/show'/>");
    response.end();
  });
}
exports.upload = upload;

function show(response,request) {
  console.log("Handler show");

  fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if (error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });

}
exports.show = show;
