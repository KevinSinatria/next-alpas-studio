"use client";
import { createClient } from "@/lib/supabase/client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type Pesanan = {
  id: number;
  nama: string;
  email: number;
  nohp: number;
  template_id: number;
};

export default function ChartPenjualan() {
  const [pesanan, setPesanan] = useState<Pesanan[]>([]);

  const supabase = createClient();

  useEffect(() => {
    const fetchTestimoni = async () => {
      const { data, error } = await supabase.from("pesanans").select("*");

      if (error) {
        console.error("Gagal fetch testimoni:", error.message);
      } else {
        setPesanan(data || []);
      }
    };

    fetchTestimoni();
  }, [supabase]);

const totalTemplate = pesanan.filter((item) => item.template_id != null).length;
const totalCustom = pesanan.filter((item) => item.template_id == null).length;

console.log("Total Custom:", totalCustom);
console.log("Total Template:", totalTemplate);

const dataChart = {
  labels: ["Custom", "Template"],
  datasets: [
    {
      label: "Total Penjualan",
      
      data: [totalCustom, totalTemplate],
      backgroundColor: [
        "#fffb97", 
        "#fe7f42",
      ],
      borderWidth: 0,
      cutout: "70%",
    },
  ],
};


  const totalPenjualan = pesanan.length;

  return (
    <div className="bg-red-600/13 h-full backdrop-blur rounded-xl p-4 shadow-lg relative">
      <div className="flex w-full justify-between">
        <h2 className="text-white font-bold text-2xl">Total Penjualan</h2>
      </div>

      <div className="flex">
        <div className="mt-35">
          <div className="text-3xl font-bold text-white ">{totalPenjualan}</div>
          <p className="text-xl text-gray-200">Pemesanan</p>
        </div>
        <div className="w-full mx-auto mt-4 relative flex items-center justify-center h-49">
          <Doughnut
            data={dataChart}
            options={{
              plugins: {
                  legend: {
                    labels: {
                      color: "white", // warna teks legend
                    },
                  },
                  tooltip: { enabled: true },
                },
            }}
            className="text-xl"
          />
        </div>
      </div>
    </div>
  );
}
