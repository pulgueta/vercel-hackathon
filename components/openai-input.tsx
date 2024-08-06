"use client";

import type { FormEvent } from "react";

import { useRouter } from "next/navigation";

export const OpenAIInput = () => {
  const { refresh } = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const openaiKey = formData.get("openaiKey");

    if (!openaiKey) {
      return;
    }

    localStorage.setItem("openaiKey", openaiKey as string);

    return refresh();
  };

  return (
    <form
      className='flex w-full flex-col items-center justify-between gap-4 rounded border p-4 md:flex-row'
      onSubmit={onSubmit}
    >
      <input
        placeholder='sk-proj-dfjfgu83...'
        className='flex h-10 w-full max-w-xs rounded-md border bg-neutral-100 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
        name='openaiKey'
      />
      <button className='rounded border border-emerald-500 bg-emerald-600 px-4 py-2 text-sm font-medium tracking-tight text-white'>
        Utilizar mi API Key
      </button>
    </form>
  );
};
