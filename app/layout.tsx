import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/components/cart/CartProvider'

export const metadata = {
  title: 'Veskebutikken',
  description: 'Håndlagde vesker – nettbutikk starter',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb">
      <body>
        <CartProvider>
          <Navbar />
          <main className="container py-10">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
