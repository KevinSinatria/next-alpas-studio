"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Pemasukan = {
  id: number;
  nama: string;
  created_at: string;
  template:
    | {
        id: number;
        price: number;
      }
    | {
        id: number;
        price: number;
      }[]
    | null;
};

export default function ChartPemasukan() {
  const [monthlyData, setMonthlyData] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("pesanans")
        .select(`id, nama, created_at, template:template_id(id, price)`);

      if (error) {
        console.error("Error fetching pemasukan:", error.message);
        return;
      }

      const pemasukan = data as Pemasukan[];

      // Inisialisasi array 12 bulan
      const totalPerBulan = new Array(12).fill(0);

      pemasukan.forEach((item) => {
        const harga = Array.isArray(item.template)
          ? item.template[0]?.price || 0
          : item.template?.price || 0;

        if (item.created_at) {
          const bulan = new Date(item.created_at).getMonth();
          totalPerBulan[bulan] += harga;
        }
      });

      setMonthlyData(totalPerBulan);
    };

    fetchData();
  }, []);

  const bulanLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const data = {
    labels: bulanLabels,
    datasets: [
      {
        label: "Total Pemasukan",
        data: monthlyData,
        backgroundColor: "#5B58EB",
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };

  type PemasukanItem = {
    id: number;
    nama: string;
    template: {
      id: number;
      price: number;
    } | null;
  };

  const [pemasukan, setPemasukan] = useState<PemasukanItem[]>([]);

  const supabase = createClient();

  useEffect(() => {
    const fetchPemasukan = async () => {
      const { data, error } = await supabase
        .from("pesanans")
        .select(
          `
      id,
      nama,
      template:template_id (
        id,
        price
      )
    `
        )
        .returns<PemasukanItem[]>();

      if (error) {
        console.error("Gagal fetch pemasukan:", error.message);
      } else if (data) {
        setPemasukan(data);
      }
    };

    fetchPemasukan();
  }, [supabase]);

  const totalPemasukan = pemasukan
    .filter((item) => item.template !== null)
    .reduce((total, item) => total + (item.template?.price || 0), 0);
  return (
    <div className="bg-blue-500/20 h-full backdrop-blur-lg rounded-xl p-4 shadow-lg flex justify-between">
      <div className="p-5">
        <h2 className="text-white font-semibold text-xl">Total Pemasukan</h2>
        <h2 className="text-white font-semibold text-xl">Template</h2>
        <div className="text-3xl font-bold text-white mt-2">
          Rp {totalPemasukan.toLocaleString("id-ID")},-
        </div>
      </div>
      <div className="justify-center items-center w-130 flex bg-white/50 rounded-2xl">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
