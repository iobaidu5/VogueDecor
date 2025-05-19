import React from 'react';
//import useSWR from 'swr';

//const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function AnnouncementBar() {
  // const { data, error } = useSWR<{ announcement: string }>('/api/announcement', fetcher, {
  //   refreshInterval: 60_000, // re‑fetch every 60s
  // });

  // if (error || !data?.announcement) return null;

  return (
     <div className="w-full bg-black text-white text-center py-3 text-sm">
    {/* {data?.announcement || "🚚 Free shipping on all orders over $50!"} */}
      {"🚚 Free shipping on all orders over $50!"}
    </div>
  );
}
