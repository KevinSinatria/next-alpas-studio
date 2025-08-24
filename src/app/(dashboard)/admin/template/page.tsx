"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@/lib/supabase/client";
import TemplateForm from "@/components/TemplateForm";
import { CirclePlusIcon } from "lucide-react";
import { toast } from "sonner";

type Template = {
  id: number;
  title: string;
  price: number;
  image_url: string;
  image_url_2?: string;
  image_url_3?: string;
  deks?: string;
};

type path = {
  id: number;
  title: string;
  price: number;
  image_url: string;
  image_url_2?: string;
  image_url_3?: string;
  deks?: string;
};

const supabase = createClient();

export default function TemplateAdmin() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState<Template | null>(null);

  const itemsPerPage = 3;
  const supabaseUrl =
    "https://bmgeuqxyshumafaxsauc.supabase.co/storage/v1/object/public/";

  const totalPages = Math.ceil(templates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = templates.slice(startIndex, startIndex + itemsPerPage);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPages = () => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", currentPage, "...", totalPages];
  };

  const fetchTemplates = async () => {
    const { data, error } = await supabase.from("templates").select("*");
    if (!error) setTemplates(data || []);
    else console.error("❌ Error fetching templates:", error.message);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <section className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center items-center">
      {!formOpen && (
        <Button
          className="mb-4 bg-blue-600 text-white px-4 py-2 w-full rounded shadow"
          onClick={() => {
            setFormData(null);
            setFormOpen(true);
          }}
        >
          <CirclePlusIcon className="mr-2 h-5 w-5" />
          Tambah Template
        </Button>
      )}

      {formOpen ? (
        <TemplateForm
          template={formData ?? undefined}
          onSuccess={() => {
            setFormOpen(false);
            setFormData(null);
            fetchTemplates();
          }}
          onClose={() => setFormOpen(false)}
        />
      ) : (
        <ScrollArea className="h-full w-full">
          <main className="w-full mb-8">
            <div
              className="grid gap-6 sm:gap-8 md:gap-10 
                  grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 
                  justify-center items-start px-2 sm:px-4"
            >
              {currentItems.map((template) => {
                const imageUrls = [
                  template.image_url,
                  template.image_url_2,
                  template.image_url_3,
                ]
                  .filter(Boolean)
                  .map((path) => path!.trim());

                return (
                  <div
                    key={template.id}
                    className="flex flex-col w-full gap-2 rounded-2xl shadow-2xl bg-white/80 p-3 sm:p-4"
                  >
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Image
                          src={supabaseUrl + template.image_url.trim()}
                          alt={template.title}
                          width={500}
                          height={500}
                          className="object-cover aspect-[4/5] w-full h-[300px] rounded-2xl"
                          unoptimized
                        />
                      </HoverCardTrigger>

                      <HoverCardContent className="mx-5 w-fit">
                        <div className="flex flex-col gap-4">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {imageUrls.map((img, index) => (
                              <Image
                                key={index}
                                src={supabaseUrl + img}
                                alt={template.title}
                                width={200}
                                height={200}
                                className="rounded-2xl object-cover"
                                unoptimized
                              />
                            ))}
                          </div>
                          <div>
                            <h1 className="text-xl font-semibold">
                              {template.title}
                            </h1>
                            <p className="text-sm text-gray-700">
                              {template.deks}
                            </p>
                            <div className="flex justify-between mt-2">
                              <span className="text-lg font-bold">
                                Rp {template.price.toLocaleString("id-ID")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>

                    <h2 className="text-black font-semibold text-base sm:text-lg mt-2">
                      {template.title.length > 30
                        ? template.title.substring(0, 30) + "..."
                        : template.title}
                    </h2>
                    <div className="flex justify-between mt-2">
                      <span className="text-lg font-bold">
                        Rp {template.price.toLocaleString("id-ID")}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          className="bg-yellow-400 text-black px-2 py-1 rounded"
                          onClick={() => {
                            setFormData(template);
                            setFormOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          className="bg-red-600 text-white px-2 py-1 rounded"
                          onClick={async () => {
                            const ok = confirm(
                              "Yakin ingin menghapus template ini?"
                            );
                            if (!ok) return;
                            // Daftar gambar yang akan dihapus
                            const imagePaths = [
                              template.image_url,
                              template.image_url_2,
                              template.image_url_3,
                            ].filter(Boolean);

                            // Buat relative path dari "templates/" (karena bucket-nya bernama "templates")
                            const relativePaths = imagePaths.map((path) =>
                              (path ?? "").replace("templates/", "")
                            );

                            // Hapus gambar dari storage Supabase
                            const { error: storageError } =
                              await supabase.storage
                                .from("templates")
                                .remove(relativePaths);

                            if (storageError) {
                              toast.success(
                                "❌ Gagal hapus data: " + storageError.message
                              );
                            }

                            // Hapus entri dari tabel
                            const { error: dbError } = await supabase
                              .from("templates")
                              .delete()
                              .eq("id", template.id);

                            if (dbError) {
                              toast.error(
                                "❌ Gagal hapus data: " + dbError.message
                              );
                            } else {
                              fetchTemplates(); // Refresh data
                              toast.success("Template berhasil dihapus.");
                            }
                          }}
                        >
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>

          <footer className="flex justify-center gap-2 mt-6 bg-gray-300/60 mx-100 p-2 rounded-full flex-wrap">
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-full bg-white text-black font-medium disabled:bg-white/70"
            >
              Previous
            </button>

            {getPages().map((page, i) =>
              page === "..." ? (
                <span key={i} className="px-2 text-black">
                  ...
                </span>
              ) : (
                <button
                  key={i}
                  onClick={() => changePage(page as number)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition ${
                    currentPage === page
                      ? "bg-white text-black shadow"
                      : "bg-transparent text-black hover:bg-white/50"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-full bg-black text-white font-medium disabled:opacity-40"
            >
              Next
            </button>
          </footer>
        </ScrollArea>
      )}
    </section>
  );
}
