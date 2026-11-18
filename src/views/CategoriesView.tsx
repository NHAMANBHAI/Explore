'use client';

import React, { useState } from 'react';
import { FolderTree, Plus, Search, Check, Layers, Image as ImageIcon } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  productsCount: number;
  subcategories: string[];
  icon: string;
  isActive: boolean;
}

const initialCategories: CategoryItem[] = [
  { id: 'cat-1', name: 'Dry Fruits & Nuts', slug: 'dry-fruits', productsCount: 68, subcategories: ['Almonds', 'Cashews', 'Raisins', 'Walnuts'], icon: '🥜', isActive: true },
  { id: 'cat-2', name: 'Dairy & A2 Ghee', slug: 'dairy', productsCount: 42, subcategories: ['Pure Cow Ghee', 'Fresh Paneer', 'A2 Milk', 'Curd'], icon: '🥛', isActive: true },
  { id: 'cat-3', name: 'Fruits & Vegetables', slug: 'fruits-vegetables', productsCount: 124, subcategories: ['Organic Greens', 'Fresh Fruits', 'Exotics', 'Hydroponics'], icon: '🥦', isActive: true },
  { id: 'cat-4', name: 'Spices & Whole Masala', slug: 'spices', productsCount: 89, subcategories: ['Whole Spices', 'Ground Powders', 'Blends', 'Saffron'], icon: '🌶️', isActive: true },
  { id: 'cat-5', name: 'Bakery & Artisanal Breads', slug: 'bakery', productsCount: 35, subcategories: ['Sourdough', 'Cookies', 'Cakes', 'Gluten Free'], icon: '🍞', isActive: true },
  { id: 'cat-6', name: 'Ayurveda & Wellness', slug: 'wellness', productsCount: 51, subcategories: ['Chyawanprash', 'Herbal Teas', 'Immunity Boosters'], icon: '🌿', isActive: true },
];

export const CategoriesView: React.FC = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState('');

  const filtered = categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const toggleCategory = (id: string) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          toast.info('Category Updated', `${c.name} status toggled`);
          return { ...c, isActive: !c.isActive };
        }
        return c;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <FolderTree className="w-6 h-6 text-emerald-600" />
            Categories & Department Taxonomy
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Organize catalog hierarchy, subcategories, banners, and department navigation.
          </p>
        </div>
        <button
          onClick={() => toast.info('Add Category', 'Category creator opened.')}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((cat) => (
          <div key={cat.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-2xl border border-emerald-100 dark:border-emerald-900/50">
                  {cat.icon}
                </div>
                <button
                  onClick={() => toggleCategory(cat.id)}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                    cat.isActive
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                  }`}
                >
                  {cat.isActive ? 'Active' : 'Hidden'}
                </button>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{cat.name}</h3>
              <p className="text-[11px] text-slate-400 font-mono">/{cat.slug} • {cat.productsCount} live items</p>

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Subcategories</p>
                <div className="flex flex-wrap gap-1">
                  {cat.subcategories.map((sub, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
