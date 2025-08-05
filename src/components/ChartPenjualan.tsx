"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  datasets: [
    {
      label: "Total Penjualan",
      data: [15, 20, 10, 32, 10], 
      backgroundColor: [
        "#fffb97", 
        "#fe7f42", 
        "#b32c1a", 
        "#7a4b47", 
        "#2a1617",  
      ],
      borderWidth: 0,
      cutout: "70%", 
    },
  ],
};

export default function ChartPenjualan() {
  return (
    <div className="bg-red-600/13 h-full backdrop-blur rounded-xl p-4 shadow-lg relative">
      <div className="flex w-full justify-between">
        <h2 className="text-white font-bold text-2xl">Total Penjualan</h2>
      </div>

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
