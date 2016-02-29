'use strict';

var request = require('request-promise');
var config = require('config');
var Promise = require('bluebird');
var responseHandler = require('../../utils/response.handler');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

var url = config.API_URL + 'language';

exports.createNewLanguage = function(language) {
    var options = {
        resolveWithFullResponse: true,
        uri: url,
        method: 'POST',
        json: language,
        gzip: true
    };

    return request(options)
        .then(responseHandler.parsePost)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getLanguageById = function(id) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '/' + id,
        method: 'GET',
        json: true,
        gzip: true
    };

    return request(options)
        .then(responseHandler.parseGet)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getLanguages = function(query) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + utils.getQueryByObject(query),
        method: 'GET',
        gzip: true
    };

    return request(options)
        .then(responseHandler.parseGetPolyQuery)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.deleteLanguageById = function(id) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '/' + id,
        method: 'DELETE'
    };

    return request(options)
        .then(responseHandler.parseDelete)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.createIndex = function(fields, query) {
    var options = {
        resolveWithFullResponse: true,
        uri: config.API_URL + '_indices/language' + utils.getQueryByObject(query),
        method: 'POST',
        json: fields
    };

    return request(options)
        .then(responseHandler.parsePostIndex)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.purgeIndices = function() {
    var options = {
        resolveWithFullResponse: true,
        uri: config.API_URL + '_indices/language',
        method: 'DELETE'
    };

    return request(options)
        .then(responseHandler.parseDelete)
        .catch(errorHandler.throwDREAMSHttpError);
};
