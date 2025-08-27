"use client";

import { createClient } from "@/lib/supabase/client";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

type Testimoni = {
  id: number;
  author: string;
  rate: number;
  body: string;
};

const supabase = createClient();

const TestimonialsSection = () => {
  const [testimoni, setTestimoni] = useState<Testimoni[]>([]);

  useEffect(() => {
    const fetchTestimoni = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .limit(5);
      if (error) {
        console.error("Error fetching comments:", error.message);
      } else {
        setTestimoni(data as Testimoni[]);
      }
    };

    fetchTestimoni();
  }, []);

  const colors = [
    "bg-[#FADA7A]",
    "bg-[#A5B68D]",
    "bg-[#93BFCF]",
    "bg-[#F4BFBF]",
    "bg-[#C5B0CD]",
    "bg-[#DA6C6C]",
  ];

  return (
    <section className="flex flex-col justify-center w-full gap-8 px-1">
      <div className="w-full px-8 py-4 rounded-2xl flex justify-center bg-white">
        <h2 className="text-3xl font-semibold">
          Apa Kata Mereka Tentang ALPAS Studio?
        </h2>
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
                className="masonry-item p-4 flex flex-col gap-4 items-start bg-white/90 backdrop-blur-2xl rounded-2xl"
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
    </section>
  );
};

export default TestimonialsSection;
