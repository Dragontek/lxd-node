var ContainerServer = require('./classes/ContainerServer');

var server = new ContainerServer('https://node1.dragontek.com:8443');

server.GetContainers().then(function(containers) {
    console.log(containers);
});