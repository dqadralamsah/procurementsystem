'use client';

import {
  LucideIcon,
  LayoutDashboard,
  FilePlus,
  ClipboardList,
  ShoppingCart,
  PackageCheck,
  Warehouse,
  Store,
  UserCog,
  FileCog,
} from 'lucide-react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '../../ui/sidebar';
import NavMenu from './NavMenu';
import NavReport from './NavReport';

type MenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  roleCode?: string[];
  items?: {
    title: string;
    url: string;
  }[];
};

const data: { navMenu: MenuItem[]; navReport: MenuItem[] } = {
  navMenu: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
      roleCode: ['ROLE-001', 'ROLE-002', 'ROLE-003'],
    },
    {
      title: 'Request',
      url: '/request',
      icon: FilePlus,
      roleCode: ['ROLE-001', 'ROLE-002', 'ROLE-003'],
    },
    {
      title: 'Purchase Request',
      url: '/purchase-requst',
      icon: ClipboardList,
      roleCode: ['ROLE-001', 'ROLE-002'],
    },
    {
      title: 'Purchase Order',
      url: '/purchase-order',
      icon: ShoppingCart,
      roleCode: ['ROLE-001', 'ROLE-002'],
    },
    {
      title: 'Goods Receipt',
      url: '/goods-receipt',
      icon: PackageCheck,
      roleCode: ['ROLE-001', 'ROLE-003'],
    },
    {
      title: 'Inventory',
      url: '/inventory',
      icon: Warehouse,
      roleCode: ['ROLE-001', 'ROLE-003'],
    },
    {
      title: 'Supplier',
      url: '/Supplier',
      icon: Store,
      roleCode: ['ROLE-001', 'ROLE-003'],
    },
    {
      title: 'User Management',
      url: '/Supplier',
      icon: UserCog,
      roleCode: ['ROLE-001'],
    },
  ],
  navReport: [
    {
      title: 'Reports',
      url: '/reports',
      icon: FileCog,
      roleCode: ['ROLE-001'],
      items: [
        { title: 'Purchase Report', url: '/reports/purchase-report' },
        { title: 'Activity Report', url: '/reports/activity-report' },
      ],
    },
  ],
};

export default function AppSidebar({
  role,
  ...Props
}: React.ComponentProps<typeof Sidebar> & { role?: string }) {
  const filteredMenu = data.navMenu.filter((menu) => menu.roleCode?.includes(role ?? ''));
  const filteredReportMenu = data.navReport.filter((menu) => menu.roleCode?.includes(role ?? ''));

  return (
    <Sidebar collapsible="icon" {...Props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavMenu items={filteredMenu} />
        <NavReport items={filteredReportMenu} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
