import SettingAside from "@/components/layout/settings/SettingAside";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex gap-4'>
      <SettingAside />

      <main className='w-full'>{children}</main>
    </div>
  );
}
