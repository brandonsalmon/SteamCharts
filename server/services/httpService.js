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
            try {
                result = JSON.parse(str);
                callback(result);
            }
            catch (exception) {
                console.error(exception);
            }
        });
    }

    self.getJson = function (options, callback) {
        var callbackResult = function (response) {
            try {
                self.readJsonResponse(response, callback);
            } catch (exception) {
                console.error(exception);
            }
        }

        self.http.request(options, callbackResult).end();
    }
}

module.exports = httpService;
