"use client";
import { createClient } from "@/lib/supabase/client";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

type Pesanan = {
  id: number;
  nama: string;
  email: number;
  nohp: number;
  template_id: number;
};

type TopTemplate = {
  id: number;
  title: string;
  jumlah: number;
};


export default function ChartPenjualanStatistik() {
  const [pesanan, setPesanan] = useState<Pesanan[]>([]);
  const [topTemplates, setTopTemplates] = useState<TopTemplate[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: pesanans } = await supabase.from("pesanans").select("*");

      const { data: withTemplate } = await supabase
        .from("pesanans")
        .select(`template:template_id (id, title)`);

      const counter: { [key: number]: { title: string; jumlah: number } } = {};

      withTemplate?.forEach((item: any) => {
        const template = item.template;
        if (template) {
          if (!counter[template.id]) {
            counter[template.id] = { title: template.title, jumlah: 1 };
          } else {
            counter[template.id].jumlah++;
          }
        }
      });

      const sorted = Object.entries(counter)
        .map(([id, v]) => ({
          id: parseInt(id),
          title: v.title,
          jumlah: v.jumlah,
        }))
        .sort((a, b) => b.jumlah - a.jumlah)
        .slice(0, 3);

      setPesanan(pesanans || []);
      setTopTemplates(sorted);
    };

    fetchData();
  }, []);

  const totalTemplate = pesanan.filter((item) => item.template_id != null).length;
  const totalCustom = pesanan.filter((item) => item.template_id == null).length;

  const donutData = {
    labels: ["Custom", "Template"],
    datasets: [
      {
        label: "Total Penjualan",
        data: [totalCustom, totalTemplate],
        backgroundColor: ["#fffb97", "#fe7f42"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  // Tambahan chart bar horizontal
  const barData = {
    labels: topTemplates.map((t) => t.title),
    datasets: [
      {
        label: "Jumlah Penjualan",
        data: topTemplates.map((t) => t.jumlah),
        backgroundColor: ["#5FD5EC", "#2276FC", "#EE6F7C"],
        borderRadius: 8,
        barThickness: 25,
      },
    ],
  };

  const barOptions = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { display: false },
      y: { ticks: { color: "white" } },
    },
  };

  return (
    <div className="bg-red-600/13 backdrop-blur rounded-xl p-4 shadow-lg relative h-70 flex justify-between ">
      <div className="mt-5 ml-5 flex flex-col space-y-3">
        <h1 className="text-2xl text-white font-semibold">Top 3 template terlaris</h1>

        {/* Card manual */}
        {/* <div className="bg-[#5FD5EC]/40 w-160 h-15 flex">
          <div className="bg-[#5FD5EC] w-7 h-7  rounded-full m-2"></div>
          <div>
            <h1 className="text-xl text-white">Blue instagram content...</h1>
            <h1 className="text-sm text-white">290 downloads</h1>
          </div>
        </div>
        <div className="bg-[#2276FC]/40 w-130 h-15 flex">
          <div className="bg-[#2276FC] w-7 h-7  rounded-full m-2"></div>
          <div>
            <h1 className="text-xl text-white">Blue instagram content...</h1>
            <h1 className="text-sm text-white">290 downloads</h1>
          </div>
        </div>
        <div className="bg-[#EE6F7C]/40 w-90 h-15 flex">
          <div className="bg-[#EE6F7C] w-7 h-7  rounded-full m-2"></div>
          <div>
            <h1 className="text-xl text-white">Blue instagram content...</h1>
            <h1 className="text-sm text-white">290 downloads</h1>
          </div>
        </div> */}

        {/* Bar chart tambahan */}
        <div className="w-150">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      <div className="">
        <div className="w-52 h-52 mx-auto mt-4 mr-40 relative">
          <h1 className="w-60 justify-center text-xl text-white mb-2">
            Persentase Penjualan
          </h1>
          <div className="ml-10 w-full h-full">
            <Doughnut
              data={donutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    labels: {
                      color: "white",
                    },
                  },
                  tooltip: { enabled: true },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
