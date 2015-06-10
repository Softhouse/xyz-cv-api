var request = require('request');
var config = require('../config/config');
var q = require('q');

var url = config.api_url_dev + 'access';

function parseAll(body) {
    var deferred = q.defer();
    var accesses = JSON.parse(body);
    if (accesses) {
        deferred.resolve(accesses);
    }
    deferred.resolve([]);
    return deferred.promise;
};

function parseOne(body) {
    var deferred = q.defer();
    parseAll(body)
        .then(function(accesses) {
            if (accesses.length) {
                deferred.resolve(accesses[0]);
            }
            deferred.resolve(null);
        });
};

// res[0]: the response
// res[1]: the body
// res[2]: the error
function parseResponse(response) {
    return q.promise(function(resolve, reject) {
        if (!response) {
            return reject(new Error('Invalid response format'));
        }
        if (response[2]) {
            return reject(response[2]);
        }
        return resolve(response);
    });
};

function parsePost(response) {
    return q.promise(function(resolve, reject) {
        switch(response[0].statusCode) {
            case 200:
                return resolve(response[1]);
            case 400:
                return reject(new Error('The JSON object in the request was omitted.'));
            case 500:
                return reject(new Error('The item could not be saved.'));
            default:
                return reject(new Error('Not a valid response code.'));    
        }
    });
};

function parseGet(response) {
    return q.promise(function(resolve, reject) {
        switch(response[0].statusCode) {
            case 200:
                return resolve(response[1]);
            case 404:
                return reject(new Error('No item with the given id was found.'));
            case 500:
                return reject(new Error('The item/items could not be fetched.'));
            default:
                return reject(new Error('Not a valid response code.'));    
        }
    });
};

function parsePut(response) {
    return q.promise(function(resolve, reject) {
        switch(response[0].statusCode) {
            case 204:
                return resolve(response[1]);
            case 400:
                return reject(new Error('The JSON object in the request was omitted.'));
            case 500:
                return reject(new Error('The item could not be saved.'));
            default:
                return reject(new Error('Not a valid response code.'));    
        }
    });
};

function parseDelete(response) {
    return q.promise(function(resolve, reject) {
        switch (response[0].statusCode) {
            case 204:
                return resolve(response[1]);
            case 404:
                return reject(new Error('No item with the given id was found.'));
            case 500:
                return reject(new Error('The item could not be removed.'));
            default:
                return reject(new Error('Not a valid response code.'));
        };
    });
};

exports.createNewAccess = function(access) {
    var options = {
        uri: url,
        method: 'POST',
        json: access
    };

    return q.nfcall(request, options)
        .then(parseResponse)
        .then(parsePost);
};

exports.getAccessesByAttributeId = function(id) {
    var options = {
        uri: url + '?attribute_id=' + id,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(parseResponse)
        .then(parseGet)
        .then(parseAll);
};

exports.getAccessesByRoleId = function(id) {
    var options = {
        uri: url + '?role_id=' + id,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(parseResponse)
        .then(parseGet)
        .then(parseAll);
};

exports.getAllAccesses = function() {
    var options = {
        uri: url,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(parseResponse)
        .then(parseGet)
        .then(parseAll);
};

exports.deleteAccess = function(accessId) {
    var options = {
        uri: url + '/' + accessId,
        method: 'DELETE'
    };

    return q.nfcall(request, options)
        .then(parseResponse)
        .then(parseDelete);
};