import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME;

const handler: APIGatewayProxyHandler = async (event) => {
  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: tableName,
    Item: {
      id: event?.id,
      name: event?.name,
      email: event?.email,
    },
  };

  try {
    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Record created successfully." }),
    };
  } catch (error) {
    console.error("Error creating record:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred while creating the record.",
      }),
    };
  }
};

export { handler };
