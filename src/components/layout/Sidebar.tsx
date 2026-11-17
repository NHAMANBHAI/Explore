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
  ArrowRight,
  LucideIcon
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
  onCloseMobile
}) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    customers: true,
    orders: false,
    sellers: false
  });

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
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
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/25">
              H
            </div>
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 tracking-tight block">
                HyperLocal
              </span>
              <span className="text-[10px] font-medium text-slate-400 block tracking-wider uppercase">
                Admin Console
              </span>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live FlexiCommerce Storefront Link */}
        <div className="px-3 pt-3 pb-1">
          <button
            onClick={() => {
              onNavigate('storefront');
              onCloseMobile();
            }}
            className="w-full p-2.5 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/5 hover:from-orange-500/20 hover:to-amber-500/20 border border-orange-500/20 dark:border-orange-500/30 flex items-center justify-between text-left transition-all cursor-pointer group shadow-2xs"
            title="Switch to Public FlexiCommerce Storefront"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#FF5722] to-[#F5A623] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Store className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#FF5722] transition-colors truncate">
                  FlexiCommerce
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Live Public Storefront</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF5722] group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>
        </div>

        {/* Scrollable Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navigationMenuData.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {group.groupTitle && (
                <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {group.groupTitle}
                </div>
              )}
              {group.items.map(item => {
                const IconComponent = iconMap[item.icon] || LayoutDashboard;
                const isActive = currentRoute === item.route;
                const isExpanded = !!expandedItems[item.id];
                const hasChildren = item.children && item.children.length > 0;

                return (
                  <div key={item.id} className="space-y-0.5">
                    <button
                      onClick={() => handleItemClick(item.route, hasChildren, item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <IconComponent
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                          }`}
                        />
                        <span className="truncate">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.badge && (
                          <Badge variant={item.badgeVariant || 'secondary'} size="sm">
                            {item.badge}
                          </Badge>
                        )}
                        {hasChildren && (
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        )}
                      </div>
                    </button>

                    {/* Submenu Dropdown */}
                    {hasChildren && isExpanded && (
                      <div className="pl-9 pr-2 py-1 space-y-0.5 border-l-2 border-slate-100 dark:border-slate-800 ml-4">
                        {item.children!.map(sub => (
                          <button
                            key={sub.id}
                            onClick={() => handleItemClick(sub.route || item.route)}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors text-left ${
                              currentRoute === (sub.route || item.route)
                                ? 'text-blue-600 dark:text-blue-400 font-semibold'
                                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                            }`}
                          >
                            <span>{sub.title}</span>
                            {sub.badge && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-500">
                                {sub.badge}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer Info / Documentation Quick Link */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <div
            onClick={() => onNavigate('guide')}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center gap-3 cursor-pointer hover:border-blue-300 dark:hover:border-blue-900 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div className="flex-1 truncate">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block truncate">
                Platform Guide
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                How to use & workflows
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
