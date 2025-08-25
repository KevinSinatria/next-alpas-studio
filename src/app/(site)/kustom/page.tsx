import { CarouselKustom } from "@/components/Carousel";
import { Button } from "@/components/ui/button";
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
export default function KustomPage() {
  return (
    <div className="px-4 sm:px-8 py-8 lg:px-20">
      <div className="bg-linear-to-b/oklch from-blue-800/40 to-white/50 p-14 rounded-3xl backdrop-blur gap-6 items-center justify-center mt-20">
        <header className="w-full text-center md:text-left px-2 mb-10">
          <h2 className="text-white mt-3 sm:mt-5 flex flex-col gap-2">
            <span className="text-xl sm:text-3xl md:text-4xl font-semibold uppercase flex justify-center">
              KUSTOM DESAIN
            </span>
            <span className="text-sm sm:text-lg md:text-2xl text-gray-700 bg-white/59 rounded-2xl p-5  mx-auto md:mx-0 leading-snug">
              Butuh desain yang sesuai visi Anda? Di ALPAS Studio, Anda bisa
              request desain dari nol untuk brand, produk, atau kampanye
              digital. Konsultasi langsung dengan desainer, hasil auto maksimal!
            </span>
          </h2>
        </header>

        <main className="w-full">
          <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-8 px-4">
            {/* Card 1 */}
            <div className="bg-gray-900/60 p-8 sm:p-10 lg:p-14 rounded-3xl backdrop-blur gap-6 items-center max-w-full lg:max-w-[600px] w-full mx-auto">
              <h1 className="text-2xl sm:text-3xl text-white mb-3">
                Mulai Perjalanan Desain Anda!
              </h1>
              <ul className="list-disc pl-6 space-y-2 text-lg sm:text-xl lg:text-2xl text-white">
                <li>
                  Setelah klik <strong>kustom sekarang</strong>, Anda akan
                  diarahkan untuk mengisi form pemesanan.
                </li>
                <li>
                  Isi <strong>nama</strong>, <strong>email</strong>, dan yang
                  paling penting adalah <strong>pesan</strong>.
                </li>
                <li>
                  Tuangkan semua imajinasi dan hal-hal menarik yang ingin Anda
                  masukkan dalam desain{" "}
                  <strong>dengan jelas dan spesifik</strong>.
                </li>
                <li>
                  Jangan lupa mengirimkan <strong>asset</strong> seperti:
                  <ul className="list-disc pl-6 mt-2">
                    <li>Foto produk</li>
                    <li>Logo perusahaan</li>
                    <li>
                      Foto atau gambar lain yang perlu dicantumkan di desain
                    </li>
                  </ul>
                </li>
                <li>
                  Tunggu beberapa saat, kami akan segera merespons melalui
                  email.
                </li>
                <li>Untuk revisi, hubungi kami kembali melalui email.</li>
                <li>
                  <strong>See you there!</strong>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-900/60 p-8 sm:p-10 lg:p-14 rounded-3xl backdrop-blur gap-6 items-center max-w-full lg:max-w-[600px] w-full mx-auto">
              <h1 className="text-2xl sm:text-3xl text-white mb-3">
                Mulai Perjalanan Desain Anda!
              </h1>
              <div className="">
                <CarouselKustom />
              </div>
            </div>
          </div>

          <Link href={"/pemesanan"}>
            <Button className="w-full mt-10 p-7 bg-blue-500">
              <h1 className="text-2xl">Kustom Sekarang</h1>
            </Button>
          </Link>
          <h1 className="w-full flex justify-center items-center text-2xl text-white mt-5">
            Atau Konsultasikan Desainmu dengan Kami Melalui
          </h1>
          <div className="w-full flex justify-center items-center gap-5 mt-5">
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
      </div>
    </div>
  );
}
