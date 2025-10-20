'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-semibold text-xl">Veskebutikken</Link>
        <nav className="flex gap-6">
          <Link className={pathname.startsWith('/shop') ? 'font-semibold' : ''} href="/shop">Butikk</Link>
          <Link className={pathname.startsWith('/cart') ? 'font-semibold' : ''} href="/cart">Handlekurv</Link>
          <Link href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</Link>
        </nav>
      </div>
    </header>
  );
}
