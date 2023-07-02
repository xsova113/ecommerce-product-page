
import NavBar from "./components/NavBar";
import "./globals.css";
import { Kumbh_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { StateContext } from "../context/StateContext";
import Footer from "./components/Footer";

const kumbh = Kumbh_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Frontend Mentor | E-commerce product page</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Created by George Chang" />
      <link rel="icon" href="./images/favicon-32x32.png" />
      <ClerkProvider appearance={{variables:{colorPrimary: "black"}}}>
        <body className={`${kumbh.className} min-h-screen text-[16px] my-6 px-4 sm:px-12 lg:px-24 overflow-x-hidden`}>
          <StateContext>
            <NavBar />
            {children}
            <Footer />
          </StateContext>
        </body>
      </ClerkProvider>
    </html>
  );
}
