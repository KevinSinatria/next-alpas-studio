"use client";
import { Star, Trash2 } from "lucide-react";
import { useState } from "react";

type Testimoni = {
  id: number;
  nama: string;
  rating: number;
  body: string;
};

const initialTestimoni: Testimoni[] = [
  {
    id: 1,
    nama: "Waqqir",
    rating: 4,
    body: "Web ini sangat membantu sekali...",
  },
  { id: 2, nama: "Panji", rating: 2, body: "Membantu promosi bisnis saya." },
  { id: 3, nama: "Azzam", rating: 1, body: "Cukup, masih bisa ditingkatkan." },
  { id: 4, nama: "Alya", rating: 5, body: "Keren! Cepat & hasilnya bagus." },
  { id: 5, nama: "Syifa", rating: 5, body: "Sangat puas dengan pelayanannya." },
];

export default function TestimoniPage() {
  const [testimoni, setTestimoni] = useState<Testimoni[]>(initialTestimoni);


  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-pink-500",
  ];


  const handleDelete = (id: number) => {
    const ok = confirm("Hapus testimoni ini?");
    if (!ok) return;
    setTestimoni((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <section className="px-4 sm:px-8 py-8 lg:px-20 w-full">
      {/* Container utama: glass + blur */}

      {/* Grid kartu testimoni */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {testimoni.map((testi, index) => {
          const randomColor = colors[index % colors.length];
          return (
            <article
              key={testi.id}
              className="relative p-5 sm:p-6 flex flex-col gap-3 items-start bg-white/60 dark:bg-white/20 text-gray-900 dark:text-white/90 border border-white/30 backdrop-blur-2xl rounded-2xl shadow-lg"
            >
              {/* tombol hapus */}
              <button
                onClick={() => handleDelete(testi.id)}
                className="absolute right-3 top-3 rounded-xl p-2 bg-red-500/90 hover:bg-red-600 text-white shadow"
                aria-label="Hapus testimoni"
                title="Hapus"
              >
                <Trash2 size={18} />
              </button>

              {/* badge nama */}
              <h3
                className={`${randomColor} text-sm px-3 py-1.5 rounded-lg text-black font-semibold shadow`}
              >
                {testi.nama || "User"}
              </h3>

              {/* rating */}
              <div className="flex gap-1.5 my-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < testi.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-400"
                    }
                  />
                ))}
              </div>

              {/* isi */}
              <p className="italic text-sm leading-relaxed text-black/80 dark:text-white/80">
                {testi.body ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut."}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
