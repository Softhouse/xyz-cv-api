'use strict';

var languageDao = require('./language.dao');
var Promise = require('bluebird');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

// TODO: Make the validation more covering
function validateLanguage(language) {
    return new Promise(function(resolve, reject) {
        if (language && language.name) {
            language = utils.extend(getLanguageTemplate(), language);
            return resolve(language);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

function getLanguageTemplate() {
    return {
        name: null
    };
}

exports.createNewLanguage = function(languageObject) {
    return validateLanguage(languageObject)
        .then(languageDao.createNewLanguage);
};

exports.getLanguageById = function(id) {
    return languageDao.getLanguageById(id);
};

exports.getLanguages = function(query) {
    return languageDao.getLanguages(query);
};

exports.deleteLanguageById = function(id) {
    return languageDao.deleteLanguageById(id);
};

exports.purgeIndices = function() {
    return languageDao.purgeIndices();
};

exports.createIndex = function(fields, options) {
    return languageDao.createIndex(fields, options);
};
