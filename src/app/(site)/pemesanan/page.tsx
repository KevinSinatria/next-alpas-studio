"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function PemesananTemplatePage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [pesan, setPesan] = useState("");
  const [linkAsset, setLinkAsset] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nama || !email || !noHp || !pesan || !linkAsset) {
      alert("Harap isi semua field!");
      return;
    }

    setIsLoading(true); // mulai loading

    try {
      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, email, noHp, pesan, linkAsset }),
      });

      const result = await res.json();

      if (!result.success) {
        alert("Gagal mengirim pesan.");
        return;
      }

      const supabase = createClient();
      const { error } = await supabase
        .from("pesanans")
        .insert([{ nama, email, nohp: noHp, pesan, link: linkAsset }]);

      if (error) {
        console.error("Error insert ke Supabase:", error);
        alert("Gagal menyimpan ke database.");
        return;
      }

      setNama("");
      setEmail("");
      setNoHp("");
      setPesan("");
      setLinkAsset("");

      toast.success("Pesanan berhasil dikirim!");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    } finally {
      setIsLoading(false); // selesai loading
    }
  };

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
            <div className="space-y-2">
              <label className="text-base sm:text-lg text-white">Nama</label>
              <Input
                required
                className="bg-white/80 text-base sm:text-lg  font-semibold h-12 text-gray-800"
                type="text"
                placeholder="Masukkan nama Anda di sini"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-base sm:text-lg text-white">Email </label>
              <Input
                required
                className="bg-white/80 text-base sm:text-lg font-semibold h-12 text-gray-800"
                type="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-base sm:text-lg text-white">No HP</label>
              <Input
                required
                className="bg-white/80 text-base sm:text-lg font-semibold h-12 text-gray-800"
                type="number"
                placeholder="Masukkan  nomor HP Anda"
                value={noHp}
                onChange={(e) => setNoHp(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-base sm:text-lg text-white">Pesan</label>
              <Textarea
                required
                rows={5}
                className="bg-white/80 text-base sm:text-lg font-semibold text-gray-800"
                placeholder="Masukkan pesan kustom desain (Misal: Buatkan desain feed Instagram dengan style modern minimalist dominan warna biru dan font Monsterrat)"
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-base sm:text-lg text-white">
                Link Asset
              </label>
              <Textarea
                required
                rows={4}
                className="bg-white/80 text-base sm:text-lg font-semibold text-gray-800"
                placeholder="Masukkan link foto atau logo (Disarankan Google Drive)"
                value={linkAsset}
                onChange={(e) => setLinkAsset(e.target.value)}
              />
            </div>

            <Button
              className="w-full sm:w-auto flex items-center gap-2"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
              {isLoading ? "Mengirim..." : "Kirim Pesan"}
            </Button>
          </div>
        </div>
      </header>
    </section>
  );
}
