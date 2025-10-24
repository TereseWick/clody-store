'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="border-b bg-brand-200 backdrop-blur">
      <div className="container flex items-center justify-between py-3 md:py-4 ">
        <Link href="/" className="flex items-center gap-2 md:gap-3" aria-label="Gå til forsiden">
        <Image 
        src="/Logo.png" 
        alt="Logo" 
        width={40} 
        height={40} 
        className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain"
        />
        </Link>

        <nav className="flex gap-6">
          <Link className={pathname.startsWith('/shop') ? 'font-semibold' : ''} href="/shop">Butikk</Link>
          <Link className={pathname.startsWith('/cart') ? 'font-semibold' : ''} href="/cart">Handlekurv</Link>
          <Link href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</Link>
        </nav>
      </div>
    </header>
  );
}
