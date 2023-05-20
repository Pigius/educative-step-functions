import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

interface Sweet {
  ingredient: string;
  quantity: number;
}

enum SweetShape {
  Square = "Square",
  Circle = "Circle",
  Triangle = "Triangle",
}

interface ShapingRequest {
  sweetBatch: Sweet[];
  shape: SweetShape;
}

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const shapingRequest: ShapingRequest = JSON.parse(event.body);

  // Simulate shaping delay
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Shaping is assumed to always succeed
  const shapedSweets = shapingRequest.sweetBatch.map((sweet) => ({
    ...sweet,
    shape:
      Object.values(SweetShape)[
        Math.floor(Math.random() * Object.values(SweetShape).length)
      ],
  }));

  return {
    statusCode: 200,
    body: { status: "success", shapedSweets },
  };
};
