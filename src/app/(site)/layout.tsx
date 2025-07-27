import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Alpas Studio",
  description:
    "Alpas Studio adalah sebuah studio yang menyediakan berbagai layanan digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100`}
      >
        <div className="relative min-h-screen">
          <Image
            src="/bgMain2.svg"
            alt="Background"
            fill
            className="object-cover absolute inset-0 z-0"
            priority
          />
          <div className="relative z-10">
            <Navbar />
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
