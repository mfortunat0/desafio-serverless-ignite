import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuidV4 } from 'uuid';

import { document } from '../utils/dynamodbClient';

interface IRequestBody {
  title: string;
  deadline: Date;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { title, deadline } = JSON.parse(event.body) as IRequestBody;
  const { userid } = event.pathParameters;

  await document.put({
    TableName: 'todos',
    Item: {
      id: uuidV4(),
      title,
      user_id: userid,
      done: false,
      deadline: new Date(deadline)
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo created!",
    }),
    headers: {
      "Content-type": "application/json",
    }
  };
}