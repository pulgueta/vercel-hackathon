import type { TypeOf } from "zod";
import { object, string } from "zod";

export const uploadSchema = object({
  apiKey: string().nullable(),
  videoId: string(),
  videoUrl: string().url()
});

export interface Upload extends TypeOf<typeof uploadSchema> {}
