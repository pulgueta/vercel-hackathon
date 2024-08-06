import dynamic from "next/dynamic";

export const Dropzone = dynamic(
  () => import("./dropzone").then((d) => d.Dropzone),
  {
    ssr: false
  }
);

export const Header = dynamic(() => import("./header").then((d) => d.Header), {
  ssr: false,
  loading: () => <div>Cargando...</div>
});

export const Input = dynamic(() => import("./input").then((d) => d.Input), {
  ssr: false
});
