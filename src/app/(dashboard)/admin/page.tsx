"use client";

import ChartPemasukan from "@/components/ChartPemasukan";
import ChartPenjualan from "@/components/ChartPenjualan";
import ListPesananTerbaru from "@/components/PesananTerbaru";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@/lib/supabase/client";
import { Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
        // toast.success("selamat datang admin");
      }
    };


    fetchTestimoni();

  }, [supabase]);


  return (
    <div className="grid grid-cols-3 gap-6 m-5">
      <Link href="/admin/statistik">
        <ChartPenjualan />
      </Link>

      <Link
        href="/admin/statistik"
        className="col-span-2"
      >
        <ChartPemasukan />
      </Link>

      <ListPesananTerbaru />

      <ScrollArea className="h-64 rounded-md">
        <div className="bg-white/50 backdrop-blur-lg rounded-xl p-4 shadow-lg">
          <h2 className="text-white font-semibold mb-4 ">Testimoni</h2>
          {testimoni.length === 0 ? (
            <p className="text-gray-600 italic">Belum ada testimoni.</p>
          ) : (
            testimoni.map((item) => (
              <div key={item.id} className="bg-white/30 rounded-lg p-3 mb-3">
                <p className="font-bold text-blue-600">{item.author}</p>
                <div className="text-yellow-400 text-lg mb-1 flex">
                  {[...Array(item.rate)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400 fill-yellow-400"
                      size={20}
                    />
                  ))}
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
