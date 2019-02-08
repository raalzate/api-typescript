"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var QueryUtil = /** @class */ (function () {
    function QueryUtil() {
    }
    QueryUtil.getQuery = function (name) {
        var directory = path.dirname(fs.realpathSync(__filename)) + "/queries/";
        var query = [];
        try {
            query = JSON.parse(fs.readFileSync(directory + "/" + name + ".json", "utf8"));
        }
        catch (error) {
            console.error(error);
        }
        return query;
    };
    return QueryUtil;
}());
exports.QueryUtil = QueryUtil;
