import dynamic from "next/dynamic";

export const Dropzone = dynamic(
  () => import("./dropzone").then((d) => d.Dropzone),
  {
    ssr: false
  }
);

export const Header = dynamic(() => import("./header").then((d) => d.Header), {
  ssr: false
});
