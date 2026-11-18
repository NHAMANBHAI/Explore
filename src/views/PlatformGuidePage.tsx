import React, { useState } from 'react';
import { platformGuides } from '../data/platformGuideData';
import { HelpCircle, Search, BookOpen, CheckCircle, ArrowRight, Lightbulb, ExternalLink } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

interface PlatformGuidePageProps {
  onNavigate: (route: string) => void;
}

export const PlatformGuidePage: React.FC<PlatformGuidePageProps> = ({ onNavigate }) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const activeGuide = platformGuides.find(g => g.id === selectedGuideId) || platformGuides[0];

  const filteredGuides = platformGuides.filter(
    g =>
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Title & Search */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl space-y-3">
          <Badge variant="primary" className="bg-white/20 text-white border-white/30 backdrop-blur-xs">
            Documentation & Operations Playbook
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            How to Use This Hyperlocal Platform
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            Step-by-step operational handbook covering customer management, live order timeouts, zone dispatching, merchant commissions, and platform integrations.
          </p>

          <div className="relative pt-2">
            <Search className="absolute left-3 top-5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search guide by topic, e.g. 'wallet', 'orders', 'zones'..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border-none rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Guide Navigation & Detail View Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Topic Selector */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 mb-2">
            Guide Chapters
          </h3>
          <div className="space-y-1.5">
            {filteredGuides.map(guide => {
              const isActive = guide.id === activeGuide.id;
              return (
                <div
                  key={guide.id}
                  onClick={() => setSelectedGuideId(guide.id)}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all border text-left ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 border-blue-500 ring-2 ring-blue-500/10 shadow-xs'
                      : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs font-bold ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-slate-100'}`}>
                      {guide.title}
                    </h4>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-blue-600 translate-x-1' : 'text-slate-400'}`} />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {guide.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Step-by-Step Walkthrough */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Chapter Guide
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 mt-1">
                {activeGuide.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                {activeGuide.summary}
              </p>
            </div>

            {/* Steps Container */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Workflow Steps
              </h4>
              <div className="space-y-3">
                {activeGuide.steps.map((st, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {st.title}
                      </h5>
                      {st.badge && (
                        <Badge variant="primary" size="sm">
                          {st.badge}
                        </Badge>
                      )}
                      {st.actionHint && (
                        <span className="text-[10px] font-semibold font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                          {st.actionHint}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Practices Callout */}
            {activeGuide.bestPractices && activeGuide.bestPractices.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-xs">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                  Recommended Operational Best Practices
                </div>
                <ul className="space-y-1.5 pl-6 list-disc text-xs text-amber-800 dark:text-amber-300">
                  {activeGuide.bestPractices.map((bp, bpIdx) => (
                    <li key={bpIdx}>{bp}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Navigation Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Ready to put this into practice?</span>
              <button
                onClick={() => {
                  if (activeGuide.id === 'customer-management') onNavigate('customers');
                  else if (activeGuide.id === 'order-lifecycle') onNavigate('orders');
                  else if (activeGuide.id === 'zones-and-geofencing') onNavigate('dispatch');
                  else if (activeGuide.id === 'system-settings') onNavigate('settings');
                  else onNavigate('dashboard');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                Go to Module <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
