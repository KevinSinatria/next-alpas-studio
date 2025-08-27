import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-image-login">
      <main>
        {children}
        <Toaster />
      </main>
    </div>
  );
}