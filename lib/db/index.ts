import "server-only";

import { db } from "@/db";

export const getAd = async (id: string) => {
  const ad = await db.ad.findUnique({
    where: {
      id
    }
  });

  return ad;
};
