import { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { FeaturebaseLinkButton } from '@/components/app-sidebar/featurebase-link-button';
import { LinkInBioLinkButton } from '@/components/app-sidebar/link-in-bio-link-button';
import { AnimatedIcon } from '@/components/app-sidebar/sidebar-icon';
import { Badge } from '@/components/ui/badge';
import { ChartColumnIncreasingIcon } from '@/components/ui/chart-column-increasing';
import { FileTextIcon } from '@/components/ui/file-text';
import { HandCoinsIcon } from '@/components/ui/hand-coins';
import { MessageSquareIcon } from '@/components/ui/message-square';
import { SettingsIcon } from '@/components/ui/settings';
import { ShieldCheckIcon } from '@/components/ui/shield-check';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { SquareGanttChartIcon } from '@/components/ui/square-gantt-chart';
import { WalletIcon } from '@/components/ui/wallet';
import { useIsVerified } from '@/hooks/profile/use-is-verified';
import { useWalletBalance } from '@/hooks/web3/use-wallet-balance';
import { featureFlags } from '@/lib/flags';
import { cn } from '@/lib/utils';

import { NavUser } from './nav-user';
import { SidebarLinkButton } from './sidebar-link-button';

export type MenuItemProps = {
  title: string;
  url: string;
  icon: LucideIcon | AnimatedIcon;
  disabled?: boolean;
};

type MenuItemRender = {
  render: () => React.ReactNode;
};

type MenuItem = MenuItemProps | MenuItemRender;

const isRender = (item: MenuItem): item is MenuItemRender => {
  return 'render' in item;
};

/** Dynamics wallet menu item which fetches and displays balance */
const WalletMenuItem = () => {
  const { data: usdcBalance, isPending: isLoading } = useWalletBalance();

  const item = {
    title: 'Wallet',
    url: '/wallet',
    icon: WalletIcon,
  };
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarLinkButton item={item} />

      <SidebarMenuBadge>
        {isLoading ? (
          <Skeleton className='h-4 w-16' variant='darker' />
        ) : (
          usdcBalance && (
            <span className='animate-in fade-in-0'>${usdcBalance} USDC</span>
          )
        )}
      </SidebarMenuBadge>
    </SidebarMenuItem>
  );
};

const DisabledAnalyticsMenuItem = () => {
  const item = {
    title: 'Analytics',
    url: '/wallet',
    icon: ChartColumnIncreasingIcon,
    disabled: true,
  };
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarLinkButton item={item} />

      <SidebarMenuBadge>
        <Badge variant='outline' className='text-muted-foreground font-normal'>
          coming soon 🚀
        </Badge>
      </SidebarMenuBadge>
    </SidebarMenuItem>
  );
};

// Menu items.
const items: MenuItem[] = [
  {
    title: 'Invoices',
    url: '/invoices',
    icon: FileTextIcon,
  },
  {
    render: WalletMenuItem,
  },
  {
    title: 'Transactions',
    url: '/wallet/all',
    icon: HandCoinsIcon,
  },
  // {
  //   title: 'Transfers',
  //   url: '/wallet',
  //   icon: ArrowLeftRightIcon,
  // },
];

const profileItems: MenuItem[] = [
  {
    render: LinkInBioLinkButton,
  },
  {
    render: DisabledAnalyticsMenuItem,
  },
];

const VerifiedMenuItem = () => {
  const isVerified = useIsVerified();
  const item = {
    title: isVerified ? 'Account verified' : 'Get verified',
    url: '/verify',
    icon: ShieldCheckIcon,
  };
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarLinkButton
        item={item}
        iconClassName={cn(isVerified && 'text-green-500')}
      />
    </SidebarMenuItem>
  );
};

const accountItems: MenuItem[] = [
  {
    render: VerifiedMenuItem,
  },
  {
    render: () => {
      const item = {
        title: 'Feedback',
        icon: MessageSquareIcon,
      };
      return (
        <SidebarMenuItem key={item.title}>
          <FeaturebaseLinkButton item={item} />
        </SidebarMenuItem>
      );
    },
  },
  // TODO: Remove this ugly hack once settings is enabled and we can remove the feature flag
  ...(featureFlags.settings
    ? [
        {
          title: 'Settings',
          url: '/settings',
          icon: SettingsIcon,
        },
      ]
    : []),
];

/** A global sidebar */
export const AppSidebar = () => {
  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className='w-fit p-3'>
        <Link href='/'>
          <Image
            src='/svg/logo.svg'
            width={32}
            height={32}
            className='size-8'
            alt='Sorbet logo'
            priority
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* Dashboard */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarLinkButton
              item={{
                title: 'Dashboard',
                url: '/dashboard',
                icon: SquareGanttChartIcon,
              }}
            />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Payments */}
        <SidebarGroup>
          <SidebarGroupLabel>Payments</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(items)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Profile */}
        <SidebarGroup>
          <SidebarGroupLabel>Profile</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(profileItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account */}
        <SidebarGroup className='mt-auto'>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(accountItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};

const renderMenuItems = (items: MenuItem[]) => {
  return items.map((item) => {
    if (isRender(item)) {
      return item.render();
    }
    return (
      <SidebarMenuItem key={item.title}>
        <SidebarLinkButton item={item} />
      </SidebarMenuItem>
    );
  });
};
