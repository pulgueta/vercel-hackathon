import type { PropsWithChildren } from "react";

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import { Toaster } from "sonner";

import "./globals.css";

const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Analizador de campañas influencer",
  description:
    "Descubre el engagement de tu audiencia con nuestro analizador de campañas influencer."
};

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <html lang='es'>
      <body className={dm_sans.className}>
        <Toaster richColors position='top-right' />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
