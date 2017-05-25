var fs = require('fs'); 
var cert = fs.readFileSync('client.crt');
var key = fs.readFileSync('client.key');

var ContainerServer = require('./lib/ContainerServer');
var ImageServer = require('./lib/ImageServer');

var server = new ContainerServer('https://tiamat.dragontek.com:8443', cert, key);
var images = new ImageServer('https://us.images.linuxcontainers.org')

var container = {
    "name": "my-new-container",
    "architecture": "x86_64",
    "profiles": ["default"],
    "source": {"type": "image", "alias": "debian/latest"}
}
server.CreateContainer(container).then(function(result) {
    console.log(result);
}, function(error) {
    console.error(error);
});