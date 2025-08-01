import { CarouselKustom } from "@/components/Carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const gambar = [
  '/ourkustom/Whatsapp.png',
  '/ourkustom/Instagram.png'
]

export default function KustomPage() {
  return (
    <div className="px-4 sm:px-8 py-8 lg:px-20 mx-40">
      <div className="bg-linear-to-b/oklch from-blue-700/20 to-white/70 p-14 rounded-3xl backdrop-blur gap-6 items-center justify-center mt-20 mx-5">
        <header className="w-full text-center md:text-left px-2 mb-10">
          <h2 className="text-white mt-3 sm:mt-5 flex flex-col gap-2">
            <span className="text-xl sm:text-3xl md:text-4xl font-semibold uppercase">
              KUSTOM DESAIN
            </span>
            <span className="text-sm sm:text-lg md:text-2xl text-white mx-auto md:mx-0 leading-snug">
              Butuh desain yang sesuai visi Anda? Di ALPAS Studio, Anda bisa
              request desain dari nol untuk brand, produk, atau kampanye
              digital. Konsultasi langsung dengan desainer, hasil auto maksimal!
            </span>
          </h2>
        </header>

        <main className="w-full">
          <div className="flex justify-center">
            <div className="bg-gray-900/60 p-14 rounded-3xl backdrop-blur gap-6 items-center max-w-150 justify-center  mx-5 ">
              <h1 className="text-3xl text-white mb-3">
                Mulai Perjalanan Desain Anda!
              </h1>
              <ul className="list-disc pl-6 space-y-2 text-2xl text-white">
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
            <div className="bg-gray-900/60 p-14 rounded-3xl backdrop-blur gap-6 items-center max-w-150 justify-center  mx-5 ">
              <h1 className="text-3xl text-white mb-3">
                Mulai Perjalanan Desain Anda!
              </h1>
              <div className="">
                <CarouselKustom />
              </div>
            </div>

          </div>
            <Button className="w-full mt-10 p-7 bg-blue-500">
              <h1 className="text-2xl">Kustom Sekarang</h1>
            </Button>
            <h1 className="w-full flex justify-center items-center text-2xl text-white mt-5">Atau Konsultasikan Desainmu dengan Kami Melalui</h1>
            <div className="w-full flex justify-center items-center gap-5 mt-5">
                {gambar.map((gambar,i) => 
                  <Image src={gambar} alt={gambar} key={i} width={60} height={60} />
                )}
            </div>
        </main>
      </div>
    </div>
  );
}
