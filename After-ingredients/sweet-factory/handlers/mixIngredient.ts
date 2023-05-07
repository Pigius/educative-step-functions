import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const getRandomMixingTime = () => {
  const minTime = 10; // 10 seconds
  const maxTime = 360; // 6 minutes in seconds

  return Math.floor(Math.random() * (maxTime - minTime + 1) + minTime);
};

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const mixingTime = getRandomMixingTime();

  return {
    statusCode: 200,
    body: JSON.stringify({
      waitTime: mixingTime,
    }),
  };
};
