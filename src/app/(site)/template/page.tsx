"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import PemesananTemplate from "@/components/FormPemesananTemplate";
import { createClient } from "@/lib/supabase/client";

type Template = {
  id: number;
  title: string;
  price: number;
  image_url: string;
  image_url_2?: string;
  image_url_3?: string;
  deks?: string;
};

const supabase = createClient();

export default function TemplatePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFormTemplate, setShowFormTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<{
    id: number;
    image: string;
    alt: string;
    title: string;
    dekskription: string;
    price: string;
    gambar: string[];
  } | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase.from("templates").select("*");

      if (error) {
        console.error("Error fetching templates:", error.message);
      } else {
        setTemplates(data);
      }
    };

    fetchTemplates();
  }, []);

  const supabaseUrl =
    "https://bmgeuqxyshumafaxsauc.supabase.co/storage/v1/object/public/";

  const itemsPerPage = 8;

  const totalPages = Math.ceil(templates.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = templates.slice(startIndex, startIndex + itemsPerPage);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPages = () => {
    let pages = [];
    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) pages = [1, 2, 3, "...", totalPages];
      else if (currentPage >= totalPages - 2)
        pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
      else pages = [1, "...", currentPage, "...", totalPages];
    }
    return pages;
  };

  return (
    <section className="px-4 sm:px-8 py-8 lg:px-20 w-full ">
      {showFormTemplate ? (
        <PemesananTemplate
          template={selectedTemplate}
          onBack={() => setShowFormTemplate(false)}
        />
      ) : (
        <div className="w-full flex flex-col bg-linear-to-b/oklch from-slate-700/40 to-gray-400/70 p-10 sm:p-8 rounded-3xl backdrop-blur gap-6 items-center justify-center mt-20 sm:mt-20">
          <header className="w-full text-center md:text-left px-2">
            <h2 className="text-white mt-3 sm:mt-5 flex flex-col gap-2">
              <span className="text-xl sm:text-3xl md:text-4xl font-semibold uppercase">
                TEMPLATE KAMI
              </span>
              <span className="text-sm sm:text-lg md:text-2xl max-w-2xl mx-auto md:mx-0 leading-snug">
                Jelajahi Ratusan Template Siap Pakai untuk Bisnis dan Personal
                Branding Anda!
              </span>
            </h2>
          </header>

          <main className="w-full m-10">
            <div
              className="grid gap-6 sm:gap-8 md:gap-10 
                          grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                          justify-center items-start w-full px-2 sm:px-4"
            >
              {currentItems.map((template) => {
                const imageUrls = [
                  template.image_url,
                  template.image_url_2,
                  template.image_url_3,
                ].filter(Boolean) as string[];

                return (
                  <div
                    key={template.id}
                    className="flex flex-col w-full gap-2 rounded-2xl shadow-2xl bg-white/80 p-3 sm:p-4"
                  >
                    <HoverCard>
                      <HoverCardContent className="mx-5">
                        <div className="flex flex-col gap-4">
                          <div className="grid grid-cols-2 md:grid-cols-3  gap-2">
                            {imageUrls.map((img, index) => (
                              <Image
                                key={index}
                                src={supabaseUrl + img.trim()}
                                alt={template.title}
                                width={200}
                                height={200}
                                className="rounded-2xl"
                                unoptimized
                              />
                            ))}
                          </div>
                          <div className="flex justify-between">
                            <div className="flex flex-col">
                              <h1 className="text-xl font-semibold">
                                {template.title}
                              </h1>
                              <h5>{template.deks}</h5>
                            </div>
                            <div className="flex gap-1 items-start mt-1">
                              <span className="text-xs bg-green-200 px-1 rounded-lg">
                                Rp
                              </span>
                              <span className="font-semibold text-lg sm:text-2xl">
                                {template.price.toLocaleString("id-ID")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
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
                    </HoverCard>

                    <h2 className="text-black font-semibold text-base sm:text-lg mt-2">
                      {template.title.length > 50
                        ? template.title.substring(0, 50) + "..."
                        : template.title}
                    </h2>
                    <div className="flex gap-1 items-start mt-1">
                      <span className="text-xs bg-green-200 px-1 rounded-lg">
                        Rp
                      </span>
                      <span className="font-semibold text-lg sm:text-2xl">
                        {template.price.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <Button
                      className="bg-blue-500 text-white w-full mt-2 rounded-lg shadow-lg hover:-translate-y-1 hover:shadow-2xl cursor-pointer active:translate-y-0 transition-all text-sm sm:text-base"
                      onClick={() => {
                        setSelectedTemplate({
                          id: template.id,
                          image: supabaseUrl + template.image_url,
                          alt: template.title,
                          title: template.title,
                          dekskription: template.deks || "",
                          price: template.price.toString(),
                          gambar: imageUrls.map((img) => supabaseUrl + img),
                        });
                        setShowFormTemplate(true);
                      }}
                    >
                      <span className="drop-shadow-lg font-semibold">
                        Order Now
                      </span>
                    </Button>
                  </div>
                );
              })}
            </div>
          </main>

          <footer className="p-1 sm:p-2 px-2 sm:px-4 rounded-full flex justify-center gap-2 mt-6 bg-gray-300 flex-wrap">
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-white text-black text-sm sm:text-base font-medium disabled:bg-white/50 transition"
            >
              Previous
            </button>

            <div className="flex items-center gap-1 sm:gap-2">
              {getPages().map((page, i) =>
                page === "..." ? (
                  <span
                    key={i}
                    className="px-1 sm:px-2 text-black text-sm sm:text-base"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={i}
                    onClick={() => changePage(page as number)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition ${
                      currentPage === page
                        ? "bg-white text-black shadow"
                        : "bg-transparent text-black hover:bg-white/50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-black text-white text-sm sm:text-base font-medium disabled:opacity-40 transition"
            >
              Next
            </button>
          </footer>
        </div>
      )}
    </section>
  );
}
