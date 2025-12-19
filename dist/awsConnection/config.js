"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamoClient = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
exports.dynamoClient = new client_dynamodb_1.DynamoDBClient({
    region: process.env.AWS_REGION || "ap-south-1",
});
