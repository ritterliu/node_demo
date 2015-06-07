function route(pathname, handle, response, request) {
  console.log('route:' + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    console.log("No requestHandlers can handle:" + pathname);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("pathname :" + pathname + " not exists!");
    response.end();
  }
}

exports.route = route;
