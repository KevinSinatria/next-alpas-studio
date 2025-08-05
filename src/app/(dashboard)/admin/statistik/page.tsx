import ChartPemasukan from "@/components/ChartPemasukan";
import ChartPenjualanStatistik from "@/components/ChartPenjualanStatistik";
import Link from "next/link";

export default function StatistikPage() {
  return (
    <div className="m-5 w-full">
      <Link href="/admin/statistik" className="mb-2">
        <ChartPenjualanStatistik />
      </Link>

      <Link
        href="/admin/statistik"
        className="bg-blue-500/20 backdrop-blur-lg rounded-xl p-4 shadow-lg col-span-2 flex mt-2"
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
    </div>
  );
}
