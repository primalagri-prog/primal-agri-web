import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Primal Agri — Pakistan\'s Agricultural Marketplace',
  description: 'Buy and sell livestock, machinery, land, crops, and more. Pakistan\'s trusted agri marketplace.',
  keywords: 'livestock, cattle, agriculture, Pakistan, farming, mandi, agri marketplace',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
