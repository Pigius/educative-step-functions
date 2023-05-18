import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { faker } from "@faker-js/faker/locale/en_GB";

const dynamoDb = new DynamoDB.DocumentClient();

const tableName = process.env.DYNAMODB_TABLE;

const createRecord: APIGatewayProxyHandler = async (event) => {
  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: tableName,
    Item: {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
      email: faker.internet.email(),
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
