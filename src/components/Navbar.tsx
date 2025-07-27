"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // 🔑 ambil path sekarang

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Kustom", href: "/about" },
    { name: "Templat", href: "/templat" },
    { name: "Testimoni", href: "/testimoni" },
    { name: "Tentang Kami", href: "/tentang-kami" },
  ];
  return (
    <nav
      className={`st top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "shadow-lg backdrop-blur bg-white/10 m-15 rounded-xl border border-gray-400 dark:border-gray-700"
          : "bg-white/10 dark:bg-gray-800/60 backdrop-blur border border-gray-400 dark:border-gray-700"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-3">
        <Image
          src="/alpas_icon_hd.svg"
          alt="Logo"
          width={40}
          height={40}
          className="h-10 w-auto"
        />

        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-3 py-2 transition-colors ${
                pathname === item.href
                  ? "text-white bg-blue-400 rounded-2xl font-semibold"
                  : "text-white dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400"
              }`}
            >
              <div className="[text-shadow:_0_1px_2px]">

              {item.name}
              </div>
            </Link>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="relative w-10 h-8 flex flex-col justify-between items-center md:hidden"
        >
          <span
            className={`block h-1 w-full bg-black dark:bg-white rounded transition-all duration-300 ${
              open ? "rotate-45 translate-y-[10px]" : ""
            }`}
          />
          <span
            className={`block h-1 w-full bg-black dark:bg-white rounded transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-1 w-full bg-black dark:bg-white rounded transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-[18px]" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`flex flex-col md:hidden bg-white dark:bg-gray-800 overflow-hidden transition-all duration-300 ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`py-3 px-6 border-b border-gray-200 dark:border-gray-700 transition-colors ${
              pathname === item.href
                ? "text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-gray-700"
                : "text-gray-900 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
