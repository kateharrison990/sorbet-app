import { Download } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { InvoiceHeader } from './invoice-header';

/**
 * Public invoice header to be rendered for clients visiting the invoice link
 * If `from` is omitted, the header will be a loading state.
 */
export const PublicInvoiceHeader = ({
  from,
  onDownload,
}: {
  from?: string;
  onDownload?: () => void;
}) => {
  const isLoading = !from;
  return (
    <InvoiceHeader>
      {isLoading ? (
        <Skeleton className='mr-auto h-5 w-40' />
      ) : (
        <h1 className='animate-in fade-in slide-in-from-left-5 mr-auto text-sm font-medium'>
          {from} sent you an invoice
        </h1>
      )}
      <div className='flex items-center gap-2'>
        <Button variant='outline' onClick={onDownload} disabled={isLoading}>
          <Download /> Download
        </Button>
        <Button variant='outline' asChild>
          <Link href='/signup'>Sign up</Link>
        </Button>
      </div>
    </InvoiceHeader>
  );
};
