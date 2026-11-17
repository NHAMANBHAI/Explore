import { LucideIcon } from 'lucide-react';

export interface NavSubItem {
  id: string;
  title: string;
  badge?: string;
  route?: string;
}

export interface NavItem {
  id: string;
  title: string;
  icon: string;
  badge?: string;
  badgeVariant?: 'primary' | 'success' | 'warning' | 'danger';
  route?: string;
  children?: NavSubItem[];
}

export interface NavGroup {
  groupTitle?: string;
  items: NavItem[];
}
