// Varuna Ontology (c) by DeFake Project
// 
// Varuna Ontology is licensed under a
// Creative Commons Attribution 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <https://creativecommons.org/licenses/by/4.0/>.

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
