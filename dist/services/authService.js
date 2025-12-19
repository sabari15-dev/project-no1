"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.createUser = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const dynamo_1 = require("../dbConnection/dynamo");
const USERS_TABLE = process.env.USERS_TABLE;
const createUser = async (user) => {
    const db = (0, dynamo_1.getDB)();
    await db.send(new client_dynamodb_1.PutItemCommand({
        TableName: USERS_TABLE,
        Item: {
            userId: { S: user.userId },
            email: { S: user.email },
            password: { S: user.password },
            role: { S: user.role },
        },
    }));
};
exports.createUser = createUser;
const findUserByEmail = async (email) => {
    const db = (0, dynamo_1.getDB)();
    const res = await db.send(new client_dynamodb_1.QueryCommand({
        TableName: USERS_TABLE,
        IndexName: "email-index", // GSI
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: {
            ":e": { S: email },
        },
        Limit: 1,
    }));
    if (!res.Items || res.Items.length === 0)
        return null;
    const u = res.Items[0];
    return {
        userId: u.userId.S,
        email: u.email.S,
        password: u.password.S,
        role: u.role.S,
    };
};
exports.findUserByEmail = findUserByEmail;
