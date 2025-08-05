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

export default function ChartPenjualanStatistik() {
  return (
    <div className="bg-red-600/13 backdrop-blur rounded-xl p-4 shadow-lg relative h-70 flex justify-between ">
      <div className="mt-5 ml-5 flex flex-col space-y-3">
        <h1 className="text-2xl text-white">Top 3 template terlaris</h1>
        <div className="bg-[#5FD5EC]/40 w-160 h-15 flex">
          <div className="bg-[#5FD5EC] w-7 h-7  rounded-full m-2"></div>
          <div className="">
            <h1 className="text-xl text-white">Blue instagram content...</h1>
            <h1 className="text-sm text-white">290 downloads</h1>
          </div>
        </div>
        <div className="bg-[#2276FC]/40 w-130 h-15 flex">
          <div className="bg-[#2276FC] w-7 h-7  rounded-full m-2"></div>
          <div className="">
            <h1 className="text-xl text-white">Blue instagram content...</h1>
            <h1 className="text-sm text-white">290 downloads</h1>
          </div>
        </div>
        <div className="bg-[#EE6F7C]/40 w-90 h-15 flex">
          <div className="bg-[#EE6F7C] w-7 h-7  rounded-full m-2"></div>
          <div className="">
            <h1 className="text-xl text-white">Blue instagram content...</h1>
            <h1 className="text-sm text-white">290 downloads</h1>
          </div>
        </div>


      </div>
      <div className="">
        <div className="w-52 h-52 mx-auto mt-4 relative">
          <h1 className="w-60 justify-center text-xl text-white">Persentase Penjualan</h1>
          <div className="ml-10">
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

            </div>
          <div className="absolute inset-0 flex ml-10 flex-col items-center justify-center">
            <h1 className="text-white font-bold text-lg">36%</h1>
            <h1 className="text-white  text-sm">1.234/3.400</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
