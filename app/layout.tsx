import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MD Nadim Mostofa — MERN & Next.js Developer',
  description:
    'Portfolio of MD Nadim Mostofa, a MERN stack and Next.js developer based in Rangpur, Bangladesh.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
