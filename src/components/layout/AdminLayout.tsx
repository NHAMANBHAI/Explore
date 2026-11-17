import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CommandPalette } from './CommandPalette';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  currentRoute,
  onNavigate
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors">
      {/* Sidebar (Desktop permanent, Mobile offcanvas) */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Wrapper (offset by sidebar width on desktop) */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Header
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onNavigate={onNavigate}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 py-4 px-6 text-center text-xs text-slate-400 bg-white/50 dark:bg-slate-900/50">
          <p>© 2026 HyperLocal Multivendor Delivery & E-Commerce Platform. All rights reserved.</p>
        </footer>
      </div>

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
};
