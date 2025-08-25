"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client"; // pastikan path ini benar
import { ScrollArea } from "@/components/ui/scroll-area"; // asumsi ini sudah ada

type Pesanan = {
  id: number;
  nama: string;
  email: string;
  created_at: string;
};

export default function ListPesananTerbaru() {
  const [pesanan, setPesanan] = useState<Pesanan[]>([]);

  useEffect(() => {
    const supabase = createClient();

    const fetchPesanan = async () => {
      const { data, error } = await supabase
        .from("pesanans")
        .select("id, nama, email, created_at")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Gagal fetch data:", error);
      } else {
        setPesanan(data);
      }
    };

    fetchPesanan();
  }, []);

    return (
    <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 shadow-lg col-span-2">
      <h2 className="text-white font-semibold mb-4">Pesanan Terbaru</h2>

      <ScrollArea className="h-48 rounded-md">
        <table className="w-full text-left text-white">
          <thead>
            <tr className="border-b border-white/20">
              <th className="pb-2">Order</th>
              <th className="pb-2">Nama</th>
              <th className="pb-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {pesanan.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-2 text-center text-white/60">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              pesanan.map((item) => (
                <tr key={item.id} className="border-b border-white/10">
                  <td className="py-2">#{item.id}</td>
                  <td>{item.nama}</td>
                  <td>{item.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );
}