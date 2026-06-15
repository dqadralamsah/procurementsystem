'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

// Context for dynamic breadcrumb labels
type BreadcrumbContextType = {
  labels: Record<string, string>;
  setLabel: (id: string, label: string) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [labels, setLabels] = useState<Record<string, string>>({});

  const setLabel = (id: string, label: string) => {
    setLabels((prev) => {
      if (prev[id] === label) return prev;
      return { ...prev, [id]: label };
    });
  };

  return (
    <BreadcrumbContext.Provider value={{ labels, setLabel }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
}

// Helper component to register a label for an ID from any page
export function SetBreadcrumb({ id, label }: { id: string; label: string }) {
  const { setLabel } = useBreadcrumb();

  useEffect(() => {
    if (id && label) {
      setLabel(id, label);
    }
  }, [id, label, setLabel]);

  return null;
}

export default function DynamicBreadcrumbs() {
  const pathname = usePathname();
  const { labels } = useBreadcrumb();
  
  const segments = pathname
    .split('/')
    .filter(Boolean)
    .filter((s) => s.toLowerCase() !== 'dashboard');

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join('/')}`;
          const isLast = index === segments.length - 1;

          // Check if segment has a registered label in context, otherwise format from slug
          const title = labels[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

          return (
            <div key={href} className="flex items-center gap-1.5">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{title}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
