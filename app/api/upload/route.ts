import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";

import { db } from "@/db";
import { responseSchema } from "@/schemas/upload";
import { PROMPT } from "@/constants";

export const POST = async (req: NextRequest) => {
  const _body = await req.formData();

  const video = _body.get("file") as File;
  const influencer = _body.get("influencer");
  const apiKey = _body.get("apiKey")?.toString();
  const videoUrl = _body.get("videoUrl")?.toString() as string;

  const openai = createOpenAI({
    apiKey: apiKey ?? process.env.OPENAI_API_KEY
  });

  const {
    object: { facebook, instagram, tiktok, twitter, youtube_shorts }
  } = await generateObject({
    model: openai("gpt-4-turbo-2024-04-09"),
    schema: responseSchema,
    messages: [
      {
        role: "system",
        content: PROMPT
      },
      {
        role: "user",
        content: `Generate social media metrics for this video ${video} and this influencer ${influencer}`
      }
    ]
  });

  console.log({ facebook, instagram, tiktok, twitter, youtube_shorts });

  const data = await db.ad.create({
    data: {
      facebookComments: facebook.facebookComments,
      facebookLikes: facebook.facebookLikes,
      facebookShares: facebook.facebookShares,
      facebookViews: facebook.facebookViews,
      instagramComments: instagram.instagramComments,
      instagramLikes: instagram.instagramLikes,
      instagramShares: instagram.instagramShares,
      instagramViews: instagram.instagramViews,
      tiktokComments: tiktok.tiktokComments,
      tiktokFavorites: tiktok.tiktokFavorites,
      tiktokLikes: tiktok.tiktokLikes,
      tiktokShares: tiktok.tiktokShares,
      tiktokViews: tiktok.tiktokViews,
      twitterLikes: twitter.twitterLikes,
      twitterRetweets: twitter.twitterRetweets,
      twitterViews: twitter.twitterViews,
      youtubeComments: youtube_shorts.youtubeShortsComments,
      youtubeLikes: youtube_shorts.youtubeShortsLikes,
      youtubeShares: youtube_shorts.youtubeShortsShares,
      youtubeViews: youtube_shorts.youtubeShortsViews,
      videoSource: videoUrl
    }
  });

  return NextResponse.json({ data }, { status: 200 });
};
