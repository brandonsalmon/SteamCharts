function httpService(http) {
    var self = this;

    self.http = http;

    self.readJsonResponse = function (response, callback) {
        var str = '';
        var result = '';

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            result = JSON.parse(str);
            callback(result);
        });
    }

    self.getJson = function (options, callback) {
        var callbackResult = function (response) {
            self.readJsonResponse(response, callback);
        }

        self.http.request(options, callbackResult).end();
    }
}

module.exports = httpService;
