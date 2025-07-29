"use client";
import { useState } from "react";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const templates = [
  {
    id: 1,
    image: "/ourtemplates/template1.png",
    alt: "template1",
    title: "Blue instagram content template",
    dekskription:
      "Template untuk konten Instagram dengan tema biru yang siap pakaiskjakdhakdhkajshjhkjkxhjzcyakhjslakjdakjsdlk.",
    price: "31.700,-",
    gambar: [
      "/ourtemplates/template1.png",
      "/ourtemplates/template2.png",
      "/ourtemplates/template3.png",
    ],
  },
  {
    id: 2,
    image: "/ourtemplates/template2.png",
    alt: "template2",
    title: "Green instagram content template",
    dekskription:
      "Template untuk konten Instagram dengan tema hijau yang siap pakai.",
    price: "29.900,-",
    gambar: [
      "/ourtemplates/template2.png",
      "/ourtemplates/template1.png",
      "/ourtemplates/template3.png",
    ],
  },
  {
    id: 3,
    image: "/ourtemplates/template3.png",
    alt: "template3",
    title: "Red instagram content template",
    dekskription:
      "Template untuk konten Instagram dengan tema merah yang siap pakai.",
    price: "35.000,-",
    gambar: [
      "/ourtemplates/template3.png",
      "/ourtemplates/template1.png",
      "/ourtemplates/template2.png",
    ],
  },
  // Tambahkan lebih banyak template sesuai kebutuhan
  {
    id: 4,
    image: "/ourtemplates/template4.png",
    alt: "template4",
    title: "Yellow instagram content template",
    dekskription:
      "Template untuk konten Instagram dengan tema kuning yang siap pakai.",
    price: "28.500,-",
    gambar: [
      "/ourtemplates/template4.png",
      "/ourtemplates/template1.png",
      "/ourtemplates/template2.png",
    ],
  },
  {
    id: 5,
    image: "/ourtemplates/template5.png",
    alt: "template5",
    title: "Purple instagram content template",
    dekskription:
      "Template untuk konten Instagram dengan tema ungu yang siap pakai.",
    price: "33.000,-",
    gambar: [
      "/ourtemplates/template5.png",
      "/ourtemplates/template1.png",
      "/ourtemplates/template2.png",
    ],
  },
];

export default function TemplatePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(templates.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = templates.slice(startIndex, startIndex + itemsPerPage);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // 🔥 Generate nomor halaman dengan ellipsis
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
    <section className="px-4 sm:px-8 py-8 lg:px-20 w-full">
      <div className="w-full flex flex-col bg-linear-to-b/oklch from-slate-700/40 to-gray-400/70 p-4 sm:p-8 rounded-3xl backdrop-blur gap-6 items-center justify-center mt-10 sm:mt-20">
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

        <main className="w-full">
          <div
            className="grid gap-6 sm:gap-8 md:gap-10 
                          grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                          justify-center items-start w-full px-2 sm:px-4"
          >
            {currentItems.map((template) => (
              <div
                key={template.id}
                className="flex flex-col w-full gap-2 rounded-2xl shadow-2xl bg-white/80 p-3 sm:p-4"
              >
                <HoverCard>
                  <HoverCardContent className="mx-5">
                    <div className="flex flex-col gap-4">
                      <div className="flex ">
                        {template.gambar &&
                          template.gambar.map((img, index) => (
                            <Image
                              key={index}
                              src={img}
                              alt={template.alt}
                              width={200}
                              height={200}
                              className=" rounded-2xl"
                            />
                          ))}
                      </div>
                      <div className="flex">
                        <div className="flex flex-col">
                          <h1 className="text-xl font-semibold ">
                            {template.title}
                          </h1>
                          <h5>{template.dekskription}</h5>
                        </div>
                        <div className="flex gap-1 items-start mt-1">
                          <span className="text-xs bg-green-200 px-1 rounded-lg">
                            Rp
                          </span>
                          <span className="font-semibold text-lg sm:text-2xl">
                            {template.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                  <HoverCardTrigger asChild>
                    <Link href={`/templates/${template.id}`}>
                      <Image
                        src={template.image}
                        alt={template.alt}
                        width={500}
                        height={500}
                        className="object-cover w-full h-auto rounded-2xl"
                      />
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
                          {template.price}
                        </span>
                      </div>
                      <Button className="bg-blue-500 text-white w-full mt-2 rounded-lg shadow-lg hover:-translate-y-1 hover:shadow-2xl cursor-pointer active:translate-y-0 transition-all text-sm sm:text-base">
                        <span className="drop-shadow-lg font-semibold">
                          Order Now
                        </span>
                      </Button>
                    </Link>
                  </HoverCardTrigger>
                </HoverCard>
              </div>
            ))}
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
    </section>
  );
}
