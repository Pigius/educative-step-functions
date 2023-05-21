import { APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";

interface SweetInput {
  ingredient: string;
  quantity: number;
}

interface SweetOutput {
  name: SweetName;
  shape: SweetShape;
  quantity: number;
}

enum SweetShape {
  Square = "Square",
  Circle = "Circle",
  Triangle = "Triangle",
}

enum SweetName {
  SweetiePie = "Sweetie Pie",
  LollyPop = "Lolly Pop",
  GummyBear = "Gummy Bear",
  JellyBean = "Jelly Bean",
  CandyCane = "Candy Cane",
}

export const handler = async (
  event: SweetInput[]
): Promise<APIGatewayProxyResult> => {
  // Simulate shaping delay
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Generate a UUID for the batch
  const batchId = uuidv4();

  // Shaping is assumed to always succeed
  const shapedSweets: SweetOutput[] = event.map((sweet: SweetInput) => ({
    shape:
      Object.values(SweetShape)[
        Math.floor(Math.random() * Object.values(SweetShape).length)
      ],
    name: Object.values(SweetName)[
      Math.floor(Math.random() * Object.values(SweetName).length)
    ],
    quantity: sweet.quantity,
  }));

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "success",
      batchId,
      shapedSweets,
    }),
  };
};
