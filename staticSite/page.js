var fs = require('fs'); 
var path = require('path');
var http = require('http');
var server = http.createServer();

server.on('request', function(request, response) {
  // If there are any query parameters on the request, get rid of them.
  // This server doesn't use any such parameters.
  var filename = request.url.replace(/\?.*/, '');
  if (filename === "/") {
    filename = "/index.html";
  }
  // fs.exists takes a filename and calls a callback with the result of
  // whether that filename exists.
  fs.exists(__dirname + filename, function(exists) {
    if (exists) {
      response.writeHead(200, {});

      // Here we read the file contents and send them to the response.
      var readStream = fs.createReadStream(__dirname + filename);
      readStream.on('data', function(data) {
        response.write(data);
      });

      readStream.on('end', function() {
        response.end();
      });
    } else {
      // that file didn't exist, so send back a 404 Not Found
      var body = '404 NOT FOUND';
      response.writeHead(404, {
        'Content-Length': body.length,
        'Content-Type': 'text/plain'
      });
      response.write(body);
      response.end();
    }
  });
});

console.log("Now listening on port 9001");
server.listen(9001);