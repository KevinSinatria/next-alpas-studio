import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Image
        src="/backroundBiru.png"
        alt="Background"
        fill
        className="object-cover absolute inset-0 z-0"
        priority
      />
      <main className="relative z-10">
        {/* Your main content goes here */}d
      </main>
    </div>
  );
}
