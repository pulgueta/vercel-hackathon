import { useEffect, useState } from "react";

export const useTries = () => {
  const [tries, setTries] = useState<number>(0);

  useEffect(() => {
    const getUserTries = async () => {
      const response = await fetch("/api/upload");

      const data = await response.json();

      setTries(() => data.tries);
    };

    getUserTries();
  }, []);

  const disabled = tries >= 3;

  return { tries, disabled };
};
