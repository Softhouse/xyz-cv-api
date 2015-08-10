'use strict';

/**
 * Module dependencies.
 */

var responseHandler = require('../../utils/response.handler');
var fileHandler = require('../../utils/file.handler');
var fileController = require('./file.controller');

module.exports = function(routes) {

    //post a file
    routes.post('/', function(request, response) {
        fileHandler.checkIfSuccess(request, response)
            .then(fileController.createNewFile)
            .then(responseHandler.sendSuccessUploadJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    // get files by query
    routes.get('/', function(request, response) {
        fileController.getFiles(request.query)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get a file by the given id
    routes.get('/:id', function(request, response) {
        fileController.getFileById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete a file in both api and dao given an id
    routes.delete('/:id', function(request, response) {
        fileController.getFileById(request.params.id)
            .then(fileHandler.deleteFile)
            .then(fileController.deleteFileById)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get a file by the given id
    routes.get('/thumbnail/:id', function(request, response) {
        return responseHandler.sendThumbnailResponse(response)(request.params.id);
    });

    return routes;
};
