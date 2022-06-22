var http = require("http");
var server = http.createServer(function (req, res) {
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`default`);
    res.end();
  } else if (req.url == "/school") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`school`);
    res.end();
  } else {
    res.end("invalid-request");
  }
});

server.listen(3000);
console.log("server listening at 3000 port");
