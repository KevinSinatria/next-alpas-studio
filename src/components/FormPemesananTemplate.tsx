"use client";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle2Icon, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

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

export default function PemesananTemplate({
  template,
  onBack,
}: PemesananTemplateProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [kontak, setKontak] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama || !email || !kontak) {
      alert("Harap isi semua field!");
      return;
    }

    setIsLoading(true); // Mulai loading

    try {
      const supabase = createClient();

      const { error } = await supabase.from("pesanans").insert([
        {
          nama,
          email,
          nohp: kontak,
          template_id: template?.id ?? null,
        },
      ]);

      if (error) {
        console.error("Gagal menyimpan ke Supabase:", error);
        alert("Gagal menyimpan data.");
        return;
      }

      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          email,
          noHp: kontak,
          pesan: `Template yang dipilih: ${
            template?.title ?? "Tidak ada template"
          }`,
          linkAsset: "-",
        }),
      });

      const result = await res.json();

      if (!result.success) {
        alert("Gagal mengirim email.");
        return;
      }

      setNama("");
      setEmail("");
      setKontak("");
      toast.success("Pesanan berhasil dikirim");
    } catch (err) {
      console.error("Terjadi kesalahan:", err);
      alert("Terjadi kesalahan saat menyimpan atau mengirim email.");
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };

  return (
    <section className="px-4 sm:px-8 py-25 lg:px-20 w-full">
      <header className="bg-linear-to-b/oklch from-slate-700/40 to-gray-400/80 p-6 sm:p-10 rounded-3xl backdrop-blur max-w-3xl mx-auto">
        <div className="w-full">
          {/* Header Title */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href={"/template"}
              className="text-white text-3xl"
              onClick={(e) => {
                if (onBack) {
                  e.preventDefault();
                  onBack();
                }
              }}
            >
              <ArrowLeft />
            </Link>
            <h2 className="text-white text-xl sm:text-2xl font-semibold uppercase">
              Form Pemesanan
            </h2>
            <div className="w-8" /> {/* spacer */}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="text-base sm:text-lg md:text-xl space-y-5"
          >
            {showAlert && (
              <Alert>
                <CheckCircle2Icon />
                <AlertTitle>Success! Data berhasil dikirim</AlertTitle>
                <AlertDescription>
                  Data form telah dikirim ke email admin.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label className="text-white">Nama</label>
              <Input
                required
                className="bg-white/80 text-base sm:text-lg md:text-xl font-semibold h-12 text-gray-800"
                type="text"
                placeholder="Masukkan Nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-white">Email</label>
              <Input
                required
                className="bg-white/80 text-base sm:text-lg md:text-xl font-semibold h-12 text-gray-800"
                type="email"
                placeholder="Masukkan Email atau No HP"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-white"> No HP</label>
              <Input
                required
                className="bg-white/80 text-base sm:text-lg md:text-xl font-semibold h-12 text-gray-800"
                type="number"
                placeholder="Masukkan Email atau No HP"
                value={kontak}
                onChange={(e) => setKontak(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-white">Template yang dipilih</label>
              <div className="bg-blue-300/65 text-sm sm:text-base md:text-lg flex items-center text-black/70 px-4 font-semibold h-12 rounded-lg">
                {template ? template.title : "-"}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full sm:w-auto flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? "Mengirim..." : "Pesan Sekarang"}
            </Button>
          </form>
        </div>
      </header>
    </section>
  );
}
