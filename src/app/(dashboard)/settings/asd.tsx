"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Settings, 
  Box, 
  Warehouse, 
  ListTree, 
  Tags, 
  Ruler, 
  ChevronDown, 
  ChevronRight 
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();
  
  const isMasterConfigActive = pathname.includes("/settings/master-config");
  const [isMasterOpen, setIsMasterOpen] = useState<boolean>(isMasterConfigActive || true);

  const masterConfigMenus = [
    { name: "Warehouse", href: "/settings/master-config/warehouse", icon: Warehouse },
    { name: "Item Category", href: "/settings/master-config/item-category", icon: ListTree },
    { name: "UOM", href: "/settings/master-config/uom", icon: Ruler },
    { name: "UOM Category", href: "/settings/master-config/uom-category", icon: Tags },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen gap-6 p-6">
      
      <aside className="w-full md:w-64 flex-shrink-0 space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Settings</h2>
          
          <nav className="space-y-2">
            <Link
              href="/settings/general"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === "/settings/general" 
                  ? "bg-accent text-accent-foreground" 
                  : "text-muted-foreground"
              )}
            >
              <Settings className="w-4 h-4" />
              General
            </Link>

            <Collapsible
              open={isMasterOpen}
              onOpenChange={setIsMasterOpen}
              className="w-full"
            >
              <CollapsibleTrigger 
                className={cn(
                  "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isMasterConfigActive && !isMasterOpen 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
              >
                <div className="flex items-center gap-2">
                  <Box className="w-4 h-4" />
                  Master Config
                </div>
                {isMasterOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </CollapsibleTrigger>
              
              <CollapsibleContent className="space-y-1 mt-1 px-3">
                <div className="pl-4 border-l border-border ml-2 space-y-1 py-1">
                  {masterConfigMenus.map((menu) => {
                    const isActive = pathname === menu.href;
                    return (
                      <Link
                        key={menu.href}
                        href={menu.href}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                          isActive 
                            ? "bg-accent text-accent-foreground" 
                            : "text-muted-foreground"
                        )}
                      >
                        <menu.icon className="w-4 h-4" />
                        {menu.name}
                      </Link>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </nav>
        </div>
      </aside>

      <main className="flex-1 min-w-0 bg-background border border-border rounded-lg p-6 shadow-sm">
        {children}
      </main>
      
    </div>
  );
}
