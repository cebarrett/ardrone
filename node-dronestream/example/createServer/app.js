var http = require("http"),
    drone = require("../../index");


var server = http.createServer(function(req, res) {
  require("fs").createReadStream(__dirname + "/index.html").pipe(res);
});

drone.listen(server, {ip: "192.168.1.110"});
server.listen(5555);
