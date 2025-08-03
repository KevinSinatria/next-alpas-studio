"use client";
import { Home, BarChart2, ClipboardList, MessageSquare, LogOut } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-160 border-r-2 text-white p-4 flex flex-col">

      <nav className="flex flex-col gap-3">
        <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 bg-white/40 rounded-full">
          <Home size={20}/> Dashboard
        </Link>
        <button className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded-lg">
          <BarChart2 size={20}/> Statistik
        </button>
        <button className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded-lg">
          <ClipboardList size={20}/> Pemesanan
        </button>
        <button className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded-lg">
          <MessageSquare size={20}/> Testimoni
        </button>
      </nav>

      <div className="mt-auto">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 hover:bg-red-500/20 rounded-lg text-red-300">
          <LogOut size={20}/> Logout
        </Link>
      </div>
    </aside>
  );
}
