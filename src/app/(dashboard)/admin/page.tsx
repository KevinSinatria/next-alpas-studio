// src/app/(dashboard)/admin/page.tsx

"use client";

import ChartPemasukan from "@/components/ChartPemasukan";
import ChartPenjualan from "@/components/ChartPenjualan";
import ListPesananTerbaru from "@/components/PesananTerbaru";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";


const DashboardPage = () => {
  type Testimoni = {
    id: number;
    author: string;
    rate: number;
    body: string;
  };
    const [testimoni, setTestimoni] = useState<Testimoni[]>([]);
  
    const supabase = createClient();
  
    useEffect(() => {
      const fetchTestimoni = async () => {
        const { data, error } = await supabase.from("comments").select("*");
  
        if (error) {
          console.error("Gagal fetch testimoni:", error.message);
        } else {
          setTestimoni(data || []);
        }
      };
  
      fetchTestimoni();
    }, []);

  return (
    <div className="grid grid-cols-3 gap-6 m-5">
      <Link href="/admin/statistik">
        <ChartPenjualan />
      </Link>

      <Link
        href="/admin/statistik"
        className="bg-blue-500/20 backdrop-blur-lg rounded-xl p-4 shadow-lg col-span-2 flex "
      >
        <div className="w-70 p-5">
          <div className="w-full flex">
            <h2 className="text-white font-semibold text-xl">
              Total Pemasukan
            </h2>
          </div>
          <div className="text-3xl font-bold text-white mt-2">
            Rp 9.090.999,-
          </div>
        </div>

        <ChartPemasukan />
      </Link>

      <ListPesananTerbaru/>

      <ScrollArea className="h-64 rounded-md">
        <div className="bg-white/50 backdrop-blur-lg rounded-xl p-4 shadow-lg">
          <h2 className="text-white font-semibold mb-4 ">Testimoni</h2>
          {testimoni.length === 0 ? (
          <p className="text-gray-600 italic">Belum ada testimoni.</p>
        ) : (
          testimoni.map((item) => (
            <div key={item.id} className="bg-white/30 rounded-lg p-3 mb-3">
              <p className="font-bold text-blue-600">{item.author}</p>
              <div className="text-yellow-400 text-lg mb-1">
                {"★".repeat(item.rate)}{" "}
                {"☆".repeat(Math.max(0, 5 - item.rate))}
              </div>
              <p className="text-gray-800 text-sm">{item.body}</p>
            </div>
          ))
        )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DashboardPage;
