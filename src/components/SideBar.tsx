"use client";

import { Home, BarChart2, ClipboardList, MessageSquare, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

// util kecil untuk gabung class
function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// helper: cek aktif
function isActive(
  pathname: string,
  href: string,
  { exact = false }: { exact?: boolean } = {}
): boolean {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

function handleLogout() {
  document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "/";
}

export default function Sidebar() {
  const pathname = usePathname();

  // daftar menu
  const menuItems = [
    { href: "/admin", icon: <Home size={20} />, label: "Dashboard", exact: true },
    { href: "/admin/statistik", icon: <BarChart2 size={20} />, label: "Statistik" },
    { href: "/admin/pemesanan", icon: <ClipboardList size={20} />, label: "Pemesanan" },
    { href: "/admin/testimoni", icon: <MessageSquare size={20} />, label: "Testimoni" },
  ];

  return (
    <aside className="w-64 min-w-64 max-w-64 flex-shrink-0 h-160 border-r-2 text-white p-4 flex flex-col">
      <nav className="flex flex-col gap-3">
        {menuItems.map((item, i) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition",
                isActive(pathname ?? "", item.href, { exact: item.exact })
                  ? "bg-white/20 ring-1 ring-white/30"
                  : "hover:bg-white/10"
              )}
            >
              {item.icon} {item.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      <div className="mt-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/20 transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </motion.div>
      </div>
    </aside>
  );
}
