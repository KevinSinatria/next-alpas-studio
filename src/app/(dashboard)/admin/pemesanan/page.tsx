"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Filter, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type OrderType = "template" | "kustom";

type SupabaseOrder = {
  id: string;
  nama: string;
  email: string;
  pesan: string;
  link?: string;
  template: {
    title: string;
  } | null;
};

type Order = {
  id: string;
  nama: string;
  email: string;
  pesan: string;
  link?: string;
  jenis: OrderType;
  templateTitle: string; // ✅ WAJIB agar tidak error
};


export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState<OrderType | "all">("all");

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("pesanans").delete().eq("id", id);
    if (error) {
      console.error("Gagal menghapus data:", error.message);
    } else {
      setOrders((prev) => prev.filter((order) => order.id !== id));
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("pesanans")
        .select(
          "id, nama, email, pesan, link, template_id, template:templates(title)"
        );

      if (error) {
        console.error("Gagal fetch data:", error.message);
      } else {
        const transformed: Order[] = data.map((item) => ({
          id: item.id,
          nama: item.nama,
          email: item.email,
          pesan: item.pesan,
          link: item.link ?? "",
          jenis: item.template_id ? "template" : "kustom",
          templateTitle: item.template?.title ?? "",
        }));

        setOrders(transformed);
      }
    };

    fetchOrders();
  }, []);

  const data = useMemo(() => {
    if (filter === "all") return orders;
    return orders.filter((o) => o.jenis === filter);
  }, [filter, orders]);

  const showLinkColumn = filter !== "template";

  return (
    <div className="relative mx-auto w-full max-w-6xl bg-white/40 rounded-2xl">
      {/* Kartu glass utama */}
      <div className="relative rounded-[28px] border border-white/25 bg-white/10 shadow-2xl backdrop-blur-xl">
        {/* Header section */}
        <div className="flex items-center justify-between p-5">
          <div className="text-gray-700 text-lg font-semibold tracking-wide">
            Pemesanan
          </div>

          {/* Filter button + popover */}
          <div className="relative">
            <button
              onClick={() => setOpenFilter((v) => !v)}
              className="group flex items-center gap-2 rounded-full border border-white/30 bg-gray-600/30 px-4 py-2 text-white/90 hover:bg-white/20 transition"
            >
              <Filter size={18} />
              <span className="text-sm">Filter</span>
              <ChevronRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>

            {openFilter && (
              <div
                onMouseLeave={() => setOpenFilter(false)}
                className="absolute right-0 mt-2 w-40 rounded-2xl border border-gray-600/30 bg-gray-500/65 p-2 shadow-xl backdrop-blur-xl z-50"
              >
                <button
                  onClick={() => {
                    setFilter("kustom");
                    setOpenFilter(false);
                  }}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm text-white/90 hover:bg-gray-600/20 ${
                    filter === "kustom" ? "ring-1 ring-white/40" : ""
                  }`}
                >
                  Kustom
                </button>
                <button
                  onClick={() => {
                    setFilter("template");
                    setOpenFilter(false);
                  }}
                  className={`mt-1 w-full rounded-xl px-3 py-2 text-left text-sm text-white/90 hover:bg-gray-600/20 ${
                    filter === "template" ? "ring-1 ring-white/40" : ""
                  }`}
                >
                  Template
                </button>
                <button
                  onClick={() => {
                    setFilter("all");
                    setOpenFilter(false);
                  }}
                  className={`mt-1 w-full rounded-xl px-3 py-2 text-left text-sm text-white/90 hover:bg-gray-600/20 ${
                    filter === "all" ? "ring-1 ring-white/40" : ""
                  }`}
                >
                  Semua
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="px-5 pb-5">
          <div className="overflow-hidden rounded-2xl border border-white/20">
            {/* Scroll container */}
            <div className="max-h-[400px] overflow-y-auto">
              <table className="w-full table-fixed">
                <thead className="sticky top-0 bg-gray-600 text-white/90 z-10">
                  <tr className="text-left text-sm">
                    <Th className="w-24">Pesanan</Th>
                    <Th className="w-36">Nama</Th>
                    <Th className="w-60">Email</Th>
                    <Th className="w-auto">Pesan</Th>
                    <Th className="w-40">Template</Th>
                    {showLinkColumn && <Th className="w-64">Link Asset</Th>}
                    <Th className="w-20">Aksi</Th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((o, idx) => (
                    <tr
                      key={o.id + idx}
                      className={`text-sm text-black font-se,ibold ${
                        idx % 2 === 0 ? "bg-gray-800/29" : "bg-white/0"
                      }`}
                    >
                      <Td>{o.id}</Td>
                      <Td className="font-medium">{o.nama}</Td>
                      <Td className="truncate">{o.email}</Td>
                      <Td className="truncate">{o.pesan}</Td>
                      <Td>
                        {o.jenis === "template" ? o.templateTitle || "-" : "-"}
                      </Td>

                      {showLinkColumn && (
                        <Td>
                          {o.jenis === "kustom" && o.link ? (
                            <Link
                              href={o.link}
                              target="_blank"
                              className="underline underline-offset-2 hover:opacity-80"
                            >
                              {o.link}
                            </Link>
                          ) : (
                            <span className="text-white/50">-</span>
                          )}
                        </Td>
                      )}
                      <Td>
                        <button
                          onClick={() => {
                            const yakin = confirm(
                              "Apakah Anda yakin ingin menghapus pesanan ini?"
                            );
                            if (yakin) {
                              handleDelete(o.id);
                            }
                          }}
                          className="text-red-400 hover:text-red-600 transition"
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer sudut bulat bawah biar mirip figma */}
          <div className="pointer-events-none h-6 rounded-b-[28px] bg-gradient-to-b from-transparent to-white/10" />
        </div>
      </div>
    </div>
  );
}

function Th({
  children,
  className = "",
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <th className={`px-4 py-3 font-semibold ${className}`}>
      <div className="flex items-center gap-2">
        <span>{children}</span>
      </div>
    </th>
  );
}

function Td({
  children,
  className = "",
}: React.PropsWithChildren<{ className?: string }>) {
  return <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>;
}
