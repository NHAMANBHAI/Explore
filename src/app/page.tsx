'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FlexiStorefrontPage } from '@/views/storefront/FlexiStorefrontPage';

export default function HomePage() {
  const router = useRouter();

  return (
    <main>
      <FlexiStorefrontPage
        onNavigateToAdmin={() => router.push('/admin')}
      />
    </main>
  );
}
