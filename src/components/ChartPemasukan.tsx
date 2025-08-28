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

// Register Chart.js components once at the top
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Create Supabase client once
const supabase = createClient();

type PemasukanData = {
  id: number;
  nama: string;
  created_at: string;
  template: {
    id: number;
    price: number;
  } | null;
};

export default function ChartPemasukan() {
  const [totalPemasukan, setTotalPemasukan] = useState<number>(0);
  const [monthlyData, setMonthlyData] = useState<number[]>(new Array(12).fill(0));

  useEffect(() => {
    const fetchData = async () => {
      // Fetch all necessary data in one go
      const { data, error } = await supabase
        .from("pesanans")
        .select(`id, nama, created_at, template:template_id(id, price)`)
        .returns<PemasukanData[]>();

      if (error) {
        console.error("Error fetching data:", error.message);
        return;
      }

      // Initialize totals
      let grandTotal = 0;
      const totalPerBulan = new Array(12).fill(0);

      // Process the fetched data
      if (data) {
        data.forEach((item) => {
          const harga = item.template?.price || 0;
          
          if (harga > 0) {
            grandTotal += harga;
            
            // Check for valid created_at date
            if (item.created_at) {
              const bulan = new Date(item.created_at).getMonth();
              totalPerBulan[bulan] += harga;
            }
          }
        });
      }

      setTotalPemasukan(grandTotal);
      setMonthlyData(totalPerBulan);
    };

    fetchData();
  }, []); // Correct dependency array: empty, as we only need to fetch once on mount

  const bulanLabels = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", 
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
  ];

  const chartData = {
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
    maintainAspectRatio: false, // Prevents chart from auto-sizing based on canvas, allowing manual control
  };

  return (
    <div className="bg-blue-500/20 h-full backdrop-blur-lg rounded-xl p-4 shadow-lg flex flex-col justify-between lg:flex-row">
      {/* Title section */}
      <div className="p-5 flex flex-col justify-center">
        <h2 className="text-white font-semibold text-xl">Total Pemasukan</h2>
        <h2 className="text-white font-semibold text-xl">Template</h2>
        <div className="text-3xl font-bold text-white mt-2">
          Rp {totalPemasukan.toLocaleString("id-ID")},-
        </div>
      </div>
      
      {/* Chart container */}
      <div className="justify-center items-center w-full lg:w-1/2 flex bg-white/50 rounded-2xl p-4">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}