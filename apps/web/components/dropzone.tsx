"use client";

import { useDropzone } from "react-dropzone";

export const Dropzone = () => {
  const { getInputProps, getRootProps } = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept: {
      "video/*": [".mp4"]
    }
  });

  return (
    <div
      {...getRootProps({
        className:
          "mx-auto max-w-lg w-full cursor-pointer rounded-lg border border-dashed border-neutral-300 bg-neutral-400 hover:bg-neutral-200 px-4 py-16 transition md:py-24"
      })}
    >
      <input {...getInputProps()} />

      <p className='text-center text-sm font-normal opacity-50'>
        Haz clic o arrastra un video aquí
      </p>
    </div>
  );
};
