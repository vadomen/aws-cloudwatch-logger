"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var winston_1 = require("winston");
var winston_cloudwatch_1 = require("winston-cloudwatch");
var Logger = /** @class */ (function () {
    function Logger(stage, level, service) {
        this.level = level;
        this.stage = stage;
        if (this.stage === 'prod') {
            this.transports = [
                new winston_cloudwatch_1.default({
                    logGroupName: 'testing',
                    logStreamName: 'first',
                    awsRegion: 'us-east-1'
                })
            ];
        }
        else {
            this.transports = [
                new winston_1.default.transports.Console(),
            ];
        }
        this.logger = winston_1.default.createLogger({
            level: this.level,
            defaultMeta: { service: service },
            transports: this.transports
        });
    }
    Logger.create = function (stage, level, service) {
        return new Logger(stage, level, service);
    };
    Logger.prototype.log = function (message, tags) {
        return this.logger.info(message, tags);
    };
    Logger.prototype.warn = function (message, tags) {
        return this.logger.warn(message, tags);
    };
    Logger.prototype.error = function (message, tags) {
        return this.logger.error(message, tags);
    };
    Logger.prototype.debug = function (message, tags) {
        return this.logger.debug(message, tags);
    };
    Logger.prototype.verbose = function (message, tags) {
        return this.logger.debug(message, tags);
    };
    return Logger;
}());
exports.Logger = Logger;
