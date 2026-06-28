"use client";

import SettingMenu, { SettingItem } from "./SettingMenu";

const data: SettingItem[] = [
  {
    title: "General",
    roleCode: ["ROLE-001", "ROLE-002", "ROLE-003"],
    items: [
      {
        title: "General",
        url: "/settings/general",
      },
    ],
  },
  {
    title: "Master Configuration",
    roleCode: ["ROLE-001"],
    items: [
      { title: "Warehouse", url: "/settings/master-configuration/warehouse" },
      { title: "UoM", url: "/settings/master-configuration/uom" },
      {
        title: "UoM Category",
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
    <aside className='w-72 p-4 border border-gray-200/80 bg-white rounded-lg shadow-md'>
      <nav className='flex flex-col gap-2'>
        <SettingMenu items={data} />
      </nav>
    </aside>
  );
}
