import Image from "next/image";
import Link from "next/link";

export default function Footer() {
   const navItems = [
      { name: "Kustom", href: "/custom" },
      { name: "Templat", href: "/templates" },
      { name: "Testimoni", href: "/testimonials" },
      { name: "Riwayat Pemesanan", href: "/history" },
      { name: "Tentang Kami", href: "/about" },
   ];

   return (
      <footer className="w-full flex flex-col p-8 divide-y divide-gray-200 bg-slate-950">
         <div className="flex flex-wrap gap-8 w-full py-4 items-center justify-between">
            <Image src="/alpas_icon_hd.svg" alt="alpas-logo" width={100} height={100} />
            <nav>
               <ul className="flex flex-wrap md:justify-between gap-8">
                  {navItems.map((item, idx) => (
                     <li key={idx}>
                        <Link className="text-white whitespace-nowrap hover:underline" href={item.href}>{item.name}</Link>
                     </li>
                  ))}
               </ul>
            </nav>
            <Link href="mailto:alpastudio@gmail.com" className="text-gray-400 hover:underline">alpastudio@gmail.com</Link>
         </div>
         <div className="flex flex-col-reverse gap-8 md:flex-row text-white w-full py-4 items-center justify-between">
            <h3>©2025 ALPAStudio. All Right Reserved.</h3>
            <div className="flex divide-x divide-gray-400">
               <Link className="px-4 hover:underline" href="#">Privacy Policy</Link>
               <Link className="px-4 hover:underline" href="#">Terms & Condition</Link>
            </div>
         </div>
      </footer>
   )
}