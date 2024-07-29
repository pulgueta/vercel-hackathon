import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { hash } from "@node-rs/argon2";

import { db } from "@/db";

export const POST = async (req: NextRequest) => {
  const _body = await req.json();
  const userIp = req.ip ?? "";

  const encryptedIp = await hash(userIp, {
    secret: Buffer.from(process.env.ARGON_SECRET ?? ""),
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1
  });

  const userHasExceededLimit = await db.upload.findFirst({
    where: {
      ip: {
        equals: encryptedIp
      }
    }
  });

  if (userHasExceededLimit && userHasExceededLimit.tries >= 5) {
    return NextResponse.json(
      { message: "Has excedido el límite, utiliza tu clave de OpenAI" },
      { status: 429 }
    );
  }
};
