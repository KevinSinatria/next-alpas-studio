"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartPemasukan() {
  const data = {
    labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
    datasets: [
      {
        label: "Penjualan (Juta)",
        data: [12, 19, 8, 15, 22, 18],
        backgroundColor: [
          "#56E1E9",
          "#2196F3",
          "#5B58EB",
          "#BB63FF",
          "#9C27B0",
          "#160078 "
        ],
        borderRadius: 10
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="w-120 p-5 bg-white/50 rounded-2xl">
      <Bar data={data} options={options} />
    </div>
  );
}
