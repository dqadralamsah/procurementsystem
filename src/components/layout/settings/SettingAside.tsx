"use client";

import { LucideIcon, Settings, Box } from "lucide-react";
import SettingMenu from "./SettingMenu";

type SettingAside = {
  title: string;
  url: string;
  icon: LucideIcon;
  roleCode?: string[];
  items?: {
    title: string;
    url: string;
  }[];
};

const data: SettingAside[] = [
  {
    title: "Settings",
    url: "/settings/general",
    icon: Settings,
    roleCode: ["ROLE-001", "ROLE-002", "ROLE-003"],
  },
  {
    title: "Master Configuration",
    url: "/settings/master-configuration",
    icon: Box,
    roleCode: ["ROLE-001"],
    items: [
      { title: "Warehouse", url: "/settings/master-configuration/warehouse" },
      { title: "UOM", url: "/settings/master-configuration/uom" },
      {
        title: "UOM Category",
        url: "/settings/master-configuration/uom-category",
      },
      {
        title: "Item Category",
        url: "/settings/master-configuration/item-category",
      },
    ],
  },
];

export default function SettingAside() {
  return (
    <aside className='h-full w-full'>
      <nav className='flex flex-col gap-2'>
        <SettingMenu items={data} />
      </nav>
    </aside>
  );
}
