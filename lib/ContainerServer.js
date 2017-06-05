var fs = require('fs'); 
var http = require('http');
var httpProxy = require('http-proxy');
var rest = require('restler');

var Promisify = require('../Promisify');

var ImageServer = require('./ImageServer');

function mixin(target, source) {
    source = source || {};
    Object.keys(source).forEach(function(key) {
        target[key] = source[key];
    });

    return target;
}

var ContainerServer = rest.service(function(server, certificate, key) {
    this.baseURL = server;
    this.defaults.cert = certificate;
    this.defaults.key = key;
}, {
}, {
    // Server Functions

    GetServer: function() { return Promisify(this.get('/1.0')); },
    UpdateServer: function(server, ETag) { return Promisify(this.json('post', '/1.0', server)); },
    // TODO: Maybe this should 'reject' if false?
    HasExtension: function(extension) { return Promisify(this.get('/1.0'), findExtension).then(function(data) { return data.indexOf(extension) > -1 }); },

    // Certificate Functions
    GetCertificateFingerprints: function() { return Promisify(this.get('/1.0/certificates'), pathToName); },
    GetCertificates: function() { return Promisify(this.get('/1.0/certificates?recursion=1')); },
    GetCertificate: function(fingerprint) { return Promisify(this.get('/1.0/certificates/' + fingerprint)); },
    CreateCertificate: function(certificate) { return Promisify(this.json('post', '/1.0/certificates', certificate)); },
    UpdateCertificate: function(fingerprint, certificate, ETag) { return Promisify(this.json('put', '/1.0/certificates/' + fingerprint, certificate)); },
    DeleteCertificate: function(fingerprint) { return Promisify(this.del('/1.0/certificates/' + fingerprint)); },

    // Container Functions
    GetContainerNames: function() { return Promisify(this.get('/1.0/containers'), pathToName); },
    GetContainers: function() { return Promisify(this.get('/1.0/containers?recursion=1')); },
    GetContainer: function(name) { return Promisify(this.get('/1.0/containers/' + name)); },
    CreateContainer: function(container) { return Promisify(this.json('post', '/1.0/containers', container)); },
    UpdateContainer: function(name, container, ETag) { return Promisify(this.json('put', '/1.0/containers/' + name, container)); },
    RenameContainer: function(name, container) { return Promisify(this.json('post', '/1.0/containers/' + name, container)); },
    MigrateContainer: function(name, container) { return Promisify(this.json('post', '/1.0/containers/' + name, container)); },
    DeleteContainer: function(name) { return Promisify(this.del('/1.0/containers/' + name)); },

    ExecContainer: function(containerName, exec, args) { return Promisify(this.post('/1.0/containers/' + name + '/exec', exec)); },

    GetContainerFile: function(containerName, path) { return Promisify(this.get('/1.0/containers/' + containerName + '/files?path=' + path)); },
    CreateContainerFile: function(containerName, path, args) { return Promisify(this.json('post', '/1.0/containers/' + containerName + '/files?path=' + path)); },
    DeleteContainerFile: function(containerName, path) { return Promisify(this.del('/1.0/containers/' + containerName + '/files?path=' + path)); },

    GetContainerSnapshotNames: function(containerName) { return Promisify(this.get('/1.0/containers/' + containerName + '/snapshots'), pathToName); },
    GetContainerSnapshots: function(containerName) { return Promisify(this.get('/1.0/containers/' + containerName + '/snapshots')); },
    GetContainerSnapshot: function(containerName, name) { return Promisify(this.get('/1.0/containers/' + containerName + '/snapshots/' + name)); },
    CreateContainerSnapshot: function(containerName, snapshot) { return Promisify(this.json('post', '/1.0/containers/' + containerName + '/snapshots', snapshot)); },
    RenameContainerSnapshot: function(containerName, name, container) { return Promisify(this.json('post', '/1.0/containers/' + containerName + '/snapshots/' + name, container)); },
    MigrateContainerSnapshot: function(containerName, name, container) { return Promisify(this.json('post', '/1.0/containers/' + containerName + '/snapshots/' + name, container)); },
    DeleteContainerSnapshot: function(containerName, name) { return Promisify(this.del('/1.0/containers/' + containerName + '/snapshots/' + name)); },

    GetContainerState: function(name) { return Promisify(this.get('/1.0/containers/' + name + '/state')); },
    UpdateContainerState: function(name, state, ETag) { return Promisify(this.json('put', '/1.0/containers/' + name + '/state', state)); },

    GetContainerLogfiles: function(name) { return Promisify(this.get('/1.0/containers/' + name + '/logs')); },
    GetContainerLogfile: function(name, filename) { return Promisify(this.get('/1.0/containers/' + name + '/state/' + filename)); },
    DeleteContainerLogfile: function(name, filename) { return Promisify(this.del('/1.0/containers/' + name + '/state/' + filename)); },

    // Event handling functions
    GetEvents: function() { return Promisify(this.get('/1.0/events')).then(function(result) {
            console.log(result)
        }); 
    },

    // Image functions
    CreateImage: function(image, args) { return Promisify(this.json('post', '/1.0/images/', image)); },
    UpdateImage: function(fingerprint, image, ETag) { return Promisify(this.json('post', '/1.0/images/' + fingerprint, image)); },
    DeleteImage: function(fingerprint) { return Promisify(this.del('/1.0/images/' + fingerprint)); },
    RefreshImage: function(fingerprint) { return Promisify(this.json('post', '/1.0/images/' + fingerprint + '/refresh', {})) },
    CreateImageSecret: function(fingerprint) { return Promisify(this.json('post', '/1.0/images/' + fingerprint + '/secret', {})) },
    CreateImageAlias: function(alias) { return Promisify(this.json('post', '/1.0/images/aliases', alias)) },
    UpdateImageAlias: function(name, alias, ETag) { return Promisify(this.json('put', '/1.0/images/aliases/' + name, alias)) },
    RenameImageAlias: function(name, alias) { return Promisify(this.json('post', '/1.0/images/aliases/' + name, alias)) },
    DeleteImageAlias: function(name) { return Promisify(this.del('/1.0/images/aliases/' + name)); },

    // Network functions ("network" API extension)
    GetNetworkNames: function() { return Promisify(this.get('/1.0/networks'), pathToName); },
    GetNetworks: function() { return Promisify(this.get('/1.0/networks?recursion=1')); },
    GetNetwork: function(name) { return Promisify(this.get('/1.0/networks/' + name)); },
    CreateNetwork: function(network) { return Promisify(this.json('post', '/1.0/networks', network)); },
    UpdateNetwork: function(name, network, ETag) { return Promisify(this.json('put', '/1.0/networks/' + name, network)); },
    RenameNetwork: function(name, network) { return Promisify(this.json('post', '/1.0/networks/' + name, network)); },
    DeleteNetwork: function(name) { return Promisify(this.del('/1.0/networks/' + name)); },

    // Operation functions
    GetOperation: function(uuid) { return Promisify(this.get('/1.0/operations/' + uuid)); },
    DeleteOperations: function(uuid) { return Promisify(this.del('/1.0/operations/' + uuid)); },
    GetOperationWebsocket: function(uuid, secret) {  },

    // Profile functions
    GetProfileNames: function() { return Promisify(this.get('/1.0/profiles'), pathToName); },
    GetProfiles: function() { return Promisify(this.get('/1.0/profiles?recursion=1')); },
    GetProfile: function(name) { return Promisify(this.get('/1.0/profiles/' + name)); },
    CreateProfile: function(profile) { return Promisify(this.json('post', '/1.0/profiles', profile)); },
    UpdateProfile: function(name, profile, ETag) { return Promisify(this.json('put', '/1.0/profiles/' + name, profile)); },
    RenameProfile: function(name, profile) { return Promisify(this.json('post', '/1.0/profiles/' + name, profile)); }, 
    DeleteProfile: function(name) { return Promisify(this.del('/1.0/profiles/' + name)); },


    /*
	// Storage pool functions ("storage" API extension)
	GetStoragePoolNames() (names []string, err error)
	GetStoragePools() (pools []api.StoragePool, err error)
	GetStoragePool(name string) (pool *api.StoragePool, ETag string, err error)
	CreateStoragePool(pool api.StoragePoolsPost) (err error)
	UpdateStoragePool(name string, pool api.StoragePoolPut, ETag string) (err error)
	DeleteStoragePool(name string) (err error)

	// Storage volume functions ("storage" API extension)
	GetStoragePoolVolumeNames(pool string) (names []string, err error)
	GetStoragePoolVolumes(pool string) (volumes []api.StorageVolume, err error)
	GetStoragePoolVolume(pool string, volType string, name string) (volume *api.StorageVolume, ETag string, err error)
	CreateStoragePoolVolume(pool string, volume api.StorageVolumesPost) (err error)
	UpdateStoragePoolVolume(pool string, volType string, name string, volume api.StorageVolumePut, ETag string) (err error)
	DeleteStoragePoolVolume(pool string, volType string, name string) (err error)

	// Internal functions (for internal use)
	RawQuery(method string, path string, data interface{}, queryETag string) (resp *api.Response, ETag string, err error)
	RawWebsocket(path string) (conn *websocket.Conn, err error)
    */
});

function pathToName(data) {
    var result = [];
    data.forEach(function(input) {
        result.push(input.replace(/^.*[\\\/]/, ''))
    })
    return result;
}

function findExtension(data) {
    return data.api_extensions;
}

mixin(ContainerServer.prototype, ImageServer.prototype);

module.exports = ContainerServer;
