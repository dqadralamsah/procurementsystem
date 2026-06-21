import SettingAside from "@/components/layout/settings/SettingAside";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex gap-2'>
      <div className='w-72 h-screen p-4 border border-gray-200/80 bg-white rounded-lg shadow-md'>
        <SettingAside />
      </div>

      <main className=''>{children}</main>
    </div>
  );
}
