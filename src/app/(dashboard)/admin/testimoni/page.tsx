"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Star, Trash2 } from "lucide-react";

type Testimoni = {
  id: number;
  author: string;
  rate: number;
  body: string;
};

const supabase = createClient();

export default function TestimoniPage() {
  const [testimoni, setTestimoni] = useState<Testimoni[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-pink-500",
  ];

  // Fungsi ambil data dari Supabase
  const fetchData = async () => {
    const from = (currentPage - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    const { data, count, error } = await supabase
      .from("comments")
      .select("id, author, rate, body", { count: "exact" })
      .order("id", { ascending: true })
      .range(from, to);

    if (error) {
      console.error("Gagal ambil data:", error.message);
    } else {
      setTestimoni(data as Testimoni[]);
      setTotalPages(Math.ceil((count || 1) / itemsPerPage));
    }
  };

  // Ambil ulang saat halaman berubah
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // Scroll ke atas saat pindah halaman
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleDelete = async (id: number) => {
    const ok = confirm("Hapus testimoni ini?");
    if (!ok) return;

    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus testimoni.");
      return;
    }

    setExpanded(null); // tutup yang sedang terbuka
    setCurrentPage(1); // reset halaman
    fetchData(); // ambil data ulang
  };

  return (
    <section className="px-4 sm:px-8 py-8 lg:px-20 w-full">
      {/* Grid testimoni */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {testimoni.map((testi, index) => {
          const randomColor = colors[index % colors.length];
          return (
            <article
              key={testi.id}
              className="relative p-5 sm:p-6 flex flex-col gap-3 items-start bg-white/60 dark:bg-white/20 text-gray-900 dark:text-white/90 border border-white/30 backdrop-blur-2xl rounded-2xl shadow-lg"
            >
              {/* Tombol hapus */}
              <button
                onClick={() => handleDelete(testi.id)}
                className="absolute right-3 top-3 rounded-xl p-2 bg-red-500/90 hover:bg-red-600 text-white shadow"
                aria-label="Hapus testimoni"
                title="Hapus"
              >
                <Trash2 size={18} />
              </button>

              {/* Nama */}
              <h3
                className={`${randomColor} text-sm px-3 py-1.5 rounded-lg text-black font-semibold shadow`}
              >
                {testi.author || "User"}
              </h3>

              {/* Rating */}
              <div className="flex gap-1.5 my-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < testi.rate
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-400"
                    }
                  />
                ))}
              </div>

              {/* Body testimoni */}
              <p className="italic text-sm leading-relaxed text-black/80 dark:text-white/80">
                {testi.body && testi.body.length > 100
                  ? expanded === testi.id
                    ? testi.body
                    : testi.body.slice(0, 100) + "..."
                  : testi.body || ""}
              </p>

              {testi.body && testi.body.length > 100 && (
                <button
                  onClick={() =>
                    setExpanded(expanded === testi.id ? null : testi.id)
                  }
                  className="text-blue-600 hover:underline text-xs mt-1"
                >
                  {expanded === testi.id ? "Sembunyikan" : "Lihat selengkapnya"}
                </button>
              )}
            </article>
          );
        })}
      </div>

      {/* Navigasi halaman */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-black text-white"
                : "bg-gray-100 text-black hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}
