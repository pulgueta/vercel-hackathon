import { v2 as cloudinary } from "cloudinary";

export const POST = async (req: Request) => {
  const body = (await req.json()) as { paramsToSign: Record<string, string> };

  const signature = cloudinary.utils.api_sign_request(
    body.paramsToSign,
    process.env.CLOUDINARY_API_SECRET ?? ""
  );

  return Response.json({ signature });
};
