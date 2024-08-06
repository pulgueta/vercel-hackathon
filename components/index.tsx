import dynamic from "next/dynamic";

export * from "./dropzone";

export const Header = dynamic(() => import("./header").then((d) => d.Header), {
  ssr: false
});
