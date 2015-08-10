'use strict';

var officeDao = require('./office.dao');
var Promise = require('bluebird');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

// TODO: Make the validation more covering
function validateOffice(office) {
    return new Promise(function(resolve, reject) {
        if (office && office.name) {
            office = utils.extend(getOfficeTemplate(), office);
            return resolve(office);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

function getOfficeTemplate() {
    return {
        name: null
    };
}

exports.createNewOffice = function(officeObject) {
    return validateOffice(officeObject)
        .then(officeDao.createNewOffice);
};

exports.getOfficeById = function(id) {
    return officeDao.getOfficeById(id);
};

exports.getOffices = function(query) {
    return officeDao.getOffices(query);
};

exports.deleteOfficeById = function(id) {
    return officeDao.deleteOfficeById(id);
};
