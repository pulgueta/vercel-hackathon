"use client";

import { toast } from "sonner";
import type { CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { CldUploadWidget } from "next-cloudinary";

import { useTries } from "@/hooks/use-tries";

interface UploadData {
  apiKey: string | null;
  videoId: string;
  videoUrl: string;
}

export const Dropzone = () => {
  const { disabled } = useTries();

  const maxFileSize = 64 * 1024 * 1024;

  const apiKey = localStorage.getItem("apiKey");

  const saveToDatabase = async (data: UploadData) => {
    const r = await fetch("/api/upload", {
      body: JSON.stringify(data),
      method: "POST"
    });

    if (!r.ok) {
      toast.error("Ha ocurrido un error al subir tu video");
    }

    return await r.json();
  };

  return (
    <div className='w-full'>
      <CldUploadWidget
        signatureEndpoint='/api/signature'
        options={{
          sources: ["local", "dropbox", "url", "google_drive"],
          multiple: false,
          maxFiles: 1,
          maxFileSize,
          defaultSource: "local",
          language: "es"
        }}
        onSuccess={async (r, { widget }) => {
          console.log({ r });

          const info = r.info as CloudinaryUploadWidgetInfo;

          const res = await saveToDatabase({
            videoId: info.asset_id,
            videoUrl: info.url,
            apiKey
          });

          toast.success("Se ha subido tu video correctamente");
          widget.close();
          // push(`${pathname}/result`);
        }}
        onError={() => {
          toast.error("Ha ocurrido un error al subir tu video");
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
