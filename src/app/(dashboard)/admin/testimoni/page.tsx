"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Star, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"; // jika belum punya fungsi `cn`, kamu bisa hapus

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

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleDelete = async (id: number) => {
    const ok = confirm("Hapus testimoni ini?");
    if (!ok) return;

    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus testimoni.");
      return;
    }

    setExpanded(null);
    fetchData();
  };

  return (
    <section className="px-4 sm:px-8 py-8 lg:px-20 w-full">
      {/* Grid testimoni */}
      <ScrollArea className="h-[600px] w-full p-1 rounded-lg border">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {testimoni.map((testi, index) => {
            const randomColor = colors[index % colors.length];
            const isExpanded = expanded === testi.id;
            return (
              <article
                key={testi.id}
                className="relative p-5 sm:p-6 flex flex-col gap-3 items-start bg-white/60 dark:bg-white/20 text-gray-900 dark:text-white/90 border border-white/30 backdrop-blur-2xl rounded-2xl shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => handleDelete(testi.id)}
                  className="absolute right-3 top-3 rounded-xl p-2 bg-red-500/90 hover:bg-red-600 text-white shadow"
                  aria-label="Hapus testimoni"
                  title="Hapus"
                >
                  <Trash2 size={18} />
                </button>

                <h3
                  className={`${randomColor} text-sm px-3 py-1.5 rounded-lg text-black font-semibold shadow`}
                >
                  {testi.author || "User"}
                </h3>

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

                <p
                  className={cn(
                    "italic text-sm leading-relaxed text-black/80 dark:text-white/80 transition-all duration-200 ease-in-out",
                    isExpanded ? "" : "line-clamp-4"
                  )}
                >
                  {testi.body}
                </p>

                {testi.body.length > 100 && (
                  <button
                    onClick={() =>
                      setExpanded(isExpanded ? null : testi.id)
                    }
                    className="text-blue-600 hover:underline text-xs mt-1"
                  >
                    {isExpanded ? "Sembunyikan" : "Lihat selengkapnya"}
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </ScrollArea>

      {/* Pagination */}
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
          onClick={() =>
            setCurrentPage((p) => Math.min(p + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}
