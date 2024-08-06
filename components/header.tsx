"use client";

import { STORAGE_KEY } from "@/constants";
import { Input } from "./input";

export const Header = () => {
  const openaiKey = localStorage.getItem(STORAGE_KEY);

  return <header className='w-full max-w-xl'>{!openaiKey && <Input />}</header>;
};
