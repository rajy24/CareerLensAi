import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { CareerLensProvider } from '@/lib/context';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'CareerLens — Career Planning & Job-Readiness Workspace',
  description: 'Your career, with a clearer direction. Transparent skill gap analysis, résumé evaluation, role-specific interview prep, and application pipeline management.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable}`}>
      <body className="font-sans bg-slate-50 text-slate-900 min-h-screen">
        <CareerLensProvider>
          {children}
        </CareerLensProvider>
      </body>
    </html>
  );
}
