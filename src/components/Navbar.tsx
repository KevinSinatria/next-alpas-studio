"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white dark:bg-gray-800 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-3">
        <Image
          src="/alpasLogo.png"
          alt="Logo"
          width={40}
          height={40}
          className="h-10 w-auto"
        />

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-900 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 px-3"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Hamburger Button */}
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

      {/* Mobile Menu */}
      <div
        className={`flex flex-col md:hidden bg-white dark:bg-gray-800 overflow-hidden transition-all duration-300 ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-gray-900 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 py-3 px-6 border-b border-gray-200 dark:border-gray-700"
            onClick={() => setOpen(false)}
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
