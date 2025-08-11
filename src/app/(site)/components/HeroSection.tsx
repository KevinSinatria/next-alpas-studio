"use client";

import TiltedCard from "@/components/ui/TiltedCard";
import { Star } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8 mt-9 mb-11 px-4">
      {/* Bagian Gambar */}
      <div className="flex justify-center flex-shrink-0 min-w-[280px] sm:min-w-[320px] lg:min-w-[400px]">
        <TiltedCard
          imageSrc="/alpas-studio-hero-card.png"
          containerHeight="380px"
          containerWidth="100%"
          imageHeight="580px"
          imageWidth="480px"
          rotateAmplitude={12}
          scaleOnHover={1.2}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
        />
      </div>

      {/* Bagian Teks */}
      <div className="flex flex-col gap-4 min-w-[280px] sm:min-w-[320px] lg:max-w-[500px] text-base sm:text-lg md:text-xl">
        {/* Card Kustom Desain */}
        <div className="flex flex-col border border-gray-300 shadow-xl p-6 sm:p-8 rounded-2xl gap-2 bg-slate-900/30 backdrop-blur-lg text-white">
          <h1 className="font-semibold text-lg sm:text-xl md:text-2xl">
            Apa itu Kustom Desain?
          </h1>
          <p className="leading-relaxed">
            Butuh desain yang sesuai visi Anda? Di{" "}
            <span className="font-semibold">ALPAS Studio</span>, Anda bisa
            request desain dari nol untuk brand, produk, atau kampanye digital.
            Konsultasi langsung dengan desainer, hasil auto maksimal!
          </p>
          <Link
            href={"/kustom"}
            className="w-full justify-center flex mt-4 rounded-lg py-2 bg-gray-800/50 hover:bg-gray-800 transition-all text-sm sm:text-base"
          >
            Mulai Kustom Desain
          </Link>
        </div>

        {/* Card Kenapa Harus ALPAS */}
        <div className="flex flex-col border border-gray-300 shadow-xl p-6 sm:p-8 rounded-2xl gap-4 bg-slate-900/30 backdrop-blur-lg text-white">
          <h1 className="font-semibold text-lg sm:text-xl md:text-2xl">
            Kenapa harus ALPAS Studio?
          </h1>
          <ul className="space-y-2">
            <li className="flex gap-2 items-center">
              <Star className="text-yellow-400 fill-yellow-400 flex-shrink-0" />
              Kustom Desain Eksklusif Tanpa Template
            </li>
            <li className="flex gap-2 items-center">
              <Star className="text-yellow-400 fill-yellow-400 flex-shrink-0" />
              Konsultasi Langsung dengan Desainer
            </li>
            <li className="flex gap-2 items-center">
              <Star className="text-yellow-400 fill-yellow-400 flex-shrink-0" />
              Kualitas Profesional dengan Harga Terjangkau
            </li>
          </ul>
          <p className="leading-relaxed">
            Kami adalah solusi desain berkualitas tinggi yang tetap ramah bagi
            UMKM dan startup.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
   