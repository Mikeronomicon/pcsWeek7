var http = require('http');
var server = http.createServer();

server.on('request', function(request, response) {
  var body = "Hello World!";
  console.log(request.method + ' ' + request.url);
  console.log(JSON.stringify(request.headers));

  response.writeHead(200, {
    'Content-Length': body.length,
    'Content-Type': 'text/plain'
  });
  response.write(body);
  response.end();
});

console.log("Now listening on port 9001");
server.listen(9001);