
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-image ">
      <main>
        {children}
      </main>
    </div>
  );
}