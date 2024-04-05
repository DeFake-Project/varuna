import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./styles/global.scss";
import StoreProvider from "./StoreProvider";
import Modal from "./shared/modal";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "DiM-FOntology",
  description: "A digital multimedia forensics ontology for intellence analysis and investigation",
};

const quicksand = Quicksand({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={quicksand.className}>
          {children}
          <Suspense>
            <Modal />
          </Suspense>
        </body>
      </StoreProvider>
    </html>
  );
}
