var PORT = 3333;

var http = require('http');
var url=require('url');
var fs=require('fs');
var mine=require('./mine').types;
var path=require('path');

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("pathname:" + pathname);

    if (pathname.charAt(pathname.length - 1) == "/") {
        //如果访问目录
        pathname += "index.html"; //指定为默认网页
    }
    var realPath = path.join("xml", pathname);
    console.log("realPath:" + realPath);
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    console.log("ext:" + ext);
    fs.exists(realPath, function (exists) {
        if (!exists) {
            console.log(realPath + " !exists");
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            console.log(realPath + " exists");
            fs.readFile(realPath, "utf-8", function (err, file) {
                if (err) {
                    console.log("Read error:" + err);
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    console.log("Read succeed");
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "utf-8");
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");