"use client";

import { useEffect, useState } from "react";

export const Header = () => {
  const [tries, setTries] = useState<number>(0);

  useEffect(() => {
    const getUserTries = async () => {
      const response = await fetch("/api/upload");

      const data = await response.json();

      setTries(() => data.tries);
    };

    getUserTries();
  }, []);

  return (
    <header>
      <h2 className='text-balance text-xl font-bold tracking-tight'>
        Has utilizado {tries} de tus 5 subidas gratuitas
      </h2>
    </header>
  );
};
