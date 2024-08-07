import type { NextPage } from "next";
import { notFound } from "next/navigation";

import { Results } from "@/components/engagement-results";
import { getAd } from "@/lib/db";

interface ResultProps {
  searchParams: {
    id: string;
  };
}

const Result: NextPage<ResultProps> = async ({ searchParams }) => {
  if (!searchParams.id) {
    notFound();
  }

  const ad = await getAd(searchParams.id);

  if (!ad) {
    notFound();
  }

  return (
    <main className='flex min-h-dvh w-full flex-col items-center justify-center gap-y-4 bg-neutral-300 p-4'>
      <section className='flex max-w-2xl flex-col items-center gap-y-4'>
        <h1 className='text-balance text-center text-3xl font-bold tracking-tighter'>
          Resultados
        </h1>
        <section className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <Results
            network='Tiktok'
            comments={ad.tiktokComments}
            likes={ad.tiktokLikes}
            shares={ad.tiktokShares}
            views={ad.tiktokViews}
            favorites={ad.tiktokFavorites}
          />
          <Results
            network='Instagram'
            comments={ad.instagramComments}
            likes={ad.instagramLikes}
            shares={ad.instagramShares}
            views={ad.instagramViews}
          />
          <Results
            network='Facebook'
            comments={ad.facebookComments}
            likes={ad.facebookLikes}
            shares={ad.facebookShares}
            views={ad.facebookViews}
          />
          <Results
            network='Twitter'
            likes={ad.twitterLikes}
            views={ad.twitterViews}
            retweets={ad.twitterRetweets}
          />
        </section>
      </section>
    </main>
  );
};
export default Result;
