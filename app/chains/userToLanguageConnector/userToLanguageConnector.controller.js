'use strict';

var Promise = require('bluebird');
var userToLanguageConnectorDao = require('./userToLanguageConnector.dao');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

function validateUserToLanguageConnector(userToLanguageConnector) {
    return new Promise(function(resolve, reject) {
        if (userToLanguageConnector && userToLanguageConnector.userId && userToLanguageConnector.languageId && userToLanguageConnector.level) {
            if (userToLanguageConnector.level !== null) {
                userToLanguageConnector = utils.extend(getUserToLanguageConnectorTemplate(), userToLanguageConnector);
                return resolve(userToLanguageConnector);
            }
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

function getUserToLanguageConnectorTemplate() {
    return {
        userId: null,
        languageId: null,
        level: null
    };
}

function setUserToLanguageConnectorProperties(body) {
    return function(userToLanguageConnector) {
        return new Promise(function(resolve, reject) {
            userToLanguageConnector = utils.extend(getUserToLanguageConnectorTemplate(), userToLanguageConnector);
            userToLanguageConnector = utils.extend(userToLanguageConnector, body);
            return resolve(userToLanguageConnector);
        });
    };
}

exports.assignLanguagesToUser = function(languages, userId) {
    var promises = [];
    languages.forEach(function(languageId) {
        var userToLanguageConnector = {
            userId: userId,
            languageId: languageId
        };
        promises.push(exports.createUserToLanguageConnector(userToLanguageConnector));
    });

    return Promise.all(promises);
};

exports.createUserToLanguageConnector = function(userToLanguageConnector) {
    return validateUserToLanguageConnector(userToLanguageConnector)
        .then(userToLanguageConnectorDao.createUserToLanguageConnector);
};

exports.getUserToLanguageConnectorById = function(id) {
    return userToLanguageConnectorDao.getUserToLanguageConnectorById(id);
};

exports.getUserToLanguageConnectorsByUserId = function(userId) {
    return userToLanguageConnectorDao.getUserToLanguageConnectorsByUserId(userId);
};

exports.getUserToLanguageConnectorsByLanguageId = function(languageId) {
    return userToLanguageConnectorDao.getUserToLanguageConnectorsByLanguageId(languageId);
};

exports.getUserToLanguageConnectors = function(query) {
    return userToLanguageConnectorDao.getUserToLanguageConnectors(query);
};

exports.updateUserToLanguageConnector = function(id, body) {
    return exports.getUserToLanguageConnectorById(id)
        .then(setUserToLanguageConnectorProperties(body))
        .then(validateUserToLanguageConnector)
        .then(utils.setIdOnBody(id))
        .then(userToLanguageConnectorDao.updateUserToLanguageConnector);
};

exports.deleteUserToLanguageConnectorById = function(id) {
    return userToLanguageConnectorDao.deleteUserToLanguageConnector(id);
};

exports.deleteUserToLanguageConnectors = function(userToLanguageConnectors) {
    var promises = [];
    userToLanguageConnectors.forEach(function(userToLanguageConnector) {
        promises.push(exports.deleteUserToLanguageConnectorById(userToLanguageConnector._id));
    });

    return Promise.all(promises);
};

exports.deleteUserToLanguageConnectorsByUserId = function(userId) {
    return exports.getUserToLanguageConnectorsByUserId(userId)
        .then(exports.deleteUserToLanguageConnectors);
};
