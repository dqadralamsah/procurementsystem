export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" bg-gray-100">
      <div className=" flex items-center justify-center h-screen">
        <div className=" w-full rounded-lg bg-white shadow max-w-md">{children}</div>
      </div>
    </div>
  );
}
