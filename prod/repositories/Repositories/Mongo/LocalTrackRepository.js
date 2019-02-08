"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseMongoRepository_1 = require("../../BaseRepositories/BaseMongoRepository");
var LocalTrackRepository = /** @class */ (function (_super) {
    __extends(LocalTrackRepository, _super);
    function LocalTrackRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nameCollection = "localTrack";
        return _this;
    }
    LocalTrackRepository.prototype.getAllLocalTracks = function (data) {
        var cursorLocalTrack = null;
        if (!data.web) {
            cursorLocalTrack = this.getAll({ private: false });
        }
        else {
            cursorLocalTrack = this.getAll({});
        }
        if (data.page !== undefined) {
            var page = parseInt(data.page);
            var pagesize = data.limit ? parseInt(data.limit) : 50;
            cursorLocalTrack.skip(pagesize * (page - 1)).limit(pagesize);
        }
        return cursorLocalTrack.toArray();
    };
    return LocalTrackRepository;
}(BaseMongoRepository_1.BaseMongoRepository));
exports.default = LocalTrackRepository;
