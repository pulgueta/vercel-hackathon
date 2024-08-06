import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { hash } from "@node-rs/argon2";

import { db } from "@/db";
import { uploadSchema } from "@/schemas/upload";

export const POST = async (req: NextRequest) => {
  const _body = await req.json();
  const userIp = req.ip ?? "";

  const body = uploadSchema.safeParse(_body);

  if (!body.success) {
    return NextResponse.json(
      { message: "Error en la validación" },
      { status: 400 }
    );
  }

  console.log({ _body });

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

  if (userHasExceededLimit && userHasExceededLimit.tries >= 3) {
    return NextResponse.json(
      { message: "Has excedido el límite, utiliza tu clave de OpenAI" },
      { status: 429 }
    );
  } else {
    await db.upload.create({
      data: {
        ip: encryptedIp,
        tries: 1
      }
    });
  }

  const uploadPromise = db.ad.create({
    data: {
      videoSource: body.data.videoUrl,
      id: body.data.videoId
    }
  });

  const resPromise = db.upload.update({
    where: {
      ip: encryptedIp
    },
    data: {
      tries: {
        increment: 1
      }
    }
  });

  const [upload, res] = await Promise.all([uploadPromise, resPromise]);

  return NextResponse.json({ res }, { status: 200 });
};

export const GET = async (req: NextRequest) => {
  const userIp = req.ip ?? "";

  const encryptedIp = await hash(userIp, {
    secret: Buffer.from(process.env.ARGON_SECRET ?? ""),
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1
  });

  const upload = await db.upload.findFirst({
    where: {
      ip: {
        equals: encryptedIp
      }
    }
  });

  return NextResponse.json({ tries: upload?.tries }, { status: 200 });
};
