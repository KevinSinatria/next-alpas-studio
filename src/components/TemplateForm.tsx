"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "./ui/scroll-area";

const supabase = createClient();
type Template = {
  id?: number; // optional karena belum ada saat insert
  title: string;
  price: number;
  deks?: string;
  image_url: string;
  image_url_2?: string;
  image_url_3?: string;
};

type Props = {
  template?: Template;
  onSuccess: () => void;
  onClose: () => void;
};

export default function TemplateForm({ template, onSuccess, onClose }: Props) {
  const isEdit = !!template;

  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState({
    title: template?.title || "",
    price: template?.price || 0,
    deks: template?.deks || "",
    image_url: template?.image_url || "",
    image_url_2: template?.image_url_2 || "",
    image_url_3: template?.image_url_3 || "",
  });

  const supabaseUrl =
    "https://bmgeuqxyshumafaxsauc.supabase.co/storage/v1/object/public/";

  const uploadImage = async (
  file: File,
  field: "image_url" | "image_url_2" | "image_url_3"
) => {
  setIsUploading(true);

  // Hapus gambar lama (jika ada)
  const oldPath = form[field];
  if (oldPath) {
    const relativeOldPath = oldPath.replace("templates/", "");
    const { error: deleteError } = await supabase.storage
      .from("templates")
      .remove([relativeOldPath]);

    if (deleteError) {
      console.warn(`Gagal hapus gambar lama ${field}:`, deleteError.message);
    }
  }

  // Upload gambar baru
  const filePath = `templates/ourtemplates/${Date.now()}-${file.name}`;
  const relativePath = filePath.replace("templates/", "");

  const { error } = await supabase.storage
    .from("templates")
    .upload(relativePath, file);

  setIsUploading(false);

  if (error) {
    toast.error(`Gagal upload gambar ${field}: ${error.message}`);
    return;
  }

  setForm((prev) => ({ ...prev, [field]: filePath }));
};

  const handleSubmit = async () => {
    if (!form.title.trim() || form.price <= 0 || !form.image_url) {
      toast.error("Judul, harga, dan gambar utama wajib diisi");
      return;
    }

    const { error } = isEdit
      ? await supabase.from("templates").update(form).eq("id", template.id)
      : await supabase.from("templates").insert(form);

    if (error) {
      toast.error(`Gagal menyimpan: ${error.message}`);
    } else {
      toast.success(
        isEdit
          ? `Template "${form.title}" berhasil diperbarui.`
          : `Template "${form.title}" berhasil ditambahkan.`
      );
      onSuccess();
      onClose();
    }
  };

  return (
    <div className="flex justify-center items-center w-300 max-w-300 px-4">
      {/* Preview */}
      <ScrollArea className="h-full w-[600px] mr-4 rounded-lg border">
        <div className="flex flex-col gap-3 items-center justify-center p-4">
          {[form.image_url, form.image_url_2, form.image_url_3]
            .filter(Boolean)
            .map((url, index) => (
              <div key={index} className="space-y-2">
                <p className="text-sm font-medium text-center">
                  Gambar {index + 1}
                </p>
                <Image
                  src={(supabaseUrl + url).trim()}
                  alt={`Preview ${index + 1}`}
                  width={250}
                  height={150}
                  className="rounded-lg object-cover"
                  unoptimized
                />
              </div>
            ))}
        </div>
      </ScrollArea>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border w-full mx-auto shadow space-y-5">
        <h2 className="text-xl font-semibold text-center">
          {isEdit ? "Edit Template" : "Tambah Template"}
        </h2>

        <div className="space-y-2">
          <Label htmlFor="title">Judul</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Harga</Label>
          <Input
            id="price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: +e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="deks">Deskripsi</Label>
          <Textarea
            id="deks"
            rows={3}
            value={form.deks}
            onChange={(e) => setForm({ ...form, deks: e.target.value })}
          />
        </div>

        {/* Upload dan preview gambar */}
        {(["image_url", "image_url_2", "image_url_3"] as const).map(
          (field, i) => (
            <div key={field} className="space-y-2">
              <Label>
                {field === "image_url"
                  ? "Gambar Utama (wajib)"
                  : `Gambar ${i + 1} (opsional)`}
              </Label>

              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadImage(file, field);
                }}
              />

              {/* 👇 Tampilkan status jika gambar sudah ada */}
              {form[field] && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  ✅ Gambar sudah dipilih
                </p>
              )}
            </div>
          )
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={isUploading}>
            {isUploading
              ? isEdit
                ? "Menyimpan..."
                : "Mengunggah..."
              : isEdit
              ? "Simpan"
              : "Tambah"}
          </Button>
        </div>
      </div>
    </div>
  );
}
