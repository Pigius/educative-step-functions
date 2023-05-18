import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

const tableName = process.env.DYNAMODB_TABLE;

const createRecord: APIGatewayProxyHandler = async (event) => {
  const data = JSON.parse(event.body || "{}");

  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: tableName,
    Item: {
      id: data.id,
      name: data.name,
      email: data.email,
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

export { createRecord };
