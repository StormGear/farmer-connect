'use client';
 
import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains'; // add baseSepolia for testing 
 
export function Providers(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={import.meta.env.VITE_PUBLIC_ONCHAINKIT_API_KEY} 
      projectId={import.meta.env.VITE_PROJECT_ID}
      chain={base} // add baseSepolia for testing 
      config={{
        appearance: {
          name: 'FarmConnect',        // Displayed in modal header
          logo: '',// Displayed in modal header
          mode: 'auto',                 // 'light' | 'dark' | 'auto'
          theme: 'default',             // 'default' or custom theme
        },
        wallet: { 
          display: 'modal', 
          termsUrl: 'https://...', 
          privacyUrl: 'https://...', 
          },
      }}
    >
      {props.children}
    </OnchainKitProvider>
  );
}