import '@src/app/globals.css';
import { metadata } from './metadata';

export { metadata };

interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({ children }: LayoutProps) {
  return children;
}
