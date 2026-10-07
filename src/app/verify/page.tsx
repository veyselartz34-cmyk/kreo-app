import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const resolvedParams = await searchParams;
  const token = resolvedParams.token;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm text-center max-w-sm w-full">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-[#1A1A1A] mb-2">Gecersiz Istek</h1>
          <p className="text-sm text-zinc-500 mb-6">Dogrulama token'i bulunamadi.</p>
          <Link href="/register" className="block w-full py-3 bg-[#1A1A1A] text-white rounded-xl text-sm font-bold">Kayıt Ol'a Don</Link>
        </div>
      </div>
    );
  }

  // Token'i veritabaninda bul
  const verificationRecord = await prisma.verificationToken.findUnique({
    where: { token: token }
  });

  if (!verificationRecord) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm text-center max-w-sm w-full">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-[#1A1A1A] mb-2">Gecersiz Token</h1>
          <p className="text-sm text-zinc-500 mb-6">Bu dogrulama linki gecersiz veya daha once kullanilmis.</p>
          <Link href="/login" className="block w-full py-3 bg-[#1A1A1A] text-white rounded-xl text-sm font-bold">Giris Yap</Link>
        </div>
      </div>
    );
  }

  if (verificationRecord.expires < new Date()) {
    // Suresi gecmis token'i sil
    await prisma.verificationToken.delete({ where: { token: token } });
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm text-center max-w-sm w-full">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-[#1A1A1A] mb-2">Suresi Dolmus Link</h1>
          <p className="text-sm text-zinc-500 mb-6">Bu linkin suresi dolmus. Lutfen tekrar kayit olun.</p>
          <Link href="/register" className="block w-full py-3 bg-[#1A1A1A] text-white rounded-xl text-sm font-bold">Kayıt Ol</Link>
        </div>
      </div>
    );
  }

  // Token gecerli, kullanicinin emailVerified alanini guncelle
  const user = await prisma.user.findUnique({
    where: { email: verificationRecord.identifier }
  });

  if (user) {
    await prisma.user.update({
      where: { email: user.email },
      data: { emailVerified: new Date() }
    });
  }

  // Token'i artik sil
  await prisma.verificationToken.delete({ where: { token: token } });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
      <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm text-center max-w-sm w-full">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-[#1A1A1A] mb-2">E-Posta Dogrulandi!</h1>
        <p className="text-sm text-zinc-500 mb-6">Hesabiniz basariyla aktif edildi. Artik giris yapabilirsiniz.</p>
        <Link href="/login" className="block w-full py-3 bg-[#1A1A1A] text-white rounded-xl text-sm font-bold hover:bg-black transition-colors">Hemen Giris Yap</Link>
      </div>
    </div>
  );
}
