'use strict';

var fileDao = require('./file.dao');
var Promise = require('bluebird');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

function validateFile(file) {
    return new Promise(function(resolve, reject) {
        if (file && file.generatedName && file.originalName) {
            file = utils.extend(getFileTemplate(), file);
            return resolve(file);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

function getFileTemplate() {
    return {
        generatedName: null,
        originalName: null
    };
}

exports.createNewFile = function(file) {
    return fileDao.createNewFile(file);
};

exports.getFileById = function(id) {
    return fileDao.getFileById(id);
};

exports.getFiles = function(query) {
    return fileDao.getFiles(query);
};

exports.deleteFileById = function(id) {
    return fileDao.deleteFileById(id);
};

