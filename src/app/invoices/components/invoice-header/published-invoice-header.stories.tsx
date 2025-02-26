import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { PublishedInvoiceHeader } from './published-invoice-header';

type Story = StoryObj<typeof PublishedInvoiceHeader>;

const meta = {
  title: 'Invoices/PublishedInvoiceHeader',
  component: PublishedInvoiceHeader,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    recipientEmail: 'test@test.com',
    stringToCopy: 'https://mysorbet.io/invoices/123',
    onDownload: fn(),
    onSend: fn(),
  },
  argTypes: {},
} satisfies Meta<typeof PublishedInvoiceHeader>;

export default meta;

export const Default: Story = {};
