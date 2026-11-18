'use client';

import React, { useState } from 'react';
import { Languages, Check, Globe, RefreshCw } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface LanguageItem {
  code: string;
  name: string;
  nativeName: string;
  translatedPercent: number;
  isActive: boolean;
}

const initialLanguages: LanguageItem[] = [
  { code: 'en', name: 'English', nativeName: 'English', translatedPercent: 100, isActive: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', translatedPercent: 98, isActive: true },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', translatedPercent: 95, isActive: true },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', translatedPercent: 92, isActive: true },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', translatedPercent: 90, isActive: true },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', translatedPercent: 88, isActive: true },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', translatedPercent: 85, isActive: true },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', translatedPercent: 84, isActive: true },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', translatedPercent: 82, isActive: true },
];

export const LanguagesView: React.FC = () => {
  const { toast } = useToast();
  const [langs, setLangs] = useState(initialLanguages);

  const toggleLanguage = (code: string) => {
    setLangs((prev) =>
      prev.map((l) => {
        if (l.code === code) {
          toast.info('Language Updated', `${l.name} (${l.nativeName}) status toggled`);
          return { ...l, isActive: !l.isActive };
        }
        return l;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Languages className="w-6 h-6 text-purple-600" />
            9+ Indian Regional Languages & Locales
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Enable regional language auto-translations for customer mobile apps and storefront checkout.
          </p>
        </div>
        <button
          onClick={() => toast.success('Translations Synced', 'Updated translation keys from Google Cloud Translate.')}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-500/20 flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" /> Sync Cloud Translations
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {langs.map((l) => (
          <div key={l.code} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {l.code}
                </span>
                <button
                  onClick={() => toggleLanguage(l.code)}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                    l.isActive
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                  }`}
                >
                  {l.isActive ? 'Active' : 'Disabled'}
                </button>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{l.name}</h3>
                <p className="text-sm font-semibold text-purple-600">{l.nativeName}</p>
              </div>

              <div className="pt-2">
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Translation Progress</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{l.translatedPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: `${l.translatedPercent}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
