import { S3 } from "@aws-sdk/client-s3";

export const s3 = new S3({
  endpoint: process.env.NEXT_PUBLIC_SPACES_ENDPOINT,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.SPACES_KEY ?? "",
    secretAccessKey: process.env.SPACES_SECRET ?? ""
  }
});
