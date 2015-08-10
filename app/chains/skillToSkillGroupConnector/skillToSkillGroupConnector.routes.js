'use strict';

/**
 * Module dependencies.
 */
var skillToSkillGroupConnectorController = require('./skillToSkillGroupConnector.controller');
var responseHandler = require('../../utils/response.handler');

module.exports = function(routes) {

    // create a skillToSkillGroupConnector
    routes.post('/', function(request, response) {
        skillToSkillGroupConnectorController.createSkillToSkillGroupConnector(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get all skillToSkillGroupConnectors by query
    routes.get('/', function(request, response) {
        skillToSkillGroupConnectorController.getSkillToSkillGroupConnectors(request.query)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete the skillToSkillGroupConnector with the given id
    routes.delete('/:id', function(request, response) {
        skillToSkillGroupConnectorController.deleteSkillToSkillGroupConnectorById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get skillToSkillGroupConnectors for skillGroup
    routes.get('/skillGroup/:id', function(request, response) {
        skillToSkillGroupConnectorController.getSkillToSkillGroupConnectorsById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get skillToSkillGroupConnectors for skill
    routes.get('/skill/:id', function(request, response) {
        skillToSkillGroupConnectorController.getSkillToSkillGroupConnectorsBySkillId(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete skillToSkillGroupConnectors containing the given skillGroup id
    routes.delete('/skillGroup/:id', function(request, response) {
        skillToSkillGroupConnectorController.deleteSkillToSkillGroupConnectorsById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete skillToSkillGroupConnectors containing the given skill id
    routes.delete('/skill/:id', function(request, response) {
        skillToSkillGroupConnectorController.deleteSkillToSkillGroupConnectorsBySkillId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
