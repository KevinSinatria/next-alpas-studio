import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <Image
        src="/bgBiru.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      
      <div className="relative z-10 font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-13 row-start-2 items-center sm:items-start">
          <Image
            className="dark:invert"
            src="/mainLogo.png"
            alt="Main logo"
            width={180}
            height={38}
            priority
          />
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          {/* footer link */}
        </footer>
      </div>
    </div>
  );
}
