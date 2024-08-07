"use client";

import { useRouter } from "next/navigation";

import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { MAX_FILE_SIZE, STORAGE_KEY } from "@/constants";
import { uploadToDigitalOcean } from "@/lib/aws/upload";

export const Dropzone = () => {
  const { push } = useRouter();

  const { getInputProps, getRootProps } = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept: {
      "video/*": [".mp4"]
    },
    maxSize: MAX_FILE_SIZE,
    validator: (f) => {
      if (!f.type.includes("video")) {
        return {
          code: "file-invalid-type",
          message: "El archivo debe ser un video"
        };
      }

      if (f.size > MAX_FILE_SIZE) {
        return {
          code: "file-too-large",
          message: "El archivo es demasiado grande"
        };
      }

      return null;
    },
    onDropRejected: (f) => {
      toast.error(f[0].errors[1].message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onDropAccepted: (f) => {
      toast.promise(
        async () => {
          const res = await uploadToDigitalOcean(f[0]);

          if (!res.key || !res.url) {
            toast.error("Error al subir el video");
          }

          push(`/result?id=${res.id}`);
        },
        {
          loading: "Subiendo video...",
          success: "Video subido correctamente",
          error: "Error al subir el video"
        }
      );
    }
  });

  const apiExists = localStorage.getItem(STORAGE_KEY) === null;

  return (
    !apiExists && (
      <div>
        <h2 className='mb-4 text-center text-xl font-semibold tracking-tight'>
          Sube tu video con el nombre del influencer. Ejemplo
          &quot;westcol.mp4&quot;
        </h2>
        <div
          {...getRootProps({
            className:
              "mx-auto max-w-lg w-full cursor-pointer rounded-lg border border-dashed border-neutral-300 bg-neutral-400 hover:bg-neutral-200 px-4 py-16 transition md:py-24"
          })}
        >
          <input {...getInputProps()} />
          <p className='text-center font-normal opacity-50'>
            Haz clic o arrastra un video aquí
          </p>
          <p className='text-center text-sm font-normal opacity-50'>
            (Máximo 64MB)
          </p>
        </div>
      </div>
    )
  );
};
