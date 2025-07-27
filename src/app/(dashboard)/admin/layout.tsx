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
         <main>{children}</main>
         {/* <footer>
            <p>Footer content here</p>
         </footer> */}
      </div>
   );
}
