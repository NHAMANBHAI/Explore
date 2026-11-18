'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calculator,
  ShoppingBag,
  Truck,
  MapPin,
  Bike,
  Users,
  MessageSquare,
  Store,
  CreditCard,
  Package,
  FolderTree,
  Video,
  Tag,
  Megaphone,
  Palette,
  ShieldCheck,
  Languages,
  Settings,
  HelpCircle,
  ChevronDown,
  X,
  CalendarCheck2,
  Sparkles,
  LucideIcon,
} from 'lucide-react';
import { navigationMenuData } from '../../data/navigationData';
import { Badge } from '../ui/Badge';

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Calculator,
  ShoppingBag,
  Truck,
  MapPin,
  Bike,
  Users,
  MessageSquare,
  Store,
  CreditCard,
  Package,
  FolderTree,
  Video,
  Tag,
  Megaphone,
  Palette,
  ShieldCheck,
  Languages,
  Settings,
  HelpCircle,
  CalendarCheck2,
};

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
}) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    customers: true,
    orders: false,
    sellers: false,
    bookings: true,
  });

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleItemClick = (route?: string, hasChildren?: boolean, id?: string) => {
    if (hasChildren && id) {
      toggleExpand(id);
    }
    if (route) {
      onNavigate(route);
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-zinc-950/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-r border-zinc-200/80 dark:border-zinc-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-xs font-black text-sm tracking-tighter group-hover:scale-105 transition-transform">
              EX
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-zinc-950 dark:text-zinc-50 flex items-center gap-1.5">
                Explore
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
                  v2.0
                </span>
              </span>
              <p className="text-[10px] text-zinc-400 font-mono tracking-tight -mt-0.5">Multi-Business Commerce OS</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
          {navigationMenuData.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              <div className="px-3 mb-2 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  {group.groupTitle}
                </span>
              </div>

              {group.items.map((item) => {
                const IconComponent = iconMap[item.icon] || LayoutDashboard;
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isExpanded = Boolean(expandedItems[item.id]);
                const isActive =
                  currentRoute === item.route ||
                  (item.children && item.children.some((c) => c.route === currentRoute));

                return (
                  <div key={item.id} className="space-y-0.5">
                    <button
                      onClick={() => handleItemClick(item.route, hasChildren, item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                        isActive
                          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold shadow-xs'
                          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/80 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <IconComponent
                          className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                            isActive
                              ? 'text-orange-400 dark:text-orange-600'
                              : 'text-zinc-400 dark:text-zinc-500'
                          }`}
                        />
                        <span className="truncate">{item.title}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        {item.badge && (
                          <Badge
                            variant={item.badgeVariant as any || 'primary'}
                            size="sm"
                            dot={isActive}
                          >
                            {item.badge}
                          </Badge>
                        )}
                        {hasChildren && (
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        )}
                      </div>
                    </button>

                    {/* Submenu */}
                    {hasChildren && isExpanded && (
                      <div className="ml-5 pl-2.5 border-l border-zinc-200/80 dark:border-zinc-800 space-y-0.5 mt-0.5">
                        {item.children?.map((child) => {
                          const isChildActive = currentRoute === child.route;
                          return (
                            <button
                              key={child.id}
                              onClick={() => {
                                onNavigate(child.route);
                                onCloseMobile();
                              }}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                                isChildActive
                                  ? 'text-orange-600 dark:text-orange-400 font-semibold bg-orange-50/50 dark:bg-orange-950/20'
                                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50'
                              }`}
                            >
                              <span className="truncate">{child.title}</span>
                              {child.badge && (
                                <Badge variant="neutral" size="sm">
                                  {child.badge}
                                </Badge>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer Pill & Docs Shortcut */}
        <div className="p-3 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50">
          <button
            onClick={() => onNavigate('guide')}
            className="w-full flex items-center justify-between p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:border-orange-500/50 hover:bg-orange-50/30 dark:hover:bg-orange-950/20 transition-all cursor-pointer group"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>Platform Guide & RBAC</span>
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
              /guide
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};
