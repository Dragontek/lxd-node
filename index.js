var ContainerServer = require('./lib/ContainerServer');

var server = new ContainerServer('https://node1.dragontek.com:8443');

server.GetCertificates().then(function(containers) {
    console.log(containers);
});