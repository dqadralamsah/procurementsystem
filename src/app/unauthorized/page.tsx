import Link from 'next/link';
import { ShieldAlert, LogIn } from 'lucide-react';

export default function Unauthorized() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center px-4 text-center">
      <div className="flex h-24 w-24 mb-6 items-center justify-center rounded-full bg-orange-100/50">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
          <ShieldAlert className="h-8 w-8 text-orange-600" strokeWidth={2} />
        </div>
      </div>

      <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
        Akses Ditolak
      </h1>

      <p className="mb-8 max-w-100 text-gray-500">
        Anda harus login terlebih dahulu untuk mengakses halaman ini. Sesi Anda mungkin telah
        berakhir.
      </p>

      <Link
        href="/signin"
        className="inline-flex items-center justify-center px-6 py-2.5 gap-2 rounded-md bg-blue-600 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <LogIn className="h-4 w-4" />
        Kembali ke Login
      </Link>
    </div>
  );
}
