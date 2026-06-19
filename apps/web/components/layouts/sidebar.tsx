'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Activity,
  AlertTriangle,
  BarChart3,
  MessageSquare,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight,
  Home,
  Zap,
  BookOpen,
  GitBranch,
  Bell,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  match?: (path: string) => boolean;
}

const items: SidebarItem[] = [
  {
    icon: <LayoutDashboard className="h-5 w-5" />,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: <Activity className="h-5 w-5" />,
    label: 'Projects',
    href: '/projects',
    match: (path) => path.startsWith('/projects'),
  },
  {
    icon: <AlertTriangle className="h-5 w-5" />,
    label: 'Incidents',
    href: '/incidents',
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    label: 'Metrics',
    href: '/metrics',
  },
  {
    icon: <Zap className="h-5 w-5" />,
    label: 'Alerts',
    href: '/alerts',
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    label: 'Assistant',
    href: '/assistant',
  },
];

const bottomItems: SidebarItem[] = [
  {
    icon: <Users className="h-5 w-5" />,
    label: 'Organization',
    href: '/org',
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: 'Settings',
    href: '/settings',
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (item: SidebarItem) => {
    if (item.match) return item.match(pathname);
    return pathname === item.href || pathname.startsWith(item.href + '/');
  };

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isCollapsed ? 64 : 240,
      }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 flex flex-col"
    >
      {/* Logo */}
      <div className="flex h-16 items-center px-4 border-b">
        <motion.div
          animate={{
            opacity: isCollapsed ? 0 : 1,
            width: isCollapsed ? 0 : 'auto',
          }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 overflow-hidden"
        >
          <Zap className="h-6 w-6 text-brand" />
          <span className="font-bold text-lg">Vigilex</span>
        </motion.div>
        {isCollapsed && <Zap className="h-6 w-6 text-brand mx-auto" />}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              isActive(item)
                ? 'bg-brand/10 text-brand'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            {item.icon}
            <motion.span
              animate={{
                opacity: isCollapsed ? 0 : 1,
                width: isCollapsed ? 0 : 'auto',
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden whitespace-nowrap"
            >
              {item.label}
            </motion.span>
          </Link>
        ))}
      </nav>

      {/* Bottom items */}
      <div className="border-t py-4 px-2 space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              isActive(item)
                ? 'bg-brand/10 text-brand'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            {item.icon}
            <motion.span
              animate={{
                opacity: isCollapsed ? 0 : 1,
                width: isCollapsed ? 0 : 'auto',
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden whitespace-nowrap"
            >
              {item.label}
            </motion.span>
          </Link>
        ))}

        {/* Toggle button */}
        <button
          onClick={onToggle}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground w-full"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
          <motion.span
            animate={{
              opacity: isCollapsed ? 0 : 1,
              width: isCollapsed ? 0 : 'auto',
            }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden whitespace-nowrap"
          >
            Collapse
          </motion.span>
        </button>
      </div>
    </motion.aside>
  );
}