import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Providers from "./providers";
import "@rainbow-me/rainbowkit/styles.css";

export const metadata: Metadata = {
  title: "Rootstock Wagmi Starter",
  description:
    "Interact with contracts on Rootstock Network with Wagmi and RainbowKit",
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
