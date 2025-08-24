import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";


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
    
    <div className="bg-image overflow-x-hidden overflow-y-hidden max-w-screen">
      {/* <header>
            <h1>haloo</h1>
         </header> */}
      <TopBar />
      <main className="flex shadow-lg backdrop-blur bg-gray-800/30 py-5 m-5 rounded-xl border-3 border-gray-400 dark:border-gray-700 justify-between mx-50 items-center mt-10">
        <Sidebar/>
        <Toaster position="top-right" richColors />
        {children}
      </main>
      {/* <footer>
            <p>Footer content here</p>
         </footer> */}
    </div>
  );
}
