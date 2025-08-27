"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"; // pastikan path ini benar

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

const OurTemplateSection = () => {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase.from("templates").select("*").limit(4);

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

  return (
    <section className="px-8 py-12 lg:px-20 w-full">
      <div className="w-full flex flex-col bg-linear-to-b/oklch from-slate-700/40 to-gray-400/70 p-8 rounded-3xl backdrop-blur gap-8 items-center justify-center">
        <header className="w-full">
          <h2 className="text-3xl text-white">
            <span className="font-semibold uppercase">TEMPLATE KAMI </span>--
            Siap Pakai untuk Kebutuhan Visual Anda!
          </h2>
        </header>

        <main className="flex gap-8 justify-center items-center flex-wrap w-full">
          {templates.map((template) => {
            const gambar = [
              template.image_url,
              template.image_url_2,
              template.image_url_3,
            ]
              .filter(Boolean)
              .map((img) => supabaseUrl + img!.trim());

            return (
              <div
                key={template.id}
                className="flex flex-col gap-2 rounded-2xl shadow-2xl bg-white/80 p-4"
              >
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Image
                      src={gambar[0]}
                      alt={template.title}
                      width={350}
                      height={350}
                      className="object-cover aspect-[4/5] w-full h-[300px] rounded-2xl"
                      unoptimized
                    />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-full">
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ">
                        {gambar.map((img, index) => (
                          <Image
                            key={index}
                            src={img}
                            alt={`Gambar ${index + 1}`}
                            width={200}
                            height={200}
                            className="rounded-2xl"
                            unoptimized
                          />
                        ))}
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="flex flex-col">
                          <h1 className="text-xl font-semibold">
                            {template.title}
                          </h1>
                          <h5 className="text-sm text-gray-600">
                            {template.deks}
                          </h5>
                        </div>
                        <div className="flex gap-1 items-start mt-1">
                          <span className="text-xs bg-green-200 px-1 rounded-lg">
                            Rp
                          </span>
                          <span className="font-semibold text-lg sm:text-2xl">
                            {template.price.toLocaleString("id-ID")},-
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
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
                    {template.price.toLocaleString("id-ID")},-
                  </span>
                </div>
              </div>
            );
          })}
        </main>

        <footer className="w-full flex justify-center">
          <Link
            href="/template"
            className="flex items-center gap-4 bg-slate-800 cursor-pointer hover:bg-slate-700 active:bg-slate-900 transition-all rounded-2xl text-white px-4 py-2"
          >
            Lihat Selengkapnya <ArrowRight size={16} />
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default OurTemplateSection;
