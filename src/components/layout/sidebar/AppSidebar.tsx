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
  Boxes,
  SquareActivity,
  Settings,
} from 'lucide-react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '../../ui/sidebar';
import MainMenu from './MainMenu';
import SecondMenu from './SecondMenu';

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

const data: { MainMenu: MenuItem[]; SecondMenu: MenuItem[] } = {
  MainMenu: [
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
      url: '/supplier',
      icon: Store,
      roleCode: ['ROLE-001', 'ROLE-003'],
    },
    {
      title: 'Item Catalog',
      url: '/item-catalog',
      icon: Boxes,
      roleCode: ['ROLE-001'],
    },
  ],
  SecondMenu: [
    {
      title: 'Reports',
      url: '/reports',
      icon: SquareActivity,
      roleCode: ['ROLE-001'],
      items: [
        { title: 'Purchase Report', url: '/reports/purchase-report' },
        { title: 'Activity Logs', url: '/reports/activity-logs' },
      ],
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
      roleCode: ['ROLE-001'],
      items: [
        { title: 'Warehouse', url: '/settings/warehouse' },
        { title: 'Uom Configuration', url: '/settings/uom-configuration' },
        { title: 'Item Category', url: '/settings/item-category' },
        { title: 'User Management', url: '/settings/user-management' },
      ],
    },
  ],
};

export default function AppSidebar({
  role,
  ...Props
}: React.ComponentProps<typeof Sidebar> & { role?: string }) {
  const filteredMenu = data.MainMenu.filter((menu) => menu.roleCode?.includes(role ?? ''));
  const filteredReportMenu = data.SecondMenu.filter((menu) => menu.roleCode?.includes(role ?? ''));

  return (
    <Sidebar collapsible="icon" {...Props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <MainMenu items={filteredMenu} />
        <SecondMenu items={filteredReportMenu} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
