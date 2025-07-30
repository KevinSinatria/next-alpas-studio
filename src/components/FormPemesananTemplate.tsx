"use client";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle2Icon } from "lucide-react";
import Link from "next/link";


interface PemesananTemplateProps {
  template: {
    id: number;
    image: string;
    alt: string;
    title: string;
    dekskription: string;
    price: string;
    gambar: string[];
  } | null;
  onBack?: () => void;
}

export default function PemesananTemplate({ template, onBack }: PemesananTemplateProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [nama, setNama] = useState("");
  const [kontak, setKontak] = useState("");


  return (
    <section className="px-4 sm:px-8 py-8 lg:px-20 w-full">
      <header className="bg-linear-to-b/oklch from-slate-700/40 to-gray-400/80 p-10 rounded-3xl backdrop-blur gap-6 items-center justify-center mt-30 mx-120">
        <div className="w-full text-center md:text-left px-2">
          <h2 className="text-white mt-3 sm:mt-5 flex flex-col gap-2">
            <span className="text-5xl sm:text-3xl md:text-4xl font-semibold items-center justify-between flex uppercase">
              <Link
                href={"/template"}
                className="text-5xl font-semibold"
                onClick={e => {
                  if (onBack) {
                    e.preventDefault();
                    onBack();
                  }
                }}
              >
                <ArrowLeft />
              </Link>
              <div className="text-3xl font-semibold">FORM PEMESANAN</div>
              <div className="text-4xl font-semibold"></div>
            </span>
            <form className="text-sm sm:text-lg md:text-2xl max-w-2xl mx-auto md:mx-0 space-y-5 leading-snug" >
              {showAlert && (
                <Alert>
                  <CheckCircle2Icon />
                  <AlertTitle>Success! Data berhasil dikirim</AlertTitle>
                  <AlertDescription>
                    Data form telah dikirim ke email admin.
                  </AlertDescription>
                </Alert>
              )}

              <label className="text-xl mb-4">Nama</label>
              <Input
                required
                className="bg-white/80 text-2xl font-semibold h-13"
                type="text"
                placeholder="Masukan Nama Mu Disini"
                value={nama}
                onChange={e => setNama(e.target.value)}
              />

              <label className="text-xl mb-4">Email/No Hp</label>
              <Input
                required
                className="bg-white/80 text-2xl font-semibold h-13"
                type="text"
                placeholder="Masukan Email atau No HP"
                value={kontak}
                onChange={e => setKontak(e.target.value)}
              />

              <label className="text-xl mb-4">Template Yang dipilih</label>
              <h1 className="bg-blue-300/65 text-lg flex items-center text-black/70 px-4 font-semibold h-13 rounded-lg ">
                {template ? template.title : "-"}
              </h1>

              <Button type="submit"  onClick={() => setShowAlert(!showAlert)}>
                Pesan sekarang
              </Button>
            </form>
          </h2>
        </div>
      </header>
      <main className="w-full m-20"></main>
    </section>
  );
}