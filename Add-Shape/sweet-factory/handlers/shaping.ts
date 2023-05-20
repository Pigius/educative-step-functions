import { APIGatewayProxyResult } from "aws-lambda";

interface SweetInput {
  ingredient: string;
  quantity: number;
}

interface SweetOutput extends SweetInput {
  name: SweetName;
  shape: SweetShape;
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

  // Shaping is assumed to always succeed
  const shapedSweets: SweetOutput[] = event.map((sweet) => ({
    ...sweet,
    shape:
      Object.values(SweetShape)[
        Math.floor(Math.random() * Object.values(SweetShape).length)
      ],
    name: Object.values(SweetName)[
      Math.floor(Math.random() * Object.values(SweetName).length)
    ],
  }));

  return {
    statusCode: 200,
    body: { status: "success", shapedSweets },
  };
};
