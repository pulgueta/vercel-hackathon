"use client";

import { useTries } from "@/hooks/use-tries";
import { OpenAIInput } from "./openai-input";

export const Header = () => {
  const openaiKey = localStorage.getItem("openaiKey");

  const { tries } = useTries();

  return (
    <header className='w-full max-w-xl'>
      {!openaiKey || tries >= 3 ? (
        <h2 className='text-balance text-center text-xl font-bold tracking-tight'>
          Has utilizado {tries} de tus 3 subidas gratuitas
        </h2>
      ) : (
        <OpenAIInput />
      )}
    </header>
  );
};
