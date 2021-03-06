var fs = require('fs'); 
var rest = require('restler');
var Promisify = require('../Promisify');

var ImageServer = rest.service(function(server) {
    this.baseURL = server;
}, {
}, {
    // ImageServer functions
    GetImages: function() { return Promisify(this.get('/1.0/images?recursion=1')); },
    GetImageFingerprints: function() { return Promisify(this.get('/1.0/images'), pathToName); },
    GetImage: function(fingerprint) { return Promisify(this.get('/1.0/images/' + fingerprint)); },
    GetImageFile: function(fingerprint, req) { },

    GetPrivateImage: function(fingerprint, secret) { return Promisify(this.get('/1.0/images/' + fingerprint + '?secret=' + secret)); },
    GetPrivateImageFile: function(fingerprint, secret, req) { },

    GetImageAliases: function() { return Promisify(this.get('/1.0/images/aliases?recursion=1')); },
    GetImageAliasNames: function() { return Promisify(this.get('/1.0/images/aliases', pathToName)); },

    CopyImage: function(image, target, args) { return this.get('/1.0/images/aliases/' + name); },
 
});

function pathToName(data) {
    var result = [];
    data.forEach(function(input) {
        result.push(input.replace(/^.*[\\\/]/, ''))
    })
    return result;
}

module.exports = ImageServer;
