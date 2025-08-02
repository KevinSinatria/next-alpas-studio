import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";

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
      <main className="m-15 mx-25 p-5 bg-black/55 backdrop-blur rounded-2xl flex">
        <Sidebar />
        {children}
      </main>
      {/* <footer>
            <p>Footer content here</p>
         </footer> */}
    </div>
  );
}
