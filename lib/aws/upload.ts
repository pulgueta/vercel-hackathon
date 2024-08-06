import type { PutObjectCommandInput } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 } from "uuid";

import { BUCKET_NAME, STORAGE_KEY } from "@/constants";
import { s3 } from "./s3.config";

export const uploadToDigitalOcean = async (file: File) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileExtension = file.name.split(".").pop();

  const Key = `${v4()}.${fileExtension}`;

  const params: PutObjectCommandInput = {
    Bucket: BUCKET_NAME,
    Key,
    Body: buffer,
    ACL: "public-read"
  };

  const formData = new FormData();

  formData.append("file", file);
  formData.append("apiKey", localStorage.getItem(STORAGE_KEY) as any);
  formData.append("videoUrl", getFileUrl(Key));
  formData.append("influencer", file.name);

  const r = await fetch("/api/upload", {
    method: "POST",
    body: formData
  });

  if (!r.ok) {
    return Promise.reject("Error al subir el video");
  }

  await s3.send(new PutObjectCommand(params));

  return Promise.resolve({
    key: Key,
    name: file.name,
    url: getFileUrl(Key)
  });
};

export const getFileUrl = (key: string) =>
  `${BUCKET_NAME}${process.env.NEXT_PUBLIC_SPACES_ENDPOINT}/${key}`;
