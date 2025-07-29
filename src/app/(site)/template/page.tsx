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
    price: "31.700,-",
  },
  {
    id: 2,
    image: "/ourtemplates/template2.png",
    alt: "template2",
    title: "Blue instagram content template",
    price: "31.700,-",
  },
  {
    id: 3,
    image: "/ourtemplates/template3.png",
    alt: "template3",
    title: "Blue instagram content template",
    price: "31.700,-",
  },
  {
    id: 4,
    image: "/ourtemplates/template2.png",
    alt: "template2",
    title: "Blue instagram content template",
    price: "31.700,-",
  },
  {
    id: 5,
    image: "/ourtemplates/template3.png",
    alt: "template3",
    title: "Blue instagram content templatedjdkjahksjhkdajkjahskdjhakdhakhkh",
    price: "31.700,-",
  },
  {
    id: 6,
    image: "/ourtemplates/template2.png",
    alt: "template2",
    title: "Blue instagram content template",
    price: "31.700,-",
  },
  {
    id: 7,
    image: "/ourtemplates/template3.png",
    alt: "template3",
    title: "Blue instagram content template",
    price: "31.700,-",
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
    <section className="px-8 py-12 lg:px-20 w-full">
      <div className="w-full flex flex-col bg-linear-to-b/oklch from-slate-700/40 to-gray-400/70 p-8 rounded-3xl backdrop-blur gap-8 items-center justify-center mt-20">
        <header className="w-full text-center md:text-left">
          <h2 className="text-white mt-5 flex flex-col gap-2 ml-15">
            <span className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase">
              TEMPLATE KAMI
            </span>
            <span className="text-base sm:text-lg md:text-2xl max-w-2xl mx-auto md:mx-0">
              Jelajahi Ratusan Template Siap Pakai untuk Bisnis dan Personal
              Branding Anda!
            </span>
          </h2>
        </header>

        <main className="flex gap-8 flex-wrap w-full">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-center items-center xl:gap-10 gap-20 w-full xl:mx-20 md:mx-2 mx-2">
            {currentItems.map((template) => (
              <div
                key={template.id}
                className="flex flex-col flex-1 xl:w-full md:w-70 w-90 gap-2 rounded-2xl shadow-2xl bg-white/80 p-4"
              >
                
                <HoverCard >
                  <HoverCardContent className="w-200 m-5">
                    <div className="flex justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">@nextjs</h4>
                        <p className="text-sm">
                          The React Framework – created and maintained by
                          @vercel.
                        </p>
                        <div className="text-muted-foreground text-xs">
                          Joined December 2021
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
                        className="object-cover w-full rounded-2xl"
                      />
                      <h2 className="text-black font-semibold text-lg">
                        {template.title.length > 50 ? template.title.substring(0, 50) + "..." : template.title}
                      </h2>
                      <div className="flex gap-2 items-start">
                        <span className="text-xs bg-green-200 px-1 rounded-lg">
                          Rp
                        </span>
                        <span className="font-semibold text-2xl">
                          {template.price}
                        </span>
                      </div>
                      <Button className="bg-blue-500 text-white w-full rounded-lg shadow-lg hover:-translate-y-1 hover:shadow-2xl cursor-pointer active:translate-y-0 transition-all">
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

        <footer className=" p-2 px-4 rounded-full flex justify-center gap-2 mt-6 bg-gray-300">
          {/* Previous */}
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-full bg-white text-black font-medium disabled:bg-white/50 transition"
          >
            Previous
          </button>

          {/* Numbered Pages */}
          <div className="flex items-center gap-2">
            {getPages().map((page, i) =>
              page === "..." ? (
                <span key={i} className="px-2 text-white">
                  ...
                </span>
              ) : (
                <button
                  key={i}
                  onClick={() => changePage(page)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition ${
                    currentPage === page
                      ? "bg-white text-black shadow"
                      : "bg-transparent text-white hover:bg-white/20"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>

          {/* Next */}
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-full bg-black text-white font-medium disabled:opacity-40 transition"
          >
            Next
          </button>
        </footer>
      </div>
    </section>
  );
}
