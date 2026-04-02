'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Ban, ArrowLeft, Home } from 'lucide-react';

export default function Forbidden() {
  const router = useRouter();

  return (
    <div className="h-dvh flex flex-col items-center justify-center p-16 text-center">
      <div className="flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-red-100/50">
        <div className="flex items-center justify-center h-16 w-16h-16 w-16 rounded-full bg-red-100">
          <Ban className="h-8 w-8 text-red-600" strokeWidth={2} />
        </div>
      </div>

      <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
        403 - Forbidden
      </h1>

      <p className="mb-8 max-w-md text-gray-500">
        Maaf, peran (role) Anda saat ini tidak memiliki izin untuk melihat atau memodifikasi halaman
        ini.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center justify-center px-6 py-2.5 gap-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </button>

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-6 py-2.5 gap-2 rounded-md bg-gray-900 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          <Home className="h-4 w-4" />
          Dashboard Utama
        </Link>
      </div>
    </div>
  );
}
