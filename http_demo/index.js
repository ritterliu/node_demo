var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.defaulthaha;
handle["/start"] = requestHandlers.start;
handle["/show"] = requestHandlers.show;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);
