export interface GuideStep {
  title: string;
  description: string;
  actionHint?: string;
  badge?: string;
}

export interface GuideSection {
  id: string;
  title: string;
  category: 'getting_started' | 'operations' | 'customers' | 'vendors' | 'dispatch' | 'settings';
  summary: string;
  steps: GuideStep[];
  bestPractices: string[];
}
