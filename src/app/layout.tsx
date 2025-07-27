import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
   variable: "--font-poppins",
   subsets: ["latin"],
   display: "swap",
   weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
   title: "Alpas Studio",
   description: "Alpas Studio adalah sebuah studio yang menyediakan berbagai layanan digital.",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body
            className={`${poppins.className} w-full max-w-screen overflow-x-hidden antialiased`}
         >
            {children}
         </body>
      </html>
   );
}
