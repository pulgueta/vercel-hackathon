type Network =
  | "Facebook"
  | "Tiktok"
  | "Instagram"
  | "Twitter"
  | "Youtube Shorts";

interface ResultsProps {
  network: Network;
  likes: number;
  comments?: number;
  shares?: number;
  retweets?: number;
  views: number;
  favorites?: number;
}

export const Results = (ad: ResultsProps) => {
  return (
    <article className='rounded border bg-neutral-200 p-4 shadow'>
      <h2 className='mb-2 text-xl font-semibold tracking-tight'>
        {ad.network}
      </h2>
      <p>
        {ad.network} views: {ad.views.toLocaleString()}
      </p>
      <p>
        {ad.network} likes: {ad.likes.toLocaleString()}
      </p>
      {ad.comments && (
        <p>
          {ad.network} comments: {ad.comments.toLocaleString()}
        </p>
      )}
      {ad.shares && (
        <p>
          {ad.network} shares: {ad.shares.toLocaleString()}
        </p>
      )}
      {ad.retweets && (
        <p>
          {ad.network} retweets: {ad.retweets.toLocaleString()}
        </p>
      )}
      {ad.favorites && (
        <p>
          {ad.network} favorites: {ad.favorites.toLocaleString()}
        </p>
      )}
    </article>
  );
};
