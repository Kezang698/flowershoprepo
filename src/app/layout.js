import Header from '../components/Header';
import Footer from '../components/Footer';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '../lib/UserContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Blossom Shop',
  description: 'Your one-stop flower shop',
};

// Add Font Awesome stylesheet
export const viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome CSS for icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className}>
        <UserProvider>
          <Header />
          <main className="mt-[80px]">
            {children}
          </main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
