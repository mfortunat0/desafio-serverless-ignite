import { APIGatewayProxyHandler } from "aws-lambda";

import { document } from '../utils/dynamodbClient';

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;

  const response = await document.scan({
    TableName: 'todos',
    FilterExpression: '#userid = :userid',
    ExpressionAttributeNames: {
        '#userid': 'user_id',
    },
    ExpressionAttributeValues: {
        ':userid': userid,
    },
  }).promise();

  const todos = response.Items;

  return {
    statusCode: 201,
    body: JSON.stringify({
      todos,
    }),
    headers: {
      "Content-type": "application/json",
    }
  };
}