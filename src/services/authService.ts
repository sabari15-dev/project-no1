import {
  PutItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";

import { User } from "../types/user";
import { getDB } from "../dbConnection/dynamo";

const USERS_TABLE = process.env.USERS_TABLE as string;

export const createUser = async (user: User): Promise<void> => {
  const db = getDB();

  await db.send(
    new PutItemCommand({
      TableName: USERS_TABLE,
      Item: {
        userId: { S: user.userId },
        email: { S: user.email },
        password: { S: user.password },
        role: { S: user.role },
      },
    })
  );
};

export const findUserByEmail = async (
  email: string
): Promise<User | null> => {
  const db = getDB();

  const res = await db.send(
    new QueryCommand({
      TableName: USERS_TABLE,
      IndexName: "email-index", // GSI
      KeyConditionExpression: "email = :e",
      ExpressionAttributeValues: {
        ":e": { S: email },
      },
      Limit: 1,
    })
  );

  if (!res.Items || res.Items.length === 0) return null;

  const u = res.Items[0];
  return {
    userId: u.userId.S!,
    email: u.email.S!,
    password: u.password.S!,
    role: u.role.S as "user" | "admin",
  };
};
