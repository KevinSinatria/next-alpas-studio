"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

const supabase = createClient();

type Props = {
  template?: any;
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
  });

  const handleSubmit = async () => {
    if (!form.title || !form.price || !form.image_url) {
      alert("Semua field wajib diisi");
      return;
    }

    const { error } = isEdit
      ? await supabase.from("templates").update(form).eq("id", template.id)
      : await supabase.from("templates").insert(form);

    if (error) {
      alert("Gagal menyimpan data");
      return;
    }

    onSuccess();
    onClose();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const filePath = `ourtemplates/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("templates")
      .upload(filePath, file);

    setIsUploading(false);

    if (error) {
      alert("❌ Gagal upload gambar: " + error.message);
      return;
    }

    setForm({ ...form, image_url: filePath });
  };

  return (
    <div className="bg-white p-6 rounded shadow w-300 h-140 mx-auto">
      <h2 className="text-lg font-bold mb-4">
        {isEdit ? "Edit Template" : "Tambah Template"}
      </h2>

      <input
        placeholder="Judul"
        className="border p-2 w-full mb-3"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Harga"
        type="number"
        className="border p-2 w-full mb-3"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: +e.target.value })}
      />
      <input
        placeholder="Deskripsi"
        className="border p-2 w-full mb-3"
        value={form.deks}
        onChange={(e) => setForm({ ...form, deks: e.target.value })}
      />
      <input
        type="file"
        accept="image/*"
        className="border p-2 w-full mb-3"
        onChange={handleFileChange}
      />

      {form.image_url && (
        <Image
          src={`https://bmgeuqxyshumafaxsauc.supabase.co/storage/v1/object/public/templates/${form.image_url}`}
          alt="Preview"
          width={128}
          height={128}
          className="w-32 h-32 object-cover rounded mb-3"
        />
      )}

      <div className="flex justify-between">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={isUploading}
        >
          {isEdit ? "Update" : "Tambah"}
        </button>
        <button
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Batal
        </button>
      </div>
    </div>
  );
}
