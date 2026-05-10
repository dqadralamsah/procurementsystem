'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchComponent({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      type="text"
      className="px-3 py-2 w-full max-w-sm text-sm border rounded-md"
      placeholder={placeholder}
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get('search')?.toString()}
    />
  );
}
