import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Primal Agri — Sargodha\'s Agricultural Marketplace',
  description: 'The premier marketplace for verified livestock, high-quality seeds, and AI-driven agricultural insights. Built by farmers, for farmers.',
  keywords: 'livestock, cattle, agriculture, Pakistan, Sargodha, farming, mandi, agri marketplace',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,600&family=Inter:wght@400;500;600&family=Noto+Sans+Arabic:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
