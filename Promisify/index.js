var Promisify = function(request, responseInterceptor) {
        return new Promise(function (resolve, reject) {
            request.on('success', function (data) {
                if(responseInterceptor) {
                    resolve(responseInterceptor(data.metadata));
                }
                resolve(data.metadata);
            }).on('error', function(err) {
                reject(err);
            });
        });
     }
// export
module.exports = Promisify;