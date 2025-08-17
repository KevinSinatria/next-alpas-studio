import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { nama, email, noHp, pesan, linkAsset } = await req.json();

  if (!nama || !email || !noHp || !pesan || !linkAsset) {
    return NextResponse.json({ error: "Semua field wajib diisi." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: 'ALPAS Studio <onboarding@resend.dev>',
      to: 'waqqirhumaid1@gmail.com',
      subject: `Pemesanan Baru dari ${nama}`,
      replyTo: email,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="https://yourdomain.com/logo.png" alt="ALPAS Studio" width="120" />
              <h2 style="color: #333;">📩 Pesanan Baru Masuk</h2>
            </div>

            <div style="font-size: 16px; color: #333;">
              <p><strong>👤 Nama:</strong> ${nama}</p>
              <p><strong>📧 Email:</strong> ${email}</p>
              <p><strong>📱 No HP:</strong> ${noHp}</p>
              <p><strong>📝 Pesan:</strong><br/> ${pesan}</p>
              <p><strong>📎 Link Asset:</strong> <a href="${linkAsset}" style="color: #007bff;">${linkAsset}</a></p>
            </div>

            <div style="margin-top: 30px; text-align: center; font-size: 14px; color: #777;">
              <p>Email ini dikirim dari website <strong>ALPAS Studio</strong>.</p>
            </div>
          </div>
        </div>
      `


    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json({ error: "Gagal mengirim email." }, { status: 500 });
  }
}
