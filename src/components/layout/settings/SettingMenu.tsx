"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export type SettingItem = {
  title: string;
  roleCode?: string[];
  items: {
    title: string;
    url: string;
  }[];
};

export default function SettingMenu({ items }: { items: SettingItem[] }) {
  const pathname = usePathname();

  return (
    <>
      {items.map((group) => (
        <div key={group.title}>
          <div className='text-[10px] font-semibold text-muted-foreground/70 uppercase select-none'>
            {group.title}
          </div>
          {group.items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <Button
                key={item.title}
                variant='ghost'
                asChild
                className={`w-full justify-start text-xs cursor-default ${isActive ? "bg-accent text-accent-foreground" : ""}`}
              >
                <Link href={item.url}>
                  <span>{item.title}</span>
                </Link>
              </Button>
            );
          })}
        </div>
      ))}
    </>
  );
}
