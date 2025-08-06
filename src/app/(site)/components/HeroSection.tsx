"use client"

import TiltedCard from "@/components/ui/TiltedCard"
import { Star } from "lucide-react"
import Link from "next/link"

const HeroSection = () => {
   return (
      <div className="flex flex-col items-center justify-center lg:flex-row gap-8 mt-9 mb-11">
         
         <div className="lg:flex-5/10 flex items-center relative -top-20 lg:mb-0 w-full justify-center">
            {/* <TiltedCard scaleOnHover={1.1} showMobileWarning={false} imageSrc="/alpas-studio-hero-card.png" imageHeight={"100%"} altText="Alpas Studio" /> */}
            <TiltedCard
               imageSrc="/alpas-studio-hero-card.png"
               containerHeight="380px"
               containerWidth="480px"
               imageHeight="580px"
               imageWidth="480px"
               rotateAmplitude={12}
               scaleOnHover={1.2}
               showMobileWarning={false}
               showTooltip={true}
               displayOverlayContent={true}
            />
            {/* <Image src="/alpas-studio-hero-card.png" alt="Alpas Studio" width={500} height={500} className="block lg:hidden object-cover" /> */}
         </div>

         <div className="flex lg:flex-5/10 flex-col gap-4 mr-20 text-xl">
            <div className="flex flex-col border border-gray-300 shadow-xl p-8 rounded-2xl gap-2 bg-slate-900/30 backdrop-blur-lg text-white w-full ">
               <h1 className="font-semibold">Apa itu Kustom Desain?</h1>
               <p>Butuh desain yang sesuai visi Anda? Di <span className="font-semibold">ALPAS Studio</span>, Anda bisa request desain dari nol untuk brand, produk, atau kampanye digital. Konsultasi langsung dengan desainer, hasil auto maksimal!</p>
               <Link href={"/kustom"} className="w-full justify-center flex mt-4 rounded-lg py-1 bg-gray-800/50 hover:bg-gray-800 transition-all">Mulai Kustom Desain</Link>
            </div>
            <div className="flex flex-col border border-gray-300 shadow-xl p-8 rounded-2xl gap-4 bg-slate-900/30 backdrop-blur-lg text-white w-full">
               <h1 className="font-semibold">Kenapa harus ALPAS Studio?</h1>
               <ul>
                  <li className="flex gap-2"><Star className="text-yellow-400 fill-yellow-400" />Kustom Desain Eksklusif Tanpa Template</li>
                  <li className="flex gap-2"><Star className="text-yellow-400 fill-yellow-400" />Konsultasi Langsung dengan Desainer</li>
                  <li className="flex gap-2"><Star className="text-yellow-400 fill-yellow-400" />Kualitas Profesional dengan Harga Terjangkau</li>
               </ul>
               <p>Kami adalah solusi desain berkualitas tinggi yang tetap ramah bagi UMKM dan startup.</p>
            </div>
         </div>
      </div>
   )
}

export default HeroSection