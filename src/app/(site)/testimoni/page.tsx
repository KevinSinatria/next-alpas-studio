"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2Icon, Star } from "lucide-react";
import { useState } from "react";

type testimoni = {
  id: number;
  nama: string;
  rating: number;
  body: string;
};
const testimoni = [
  {
    id: 1,
    nama: "waqqir",
    rating: 4,
    body: "web ini sangat membantu sekali untuk mempromosikan bisnis aku",
  },
  {
    id: 2,
    nama: "Panji",
    rating: 2,
    body: "web ini sangat membantu sekali untuk mempromosikan bisnis aku",
  },
  {
    id: 3,
    nama: "Azzam",
    rating: 1,
    body: "web ini sangat membantu sekali untuk mempromosikan bisnis aku",
  },
  {
    id: 4,
    nama: "alya",
    rating: 5,
    body: "web ini sangat membantu sekali untuk mempromosikan bisnis aku",
  },
  {
    id: 5,
    nama: "Syifa",
    rating: 5,
    body: "web ini sangat membantu sekali untuk mempromosikan bisnis aku",
  },
];
const testiSatu = testimoni.map((testi) => {
  if (testi.id % 2 === 0) {
    return (
      <div key={testi.id} className="w-full flex justify-end mb-4">
        <div className="max-w-md p-4 flex flex-col gap-4 items-start bg-white/50 backdrop-blur-2xl rounded-2xl">
          <h3 className="bg-blue-500 text-sm px-4 py-2 text-white rounded-lg">
            {testi.nama}
          </h3>
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />
            ))}
          </div>
          <p className="italic">{testi.body}</p>
        </div>
      </div>
    );
  } 
});
const testiDua = testimoni.map((testi) => {
  if (testi.id % 2 === 1) {
   
    return (
      <div key={testi.id} className="w-full flex justify-start mb-4">
        <div className="max-w-md p-4 flex flex-col gap-4 items-start bg-white/50 backdrop-blur-2xl rounded-2xl">
          <h3 className="bg-green-500 text-sm px-4 py-2 text-white rounded-lg">
            {testi.nama || 'Alminetta'}
          </h3>
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />
            ))}
          </div>
          <p className="italic">
            {testi.body || 'Lorem ipsum dolor sit amet...'}
          </p>
        </div>
      </div>
    );
  } 
});


export default function TestimoniPage() {
  const [showAlert, setShowAlert] = useState(false);
  return (
    <section className="px-4 sm:px-8 py-8 lg:px-20 w-full">
      <div className="bg-linear-to-b/oklch from-blue-400/20 to-white/50 p-14 rounded-3xl backdrop-blur gap-6 items-center justify-center mt-30 mx-5 ">
        <header className="w-full text-center md:text-left px-2 mb-10">
          <h2 className="text-white mt-3 sm:mt-5 flex flex-col gap-2">
            <span className="text-xl sm:text-3xl md:text-4xl font-semibold uppercase">
              Apa Kata Mereka Tentang ALPAS Studio?
            </span>
            <span className="text-sm sm:text-lg md:text-2xl  mx-auto md:mx-0 leading-snug">
              Lihat karya terbaik ALPAS Studio dan beri testimoni untuk bantu
              kami terus berkembang.
            </span>
          </h2>
        </header>

        <main className="w-full">
          <div className="bg-gray-800/70 p-10 rounded-3xl backdrop-blur gap-6 items-center justify-center mb-20">
            <div className="w-full text-center md:text-left px-2">
              <div className="text-sm sm:text-lg md:text-2xl max-w-2xl mx-auto md:mx-0 space-y-5 leading-snug">
                {showAlert && (
                  <Alert>
                    <CheckCircle2Icon />
                    <AlertTitle>
                      Success! Your changes have been saved
                    </AlertTitle>
                    <AlertDescription>
                      This is an alert with icon, title and description.
                    </AlertDescription>
                  </Alert>
                )}

                <label className="text-xl mb-4 text-white">Nama</label>
                <Input
                  required
                  className="bg-white/80 text-2xl font-semibold h-13 text-gray-800"
                  type="text"
                  placeholder="Masukan Nama Mu Disini"
                />

                <label className="text-xl mb-4 text-white">
                  Bintang penilaian
                </label>
                <div className="flex">
                  <Input
                    required
                    className="bg-white/80 text-2xl font-semibold h-13 text-gray-800"
                    type="checkbox"
                    placeholder="Masukan Nama Mu Disini"
                  />
                  <Input
                    required
                    className="bg-white/80 text-2xl font-semibold h-13 text-gray-800"
                    type="checkbox"
                    placeholder="Masukan Nama Mu Disini"
                  />
                  <Input
                    required
                    className="bg-white/80 text-2xl font-semibold h-13 text-gray-800"
                    type="checkbox"
                    placeholder="Masukan Nama Mu Disini"
                  />
                  <Input
                    required
                    className="bg-white/80 text-2xl font-semibold h-13 text-gray-800"
                    type="checkbox"
                    placeholder="Masukan Nama Mu Disini"
                  />
                  <Input
                    required
                    className="bg-white/80 text-2xl font-semibold h-13 text-gray-800"
                    type="checkbox"
                    placeholder="Masukan Nama Mu Disini"
                  />
                </div>

                <label className="text-xl mb-4 text-white">Ulasan</label>
                <Textarea
                  required
                  className="bg-white/80 text-2xl font-semibold h-13 text-gray-800"
                  placeholder="Tuliskan ulasanmu disini"
                />
                <Button
                  className="w-full bg-blue-500"
                  onClick={() => setShowAlert(true)}
                >
                  Kirim
                </Button>
              </div>
            </div>
          </div>

          <div className="flex w-full f.ex-wrap gap-8">
            
              {/* masukan disini */}
              {testiSatu}
              {testiDua}
            
          </div>
        </main>
      </div>
    </section>
  );
}

// <header className="w-full text-center md:text-left px-2">

//       </header>

//       <main className="w-full">

//       </main>
