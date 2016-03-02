'use strict';

/**
 * Module dependencies.
 */
var languageController = require('./language.controller');
var responseHandler = require('../../utils/response.handler');
var authentication = require('../../middleware/authentication.middleware');
var config = require('config');

module.exports = function(routes) {

    // create a language
    routes.post('/', authentication.isAllowed('canViewLanguage'), function(request, response) {
        languageController.createNewLanguage(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get languages by query
    routes.get('/', authentication.isAllowed('canViewLanguage'), function(request, response) {
        languageController.getLanguages(request.query)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get a language by the given id
    routes.get('/:id', authentication.isAllowed('canViewLanguage'), function(request, response) {
        languageController.getLanguageById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete a language given an id
    routes.delete('/:id', authentication.isAllowed('canEditLanguage'), function(request, response) {
        languageController.deleteLanguageById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // create an indice
    routes.post('/_indice', authentication.hasAllowedEmail(config.SUPER_USERS), function(request, response) {
        languageController.createIndex(request.body, request.query)
            .then(responseHandler.sendSuccessfulPutJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete all indices for languages
    routes.delete('/_indice', authentication.hasAllowedEmail(config.SUPER_USERS), function(request, response) {
        languageController.purgeIndices()
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
