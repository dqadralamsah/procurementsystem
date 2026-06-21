'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
} from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export default function PaginationComponent({
  currentLimit = 10,
  totalPages,
}: {
  currentLimit?: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const limitChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('limit', value);
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const btnClass = 'border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50';
  const disabledClass = 'pointer-events-none opacity-50';

  return (
    <div className="flex items-center justify-between p-4 border-t border-slate-200">
      {/* Rows pages */}
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <p className="font-medium">Rows pages</p>
        <Select value={currentLimit.toString()} onValueChange={limitChange}>
          <SelectTrigger className="h-8 border-gray-300 bg-white shadow-sm focus:ring-blue-500">
            <SelectValue placeholder={currentLimit} />
          </SelectTrigger>
          <SelectContent position="popper" side="bottom" align="start" sideOffset={4}>
            {[10, 20, 50, 100].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pagination */}
      <Pagination className="w-auto justify-end mx-0">
        <PaginationContent className="gap-1">
          {/* Tombol FIRST (Ke halaman 1) */}
          <PaginationItem>
            <PaginationFirst
              href={createPageURL(1)}
              aria-disabled={currentPage <= 1}
              className={`${btnClass} ${currentPage <= 1 ? disabledClass : ''}`}
            />
          </PaginationItem>

          {/* Tombol PREVIOUS */}
          <PaginationItem>
            <PaginationPrevious
              href={createPageURL(currentPage - 1)}
              aria-disabled={currentPage <= 1}
              className={`${btnClass} ${currentPage <= 1 ? disabledClass : ''}`}
            />
          </PaginationItem>

          {/* Angka Halaman */}
          {pages.map((page) => {
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              const isActive = currentPage === page;
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={createPageURL(page)}
                    isActive={isActive}
                    className={`border shadow-sm transition-colors ${
                      isActive
                        ? 'border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700'
                        : btnClass
                    }`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <PaginationItem key={page}>
                  <PaginationEllipsis className="border border-gray-200 bg-white shadow-sm" />
                </PaginationItem>
              );
            }
            return null;
          })}

          {/* Tombol NEXT */}
          <PaginationItem>
            <PaginationNext
              href={createPageURL(currentPage + 1)}
              aria-disabled={currentPage >= totalPages}
              className={`${btnClass} ${currentPage >= totalPages ? disabledClass : ''}`}
            />
          </PaginationItem>

          {/* Tombol LAST (Ke halaman terakhir) */}
          <PaginationItem>
            <PaginationLast
              href={createPageURL(totalPages)}
              aria-disabled={currentPage >= totalPages}
              className={`${btnClass} ${currentPage >= totalPages ? disabledClass : ''}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
