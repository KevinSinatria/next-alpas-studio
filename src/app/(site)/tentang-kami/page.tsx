"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const gambar = [
  {
    link: "https://wa.me/62895346195409",
    gambar: "/Whatsapp.png",
  },
  {
    link: "https://www.instagram.com/alpastudio.id?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    gambar: "/Instagram.png",
  },
  {
    link: "https://www.tiktok.com/@alpasstudio.id?_t=ZS-8zAUgBuzaJl&_r=1",
    gambar: "/tiktok.png",
  },
];

export default function TestimoniPage() {
  return (
    <section className="bg-gradient-to-b from-blue-800/40 to-white/50 pt-14 bottom-0 rounded-3xl">
      <header className="w-full text-center px-4 mb-10 mt-20">
        <AnimatePresence>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="text-white mt-10 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-semibold uppercase"
          >
            Tentang Kami
          </motion.h2>
        </AnimatePresence>
      </header>

      <main className="bg-gradient-to-b from-white via-white to-blue-400 pt-10">
        {/* Konten 1: Teks kiri, gambar kanan */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-base sm:text-lg text-gray-900">
              <div className="flex justify-center md:justify-start">
                <Image
                  src="/alpasAbout.png"
                  alt="ALPAS Studio"
                  width={340}
                  height={48}
                  className="h-auto w-full max-w-xs"
                  priority
                />
              </div>
              <p>
                <strong>ALPAS Studio</strong> adalah ruang kreatif digital yang
                fokus pada layanan desain produk untuk kebutuhan marketing. Kami
                bantu bisnismu tampil lebih menarik lewat desain yang relevan,
                berkarakter, dan strategis—baik melalui layanan kustom maupun
                pilihan template siap pakai.
              </p>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="rounded-2xl shadow-xl backdrop-blur overflow-hidden">
                <Image
                  src="/gedung.png"
                  alt="Foto Studio"
                  width={720}
                  height={420}
                  className="h-auto w-full max-w-md rounded-xl object-cover transition duration-600 ease-in-out hover:scale-105 hover:brightness-110"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Konten 2: Gambar kiri, teks kanan */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center md:justify-start">
              <div className="rounded-2xl shadow-xl backdrop-blur">
                <Image
                  src="/cafe.png"
                  alt="Tim ALPAS"
                  width={720}
                  height={420}
                  className="h-auto w-full max-w-md rounded-xl object-cover transition duration-600 ease-in-out hover:scale-105 hover:brightness-110"
                />
              </div>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-gray-900">
              <p className="text-center md:text-left">
                <strong>UXINITY</strong> adalah tim di balik layar{" "}
                <strong>ALPAS Studio</strong>, gabungan desainer, developer, dan
                researcher yang punya satu visi: bikin desain yang bukan cuma
                estetik, tapi juga efektif. Kami percaya pengalaman pengguna
                yang baik adalah kunci desain yang berhasil.
              </p>
            </div>
          </div>
        </section>

        <h1 className="w-full text-center text-lg sm:text-xl md:text-2xl text-black mt-5 px-4 font-bold">
          Lebih tahu tentang kami melalui!
        </h1>

        <div className="w-full flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-5 pb-10 px-4">
          {gambar.map((gambar, i) => (
            <Link href={gambar.link} key={i}>
              <Image
                src={gambar.gambar}
                alt={`Logo ${gambar.gambar}`}
                width={50}
                height={50}
                className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]"
              />
            </Link>
          ))}
        </div>
      </main>
    </section>
  );
}
