"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDB = void 0;
const config_1 = require("../awsConnection/config");
const getDB = () => config_1.dynamoClient;
exports.getDB = getDB;
