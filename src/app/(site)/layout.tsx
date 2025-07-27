import { Poppins } from "next/font/google";
import "@/app/globals.css";

const poppins = Poppins({
   variable: "--font-poppins",
   subsets: ["latin"],
   display: "swap",
   weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="bg-image-customer overflow-x-hidden overflow-y-hidden max-w-screen">
         {/* <header>
            <h1>haloo</h1>
         </header> */}
         <main className="bg-linear-to-b from-gray-900/80 from-0% via-gray-900/20 via-[80px] to-gray-900/20 to-100%">{children}</main>
         {/* <footer>
            <p>Footer content here</p>
         </footer> */}
      </div>
   );
}
