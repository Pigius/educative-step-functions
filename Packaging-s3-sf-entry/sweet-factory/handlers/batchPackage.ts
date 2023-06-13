import { S3 } from "aws-sdk";
import { Handler } from "aws-lambda";

interface Sweets {
  shape: string;
  name: string;
  quantity: number;
}

interface QualityCheckOutput {
  statusCode: number;
  body: {
    status: string;
    batchId: string;
    shapedSweets: Sweets[];
  };
  checkShape?: {
    validShapes: boolean;
  };
  apiQualityCheck?: {
    validApiQualityCheck: boolean;
  };
}

interface PackagingRecord {
  batchId: string;
  shapedSweets: Sweets[];
  packagingTimestamp: string;
}

const s3 = new S3();

export const handler: Handler = async (event: QualityCheckOutput[]) => {
  const {
    body: { batchId, shapedSweets },
  } = event[0];

  // Create a packaging record
  const packagingRecord: PackagingRecord = {
    batchId,
    shapedSweets,
    packagingTimestamp: new Date().toISOString(),
  };

  // Convert the record to JSON
  const packagingRecordJson = JSON.stringify(packagingRecord);

  // Define the S3 upload parameters
  const params = {
    Bucket: process.env.PACKAGING_BUCKET,
    Key: `${batchId}.json`,
    Body: packagingRecordJson,
  };

  // Upload the packaging record to S3
  await s3.putObject(params).promise();

  // Return the packaging record
  return packagingRecord;
};
