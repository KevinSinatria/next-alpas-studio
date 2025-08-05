import ChartPemasukan from "@/components/ChartPemasukan";
import ChartPenjualan from "@/components/ChartPenjualan";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alpas Studio",
  description:
    "Alpas Studio adalah sebuah studio yang menyediakan berbagai layanan digital.",
};

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-3 gap-6 m-5">
      <Link href="/admin/statistik">
        <ChartPenjualan />
      </Link>

      <Link
        href="/admin/statistik"
        className="bg-blue-500/20 backdrop-blur-lg rounded-xl p-4 shadow-lg col-span-2 flex "
      >
        <div className="w-70 p-5">
          <div className="w-full flex">
            <h2 className="text-white font-semibold text-xl">
              Total Pemasukan
            </h2>
          </div>
          <div className="text-3xl font-bold text-white mt-2">
            Rp 9.090.999,-
          </div>
        </div>

        <ChartPemasukan />
      </Link>

      <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 shadow-lg col-span-2">
        <h2 className="text-white font-semibold mb-4">Pesanan Terbaru</h2>

        <ScrollArea className="h-48 rounded-md">
          <table className="w-full text-left text-white ">
            <thead>
              <tr className="border-b border-white/20">
                <th className="pb-2">Order</th>
                <th className="pb-2">Nama</th>
                <th className="pb-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, i) => (
                <tr key={i} className="border-b border-white/10">
                  <td className="py-2">#1123</td>
                  <td>Wonyoung</td>
                  <td>herewony@gmail.com</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </div>

      <ScrollArea className="h-64 rounded-md">
        <div className="bg-white/50 backdrop-blur-lg rounded-xl p-4 shadow-lg">
          <h2 className="text-white font-semibold mb-4">Testimoni</h2>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white/30 rounded-lg p-3 mb-3">
              <p className="font-bold text-blue-600">Alminetta001</p>
              <div className="text-yellow-400 text-lg mb-1">★★★★★</div>
              <p className="text-gray-800 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DashboardPage;
