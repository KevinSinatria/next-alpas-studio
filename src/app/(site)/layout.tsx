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
      <html lang="en">
         <body
            className={`${poppins.variable} antialiased`}
         >
            {children}
         </body>
      </html>
   );
}
