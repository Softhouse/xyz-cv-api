'use strict';

/**
 * Module dependencies.
 */
var userToLanguageConnectorController = require('./userToLanguageConnector.controller');
var responseHandler = require('../../utils/response.handler');
var authentication = require('../../middleware/authentication.middleware');

module.exports = function(routes) {

    // create an userToLanguageConnector
    routes.post('/', authentication.isAllowedOrSelf('canEditUser', 'body', 'userId'), function(request, response) {
        userToLanguageConnectorController.createUserToLanguageConnector(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get all userToLanguageConnectors by query
    routes.get('/', authentication.isAllowed('canViewUser'), function(request, response) {
        userToLanguageConnectorController.getUserToLanguageConnectors(request.query)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    //get userToLanguageConnector by id
    routes.get('/:id', authentication.isAllowed('canViewUser'), function(request, response) {
        userToLanguageConnectorController.getUserToLanguageConnectorById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    // update a userToLanguageConnector given an id and an object
    routes.put('/:id', authentication.isAllowedOrOwnConnector('canEditUser', userToLanguageConnectorController.getUserToLanguageConnectorById), function(request, response) {
        userToLanguageConnectorController.updateUserToLanguageConnector(request.params.id, request.body, request.headers['x-forwarded-email'])
            .then(responseHandler.sendSuccessfulPutJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    // delete the userToLanguageConnector with the given id
    routes.delete('/:id', authentication.isAllowedOrOwnConnector('canEditUser', userToLanguageConnectorController.getUserToLanguageConnectorById), function(request, response) {
        userToLanguageConnectorController.deleteUserToLanguageConnectorById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete userToLanguageConnectors containing the given user id
    routes.delete('/user/:id', authentication.isAllowedOrSelf('canEditUser', 'params', 'id'), function(request, response) {
        userToLanguageConnectorController.deleteUserToLanguageConnectorsByUserId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete userToLanguageConnectors containing the given language id
    routes.delete('/language/:id', authentication.isAllowed('canEditUser'), function(request, response) {
        userToLanguageConnectorController.deleteUserToLanguageConnectorsByLanguageId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
