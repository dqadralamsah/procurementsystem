import { auth } from '@/lib/auth';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/sidebar/AppSidebar';
import DynamicBreadcrumbs from '@/components/layout/DynemicBreadcrumbs';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const role = session?.user.role.roleCode;

  return (
    <SidebarProvider defaultOpen={true}>
      <TooltipProvider>
        <AppSidebar role={role} />
      </TooltipProvider>
      <SidebarInset>
        <header className="flex items-center h-16">
          <div className="flex items-center h-4 gap-2 px-4">
            <SidebarTrigger size={'icon-lg'} />
            <Separator orientation="vertical" className="mr-2" />
            <DynamicBreadcrumbs />
          </div>
        </header>
        <main className="px-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
