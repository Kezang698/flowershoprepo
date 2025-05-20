import Header from '../components/Header';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Blossom Shop',
  description: 'Your one-stop flower shop',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="mt-[80px]">
          {children}
        </main>
      </body>
    </html>
  );
}
