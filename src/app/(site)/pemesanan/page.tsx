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
    <section className="px-10 sm:px-8 sm:py-20 py-10 lg:px-20 w-full">
      <header className="bg-linear-to-b/oklch from-slate-700/40 to-gray-400/80 p-6 sm:p-10 rounded-3xl backdrop-blur mt-10 max-w-4xl mx-auto">
        <div className="w-full text-center md:text-left">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link href={"/"} className="text-white text-3xl sm:text-4xl">
              <ArrowLeft />
            </Link>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white uppercase">
              FORM PEMESANAN
            </h2>
            <div className="w-8" /> 
          </div>

          <div className="space-y-5">
            {showAlert && (
              <Alert>
                <CheckCircle2Icon />
                <AlertTitle>Success! Your changes have been saved</AlertTitle>
                <AlertDescription>
                  This is an alert with icon, title and description.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label className="text-base sm:text-lg text-white">Nama</label>
              <Input
                required
                className="bg-white/80 text-base sm:text-lg  font-semibold h-12 text-gray-800"
                type="text"
                placeholder="Masukkan nama Anda di sini"
              />
            </div>

            <div className="space-y-2">
              <label className="text-base sm:text-lg text-white">Email / No HP</label>
              <Input
                required
                className="bg-white/80 text-base sm:text-lg font-semibold h-12 text-gray-800"
                type="text"
                placeholder="Masukkan email atau nomor HP Anda"
              />
            </div>

            <div className="space-y-2">
              <label className="text-base sm:text-lg text-white">Pesan</label>
              <Textarea
                required
                rows={5}
                className="bg-white/80 text-base sm:text-lg font-semibold text-gray-800"
                placeholder="Masukkan pesan kustom desain (Misal: Buatkan desain feed Instagram dengan style modern minimalist dominan warna biru dan font Monsterrat)"
              />
            </div>

            <div className="space-y-2">
              <label className="text-base sm:text-lg text-white">Link Asset</label>
              <Textarea
                required
                rows={4}
                className="bg-white/80 text-base sm:text-lg font-semibold text-gray-800"
                placeholder="Masukkan link foto atau logo (Disarankan Google Drive)"
              />
            </div>

            <Button
              className="w-full sm:w-auto"
              onClick={() => setShowAlert(true)}
            >
              Tampilkan Alert
            </Button>
          </div>
        </div>
      </header>
    </section>
  );
}
