import ChartPemasukan from "@/components/ChartPemasukan";
import ChartPenjualanStatistik from "@/components/ChartPenjualanStatistik";
import Link from "next/link";

export default function StatistikPage() {
  return (
    <div className="m-5 w-full ">
      <h1 className="text-2xl font-bold text-white">Statistik</h1>
      <div className="flex flex-col gap-6">
  <Link href="/admin/statistik">
    <ChartPenjualanStatistik />
  </Link>

  <Link href="/admin/statistik">
    <ChartPemasukan />
  </Link>
</div>

    </div>
  );
}
