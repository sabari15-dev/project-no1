import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const REGION = process.env.AWS_REGION;

if (!REGION) {
  throw new Error("AWS_REGION env variable not set");
}

export const dynamoClient = new DynamoDBClient({
  region: REGION,
});
