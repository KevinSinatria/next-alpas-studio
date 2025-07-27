import { Poppins } from "next/font/google";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

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
      // <div className="bg-image-customer overflow-x-hidden overflow-y-hidden max-w-screen">
      //    {/* <header>
      //       <h1>haloo</h1>
      //    </header> */}
      //    <main className="bg-linear-to-b from-gray-900/80 from-0% via-gray-900/20 via-[80px] to-gray-900/20 to-100%">{children}</main>
      //    {/* <footer>
      //       <p>Footer content here</p>
      //    </footer> */}
      // </div>
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
