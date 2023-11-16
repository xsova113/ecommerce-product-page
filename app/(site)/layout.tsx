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
      <ClerkProvider appearance={{ variables: { colorPrimary: "black" } }}>
        <body
          className={`${kumbh.className} my-6 min-h-screen overflow-x-hidden px-4 text-[16px] sm:px-12 lg:px-24`}
        >
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
