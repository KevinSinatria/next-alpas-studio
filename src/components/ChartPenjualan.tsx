"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  datasets: [
    {
      label: "Total Penjualan",
      data: [15, 20, 10, 7, 10], 
      backgroundColor: [
        "#f87171", 
        "#60a5fa", 
        "#facc15", 
        "#34d399", 
        "#a78bfa", 
      ],
      borderWidth: 0,
      cutout: "70%", 
    },
  ],
};

export default function ChartPenjualan() {
  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 shadow-lg relative">
      <h2 className="text-white font-bold text-2xl">Total Penjualan</h2>

      <div className="flex">
        <div className="mt-35">
          <div className="text-3xl font-bold text-white ">1.234</div>
          <p className="text-xl text-gray-200">Downloads</p>
        </div>
        <div className="w-42 h-42 mx-auto mt-4 relative">
          <Doughnut
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              events: [
                "mousemove",
                "mouseout",
                "click",
                "touchstart",
                "touchmove",
              ],
              plugins: {
                tooltip: { enabled: true },
              },
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-lg">62%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
