"use client";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle2Icon } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

export default function PemesananTemplatePage() {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <section className="px-4 sm:px-8 py-8 lg:px-20 w-full">
      <header className="bg-linear-to-b/oklch from-slate-700/40 to-gray-400/80 p-10 rounded-3xl backdrop-blur gap-6 items-center justify-center mt-30 mx-120">
        <div className="w-full text-center md:text-left px-2">
          <h2 className="text-white mt-3 sm:mt-5 flex flex-col gap-2">
            <span className="text-5xl sm:text-3xl md:text-4xl font-semibold items-center justify-between flex uppercase">
              <Link href={"/"} className="text-5xl font-semibold">
                <ArrowLeft />
              </Link>
              <div className="text-2xl font-semibold">FORM PEMESANAN</div>
              <div className="text-4xl font-semibold"></div>
            </span>
            <div className="text-sm sm:text-lg md:text-2xl max-w-2xl mx-auto md:mx-0 space-y-5 leading-snug">
              {showAlert && (
                <Alert>
                  <CheckCircle2Icon />
                  <AlertTitle>Success! Your changes have been saved</AlertTitle>
                  <AlertDescription>
                    This is an alert with icon, title and description.
                  </AlertDescription>
                </Alert>
              )}

              <label className="text-xl mb-4">Nama</label>
              <Input
                required
                className="bg-white/80 text-2xl font-semibold h-13 text-gray-800"
                type="text"
                placeholder="Masukan Nama Mu Disini"
              />

              <label className="text-xl mb-4">Email/No Hp</label>
              <Input
                required
                className="bg-white/80 text-2xl font-semibold h-13 text-gray-800"
                type="text"
                placeholder="Masukan Nama Mu Disini"
              />

              <label className="text-xl mb-4">Pesan</label>
              <Textarea
                required
                className="bg-white/80 text-2xl font-semibold h-13 text-gray-800"
                placeholder="Masukkan pesan kustom dari desain (Misalkan: Buatkan aku desain feed instagram 
dengan style modern minimalist dominan warna biru dengan font khusus Monsterrat)"
              />

              <label className="text-xl mb-4">Link Asset</label>
              <Textarea
                required
                className="bg-white/80 text-2xl font-semibold h-13 text-gray-800"
                placeholder="Masukkan link foto maupun logo yang perlu dimasukkan kedalam desain (Disarankan berbentuk tautan google drive)"
              />

              <Button onClick={() => setShowAlert(true)}>
                Tampilkan Alert
              </Button>
            </div>
          </h2>
        </div>
      </header>
      <main className="w-full m-20"></main>
    </section>
  );
}
