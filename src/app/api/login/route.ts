// src/app/api/login/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Baca env
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username dan password wajib diisi" },
        { status: 400 }
      );
    }

    // Query ke tabel admins (ubah sesuai nama tabel di Supabase)
    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .eq("username", username)
      .eq("password", password) // ⚠️ kalau sudah hashing jangan langsung compare plaintext
      .single();

    if (error) {
      console.error("Supabase error:", error.message);
      return NextResponse.json(
        { success: false, message: "Terjadi kesalahan saat login" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Username atau password salah" },
        { status: 401 }
      );
    }

    // Berhasil login
    return NextResponse.json({
      success: true,
      message: "Login berhasil",
      user: data,
    });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { success: false, message: "Kesalahan server" },
      { status: 500 }
    );
  }
}
