"use client";
import Image from "next/image";
import Link from "next/link";

  const gambar = [
    {
      link: "https://wa.me/62895346195409",
      gambar: "/ourkustom/Whatsapp.png",
    },
    {
      link: "https://www.instagram.com/alpastudio.id?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      gambar: "/ourkustom/Instagram.png",
    },
    {
      link: "https://www.tiktok.com/@alpasstudio.id?_t=ZS-8zAUgBuzaJl&_r=1",
      gambar: "/tiktok.png",
    },
  ];

export default function TestimoniPage() {
  return (
    <section className="bg-linear-to-b/oklch from-blue-800/40 to-white/50 pt-14 rounded-3xl ">
      <header className="w-full text-center md:text-left px-2 mb-10 mt-20 ">
        <h2 className="text-white mt-10 sm:mt-5 flex flex-col gap-2">
          <span className="text-xl sm:text-3xl md:text-4xl font-semibold uppercase justify-center items-center flex">
            Tentang kami
          </span>
        </h2>
      </header>

      <main className="bg-white">
        {/* Konten 1: Teks kiri, gambar kanan */}
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4 leading-relaxed text-base sm:text-lg text-gray-900 dark:text-white/90">
              <div className="flex items-center gap-3">
                <Image
                  src="/alpasAbout.png" /* ganti dgn logo kamu */
                  alt="ALPAS Studio"
                  width={340}
                  height={48}
                  className="h-auto w-106 object-contain"
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
              <div className="rounded-2xl border border-white/30 bg-white/60 dark:bg-white/10 p-2 shadow-xl backdrop-blur">
                <Image
                  src="/gedung.png" /* ganti dgn fotomu */
                  alt="Foto Studio"
                  width={720}
                  height={420}
                  className="h-auto w-full max-w-[560px] rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Konten 2: Gambar kiri, teks kanan */}
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-12 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl border border-white/30 bg-white/60 dark:bg-white/10 p-2 shadow-xl backdrop-blur">
              <Image
                src="/cafe.png" /* ganti dgn foto tim */
                alt="Tim ALPAS"
                width={720}
                height={420}
                className="h-auto w-full rounded-xl object-cover"
              />
            </div>

            <div className="space-y-4 leading-relaxed text-base sm:text-lg text-gray-900 dark:text-white/90">
              <p>
                <strong>UXINITY</strong> adalah tim di balik layar{" "}
                <strong>ALPAS Studio</strong>, gabungan desainer, developer, dan
                researcher yang punya satu visi: bikin desain yang bukan cuma
                estetik, tapi juga efektif. Kami percaya pengalaman pengguna
                yang baik adalah kunci desain yang berhasil.
              </p>
            </div>
          </div>
        </section>

        <h1 className="w-full text-center text-lg sm:text-xl md:text-2xl text-black mt-5">
          Atau Konsultasikan Desainmu dengan Kami Melalui
        </h1>

        <div className="w-full flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-5 pb-10">
          {gambar.map((gambar, i) => (
            <Link href={gambar.link} key={i}>
              <Image
                src={gambar.gambar}
                alt={gambar.gambar}
                width={50}
                height={50}
                className="sm:w-[60px] sm:h-[60px]"
              />
            </Link>
          ))}
        </div>
      </main>
    </section>
  );
}
