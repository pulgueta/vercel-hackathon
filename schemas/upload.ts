import type { TypeOf } from "zod";
import { number, object, string } from "zod";

export const uploadSchema = object({
  apiKey: string().nullable(),
  videoId: string(),
  videoUrl: string().url()
});

export interface Upload extends TypeOf<typeof uploadSchema> {}

export const responseSchema = object({
  instagram: object({
    instagramLikes: number().positive(),
    instagramComments: number().positive(),
    instagramViews: number().positive(),
    instagramShares: number().positive()
  }),
  tiktok: object({
    tiktokLikes: number().positive(),
    tiktokComments: number().positive(),
    tiktokViews: number().positive(),
    tiktokShares: number().positive(),
    tiktokFavorites: number().positive()
  }),
  twitter: object({
    twitterLikes: number().positive(),
    twitterRetweets: number().positive(),
    twitterReplies: number().positive(),
    twitterViews: number().positive()
  }),
  youtube_shorts: object({
    youtubeShortsLikes: number().positive(),
    youtubeShortsComments: number().positive(),
    youtubeShortsViews: number().positive(),
    youtubeShortsShares: number().positive()
  }),
  facebook: object({
    facebookLikes: number().positive(),
    facebookComments: number().positive(),
    facebookViews: number().positive(),
    facebookShares: number().positive()
  })
});

export interface AIResponse extends TypeOf<typeof responseSchema> {}
