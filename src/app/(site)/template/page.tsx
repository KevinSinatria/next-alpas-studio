import { ArrowRight } from "lucide-react";
import Image from "next/image";

const teamplates = [
  {
    id: 1,
    image: "/ourtemplates/template1.png",
    alt: "template1",
    title: "Blue instagram content template",
    price: "31.700,-",
  },
  {
    id: 2,
    image: "/ourtemplates/template2.png",
    alt: "template2",
    title: "Blue instagram content template",
    price: "31.700,-",
  },
  {
    id: 3,
    image: "/ourtemplates/template3.png",
    alt: "template3",
    title: "Blue instagram content template",
    price: "31.700,-",
  },
  {
    id: 2,
    image: "/ourtemplates/template2.png",
    alt: "template2",
    title: "Blue instagram content template",
    price: "31.700,-",
  },
  {
    id: 3,
    image: "/ourtemplates/template3.png",
    alt: "template3",
    title: "Blue instagram content template",
    price: "31.700,-",
  },
  {
    id: 2,
    image: "/ourtemplates/template2.png",
    alt: "template2",
    title: "Blue instagram content template",
    price: "31.700,-",
  },
  {
    id: 3,
    image: "/ourtemplates/template3.png",
    alt: "template3",
    title: "Blue instagram content template",
    price: "31.700,-",
  },
];

export default function TemplatePage() {
  return (
    <section className="px-8 py-12 lg:px-20 w-full">
      <div className="w-full flex flex-col bg-linear-to-b/oklch from-slate-700/40 to-gray-400/70 p-8 rounded-3xl backdrop-blur gap-8 items-center justify-center mt-20">
        <header className="w-full ml-30">
          <h2 className=" text-white mt-5 flex flex-col">
            <span className="text-4xl font-semibold uppercase">TEMPLATE KAMI</span>
            <span className="text-2xl">Jelajahi Ratusan Template Siap Pakai untuk Bisnis dan Personal Branding Anda!</span>
          </h2>
        </header>
        <main className="flex gap-8 flex-wrap w-full">
          <div className="grid grid-cols-3 justify-center items-center gap-15 w-full mx-20">
            {teamplates.map((template, i) => (
              <div
                key={i}
                className="flex flex-col flex-1 w-full gap-2 rounded-2xl shadow-2xl bg-white/80 p-4"
              >
                <Image
                  src={template.image}
                  alt={template.alt}
                  width={500}
                  height={500}
                  className="object-cover w-full rounded-2xl"
                />
                <h2 className="text-black font-semibold text-lg">
                  {template.title}
                </h2>
                <div className="flex gap-2 items-start">
                  <span className="text-xs bg-green-200 px-1 rounded-lg">
                    Rp
                  </span>{" "}
                  <span className="font-semibold text-2xl">
                    {template.price}
                  </span>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 w-full rounded-lg shadow-lg hover:-translate-y-1 hover:shadow-2xl cursor-pointer active:translate-y-0 transition-all">
                  <span className="drop-shadow-lg font-semibold">
                    Order Now
                  </span>
                </button>
              </div>
            ))}
          </div>
        </main>
        <footer className="w-full flex justify-center">
          <button className="flex items-center gap-4 bg-slate-800 cursor-pointer hover:bg-slate-700 active:bg-slate-900 transition-all rounded-2xl text-white px-4 py-2">
            Lihat Selengkapnya{" "}
            <span>
              <ArrowRight size={16} />
            </span>
          </button>
        </footer>
      </div>
    </section>
  );
}
