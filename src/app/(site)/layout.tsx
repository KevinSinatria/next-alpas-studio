import { Poppins } from "next/font/google";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";
import Footer from "@/components/Footer";

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
      <div className="bg-image-customer overflow-x-hidden overflow-y-hidden max-w-screen">
         <header>
            <Navbar />
         </header>
         <main className="bg-linear-to-b from-gray-900/80 from-0% via-gray-900/20 via-[80px] to-gray-900/20 to-100%">{children}</main>
         <Footer />
      </div>
   );
}
