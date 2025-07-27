import Image from "next/image"
import { de } from "zod/locales"

const OurTemplateSection = () => {
   return (
      <section className="px-8 py-12 lg:px-20 w-full">
         <div className="w-full bg-linear-to-b/oklch from-slate-700/40 to-gray-400/70 p-8 rounded-3xl backdrop-blur flex gap-8 items-center justify-center">
            <header className="w-full">
               <h2 className="text-3xl text-white">
                  <span className="font-semibold uppercase">TEMPLATE KAMI </span>-- Siap Pakai untuk Kebutuhan Visual Anda!
               </h2>
            </header>
            <main className="flex gap-8 w-full">
               <div className="flex flex-col gap-4 p-2">
                  <Image />
               </div>
            </main>
            <footer></footer>
         </div>
      </section>
   )
}

export default OurTemplateSection