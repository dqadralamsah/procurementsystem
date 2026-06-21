"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Pastikan utilitas cn Shadcn di-import

type SettingItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  roleCode?: string[];
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

export default function SettingMenu({ items }: { items: SettingItem[] }) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => {
        const hasSubitems = item.items && item.items.length > 0;
        const isParentActive = pathname.startsWith(item.url);

        // Condition 1 Collapsible Menu
        if (hasSubitems) {
          return (
            <Collapsible key={item.title}>
              <CollapsibleTrigger asChild>
                <Button
                  variant='ghost'
                  className={`w-full font-normal ${isParentActive && "bg-accent text-accent-foreground"}`}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className='transition-transform duration-200 group-data-[state=open]:rotate-90' />
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent>
                {item.items?.map((subitem) => {
                  const isSubActive = pathname === subitem.url;
                  return (
                    <Button
                      key={subitem.title}
                      variant='ghost'
                      asChild
                      className={`w-full font-normal ${isSubActive && "bg-accent text-accent-foreground font-medium"}`}
                    >
                      <Link href={subitem.url}>{subitem.title}</Link>
                    </Button>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          );
        }

        // Condition 2 Single Menu
        const isSingleActive = pathname === item.url;
        return (
          <Button
            key={item.title}
            variant='ghost'
            asChild
            className={`w-full font-normal ${isSingleActive && "bg-accent text-accent-foreground"}`}
          >
            <Link href={item.url}>
              {item.icon && <item.icon className='h-4 w-4' />}
              <span>{item.title}</span>
            </Link>
          </Button>
        );
      })}
    </>
  );
}
