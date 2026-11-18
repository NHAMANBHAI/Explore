'use client';

import React, { useState } from 'react';
import { Menu, Search, Sun, Moon, Bell, HelpCircle, Bug, BugOff, LogOut, Lock, User, CalendarCheck2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useCustomer } from '../../context/CustomerContext';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
  onOpenCommandPalette: () => void;
  onNavigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileSidebar,
  onOpenCommandPalette,
  onNavigate
}) => {
  const { theme, toggleTheme } = useTheme();
  const { isSimulatingError, toggleSimulatedError, reloadCustomers } = useCustomer();
  const { user, logout, triggerSessionExpired } = useAuth();
  const { toast } = useToast();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleToggleError = () => {
    toggleSimulatedError();
    if (!isSimulatingError) {
      toast.warning('Simulated 500 Server Error Active', 'Backend mutations & loads will now return error payloads to test error UI.');
    } else {
      toast.success('Simulation Restored to Normal', 'Backend API calls will now succeed normally.');
      reloadCustomers();
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.info('Signed Out', 'You have been safely signed out of the admin console.');
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Left side: Hamburger on mobile + Global Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg lg:hidden transition-colors cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Button triggering Ctrl+K Palette */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-3 px-3.5 py-1.5 bg-zinc-100/80 dark:bg-zinc-900/80 hover:bg-zinc-200/70 dark:hover:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-800 rounded-xl text-zinc-500 dark:text-zinc-400 text-xs transition-all w-52 sm:w-80 justify-between group shadow-2xs cursor-pointer"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-4 h-4 text-zinc-400 group-hover:text-orange-500 transition-colors" />
            <span className="truncate">Search customers, bookings, stores...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-500 shadow-2xs">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right side: Bookings pill, Error Simulation Toggle, Docs, Theme, Profile */}
      <div className="flex items-center gap-2">
        {/* Bookings Quick Pill */}
        <button
          onClick={() => onNavigate('bookings')}
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 transition-colors cursor-pointer"
        >
          <CalendarCheck2 className="w-3.5 h-3.5 text-orange-500" />
          <span className="hidden md:inline">Bookings</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </button>

        {/* Error Simulation Dev Tool */}
        <button
          onClick={handleToggleError}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border shadow-2xs ${
            isSimulatingError
              ? 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-900 animate-pulse'
              : 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 hover:bg-zinc-200/80'
          }`}
          title="Toggle Simulated 500 Backend Server Error"
        >
          {isSimulatingError ? <Bug className="w-3.5 h-3.5 text-rose-600" /> : <BugOff className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">
            {isSimulatingError ? 'Error (500)' : 'Test Errors'}
          </span>
        </button>

        {/* User Guide Shortcut */}
        <button
          onClick={() => onNavigate('guide')}
          className="p-2 text-zinc-500 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl transition-colors hidden sm:flex items-center gap-1.5 text-xs font-medium cursor-pointer"
          title="How to Use This Platform"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="hidden md:inline">Guide</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl transition-colors cursor-pointer"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            className="p-2 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl transition-colors relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500 ring-2 ring-white dark:ring-zinc-900" />
          </button>
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block" />

        {/* Admin Profile Dropdown */}
        <div className="relative">
          <div
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2.5 pl-1 cursor-pointer select-none"
          >
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-500/20 shadow-xs"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-600 to-amber-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-orange-500/20 shadow-xs">
                {user?.name?.substring(0, 2).toUpperCase() || 'AD'}
              </div>
            )}
            <div className="hidden lg:block text-left">
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block leading-tight truncate max-w-[120px]">
                {user?.name || 'Administrator'}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium block capitalize">
                {user?.role?.replace(/_/g, ' ') || 'Super Admin'}
              </span>
            </div>
          </div>

          {/* Profile Dropdown Menu */}
          {isProfileMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsProfileMenuOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in duration-100">
                <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{user?.name}</p>
                  <p className="text-[11px] text-zinc-400 truncate">{user?.email}</p>
                  <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-50 dark:bg-orange-950 text-orange-600">
                    {user?.authProvider === 'google' ? 'Google Auth' : 'Email Session'}
                  </span>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      triggerSessionExpired();
                    }}
                    className="w-full px-4 py-2 text-xs text-left text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 flex items-center gap-2.5 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-500" />
                    Simulate Lock / Expire
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onNavigate('settings');
                    }}
                    className="w-full px-4 py-2 text-xs text-left text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 flex items-center gap-2.5 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-zinc-400" />
                    Account Settings
                  </button>
                </div>

                <div className="pt-1 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full px-4 py-2 text-xs text-left text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
