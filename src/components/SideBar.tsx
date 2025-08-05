"use client";

import { Home, BarChart2, ClipboardList, MessageSquare, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// util kecil untuk gabung class
function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// helper: cek aktif (mendukung exact dan prefix)
function isActive(
  pathname: string,
  href: string,
  { exact = false }: { exact?: boolean } = {}
): boolean {
  if (exact) return pathname === href;
  // aktif untuk route induk & turunannya
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Sidebar(){
  const pathname = usePathname();

  return (
    <aside className="w-64 min-w-64 max-w-64 flex-shrink-0 h-160 border-r-2 text-white p-4 flex flex-col">
      <nav className="flex flex-col gap-3">
        <Link
          href="/admin"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-full transition",
            isActive(pathname ?? "", "/admin", { exact: true })
             ? "bg-white/20 ring-1 ring-white/30"
              : "hover:bg-white/10"
          )}
        >
          <Home size={20} /> Dashboard
        </Link>

        <Link
          href="/admin/statistik"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg transition",
            isActive(pathname ?? "", "/admin/statistik")
              ? "bg-white/20 ring-1 ring-white/30"
              : "hover:bg-white/10"
          )}
        >
          <BarChart2 size={20} /> Statistik
        </Link>

        <Link
          href="/admin/pemesanan"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg transition",
            isActive(pathname ?? "", "/admin/pemesanan")
              ? "bg-white/20 ring-1 ring-white/30"
              : "hover:bg-white/10"
          )}
        >
          <ClipboardList size={20} /> Pemesanan
        </Link>

        <Link
          href="/admin/testimoni"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg transition",
            isActive(pathname ?? "", "/admin/testimoni")
              ? "bg-white/20 ring-1 ring-white/30"
              : "hover:bg-white/10"
          )}
        >
          <MessageSquare size={20} /> Testimoni
        </Link>
      </nav>

      <div className="mt-auto">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/20 transition"
        >
          <LogOut size={20} /> Logout
        </Link>
      </div>
    </aside>
  );
}
