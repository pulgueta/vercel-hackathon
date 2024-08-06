"use client";

import { toast } from "sonner";
import { CldUploadWidget } from "next-cloudinary";

import { useTries } from "@/hooks/use-tries";

export const Dropzone = () => {
  const { disabled } = useTries();

  const maxFileSize = 64 * 1024 * 1024;

  return (
    <div className='w-full'>
      <CldUploadWidget
        signatureEndpoint='/api/signature'
        options={{
          sources: [
            "local",
            "dropbox",
            "url",
            "url",
            "instagram",
            "facebook",
            "google_drive"
          ],
          multiple: false,
          maxFiles: 1,
          maxFileSize,
          defaultSource: "local",
          language: "es"
        }}
        onSuccess={(r, { widget, ...rest }) => {
          console.log({ r, rest });

          toast.success("Se ha subido tu video correctamente");
          // widget.close();
          // push(`${pathname}/result`);
        }}
      >
        {({ open }) => {
          return (
            <button
              className='mx-auto w-full rounded border border-emerald-500 bg-emerald-600 px-4 py-2 text-sm font-medium tracking-tight text-white'
              onClick={() => open()}
              disabled={disabled}
            >
              Sube tu video
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
