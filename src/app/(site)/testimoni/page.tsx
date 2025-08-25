"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { CheckCircle2Icon, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";


type Testimoni = {
  id: number;
  author: string;
  rate: number;
  body: string;
};

const supabase = createClient();


export default function TestimoniPage() {
  const [testimoni, setTestimoni] = useState<Testimoni[]>([]);
  
  useEffect(() => {
    const fetchTestimoni = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*");
      if (error) {
        console.error("Error fetching comments:", error.message);
      } else {
        setTestimoni(data as Testimoni[]);
      }
    };
  
    fetchTestimoni();
  }, []);
  const [nama, setNama] = useState("");
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const colors = [
    "bg-[#FADA7A]",
    "bg-[#A5B68D]",
    "bg-[#93BFCF]",
    "bg-[#F4BFBF]",
    "bg-[#C5B0CD], bg-[#DA6C6C]",
  ];
const listRef = useRef<HTMLDivElement>(null);
const handleSubmit = async () => {
  if (!nama || rating === 0 || !body)
    return alert("Semua field harus diisi!");

  const { data, error } = await supabase.from("comments").insert([
    {
      author: nama,
      rate: rating,
      body: body,
    },
  ]).select(); // pastikan .select() agar dapat data balik

  if (error || !data || data.length === 0) {
    console.error("Insert error:", error?.message);
    alert("Gagal menyimpan testimoni.");
    return;
  }

  setTestimoni([...testimoni, data[0]]);
  setShowAlert(true);
    if (showAlert && listRef.current) {
    listRef.current.scrollIntoView({ behavior: "smooth" });
  }

  setNama("");
  setRating(0);
  setBody("");
};


  return (
    <section className=" py-8 lg:px-20 w-full">
      <div className=" p-4 gap-6 items-center justify-center mt-30 mx-5 ">
        <header className="w-full text-center md:text-left px-2 mb-10">
          <h2 className="text-black mt-3 sm:mt-5 flex flex-col gap-2">
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
              <div className=" max-w-2xl mx-auto md:mx-0 space-y-5 leading-snug">
                {showAlert && (
                  <Alert className="bg-green-100">
                    <CheckCircle2Icon />
                    <AlertTitle>
                      Success! Your changes have been saved
                    </AlertTitle>
                    <AlertDescription>
                      Testimoni berhasil ditambahkan.
                    </AlertDescription>
                  </Alert>
                )}

                <label className="text-xl mb-4 text-white">Nama</label>
                <Input
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                  className="bg-white/80 text-sm sm:text-lg font-semibold h-13 text-gray-800"
                  type="text"
                  placeholder="Masukan Nama Mu Disini"
                />

                <label className="text-xl mb-4 text-white">
                  Bintang penilaian
                </label>

                <div className="flex gap-2 justify-center sm:justify-start">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Star
                      key={num}
                      className={`w-8 h-8 cursor-pointer ${
                        num <= rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-400"
                      }`}
                      onClick={() => setRating(num)}
                    />
                  ))}
                </div>

                <label className="text-xl mb-4 text-white">Ulasan</label>
                <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  className="bg-white/80 text-sm sm:text-lg font-semibold h-13 text-gray-800"
                  placeholder="Tuliskan ulasanmu disini"
                />

                <Button className="w-full bg-blue-500" onClick={handleSubmit}>
                  Kirim
                </Button>
              </div>
            </div>
          </div>
          <div className="masonry">
        {testimoni.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            Belum ada testimoni.
          </p>
        ) : (
          testimoni.map((testi, index) => {
            const color = colors[index % colors.length];
            return (
              <div
                key={testi.id}
                className="masonry-item p-4 flex flex-col gap-4 items-start bg-white/50 backdrop-blur-2xl rounded-2xl"
              >
                <h3
                  className={`${color} text-md px-4 py-2 max-w-30 justify-center items-center flex text-black font-semibold rounded-lg`}
                >
                  {testi.author || "User"}
                </h3>
                <div className="flex gap-2 my-2">
                  {[...Array(testi.rate)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400 fill-yellow-400"
                      size={20}
                    />
                  ))}
                </div>
                <p className="italic">{testi.body}</p>
              </div>
            );
          })
        )}
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
