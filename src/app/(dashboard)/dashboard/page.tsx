import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect('/signin');

  return (
    <div>
      <div>
        <h1>Hello {user.name}</h1>
        <h3>Selamat Datang Kembali</h3>
      </div>
    </div>
  );
}
