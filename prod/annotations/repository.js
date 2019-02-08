"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typedi_1 = require("typedi");
function RepositoryMongo() {
    return function (object, propertyName, index) {
        var repositoryName = propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
        var repository = typedi_1.Container.get(repositoryName);
        typedi_1.Container.registerHandler({
            object: object,
            propertyName: propertyName,
            index: index,
            value: function (containerInstance) { return repository; }
        });
    };
}
exports.RepositoryMongo = RepositoryMongo;
