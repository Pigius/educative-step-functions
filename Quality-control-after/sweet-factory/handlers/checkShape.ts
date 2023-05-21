import { APIGatewayProxyResult } from "aws-lambda";
import { SecretsManager } from "aws-sdk";

const secretsManager = new SecretsManager();

interface Event {
  shape: string;
}

export const handler = async (event: Event): Promise<APIGatewayProxyResult> => {
  try {
    const secretName = process.env.SECRET_NAME;
    const data = await secretsManager
      .getSecretValue({ SecretId: secretName })
      .promise();
    const secretValue: string[] = JSON.parse(data.SecretString);

    if (!secretValue.includes(event.shape)) {
      throw new Error("Invalid shape");
    }

    return { validShape: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
