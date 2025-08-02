"use client";
import { Home, BarChart2, ClipboardList, MessageSquare, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r-2 mr-8 text-white p-4 flex flex-col">

      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 bg-white rounded-full"></div>
        <span className="font-bold text-lg">ALPAS Studio</span>
      </div>


      <nav className="flex flex-col gap-3">
        <button className="flex items-center gap-3 px-3 py-2 bg-white/20 rounded-lg">
          <Home size={20}/> Dashboard
        </button>
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
        <button className="flex items-center gap-3 px-3 py-2 hover:bg-red-500/20 rounded-lg text-red-300">
          <LogOut size={20}/> Logout
        </button>
      </div>
    </aside>
  );
}
