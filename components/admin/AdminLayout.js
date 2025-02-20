'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import '../../public/assets/css/admin-layout.css'

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const isActive = (path) => (pathname === path ? 'active' : '')

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <div className="logo-container">
          <img src="/assets/img/logo/logo-white.png" alt="Logo" />
          <span>Admin Dashboard</span>
        </div>
        <nav>
          <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>
            Main Site
          </Link>
          <Link href="/logout" className="logout-button">
            Logout
          </Link>
        </nav>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <ul>
            <li>
              <Link href="/admin" className={isActive('/admin')}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/admin/products" className={isActive('/admin/products')}>
                Products
              </Link>
            </li>
            <li>
              <Link href="/admin/deal-products" className={isActive('/admin/deal-products')}>
                Deal Products
              </Link>
            </li>
            <li>
              <Link href="/admin/slider-products" className={isActive('/admin/slider-products')}>
                Slider Products
              </Link>
            </li>
            <li>
              <Link href="/admin/testimonials" className={isActive('/admin/testimonials')}>
                Testimonials
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="admin-footer">
        © Copyright {new Date().getFullYear()}. All rights reserved. Developed by{' '}
        <a href="
        https://karthiklal.in" target="_blank" rel="noopener noreferrer">
          KARTHIK LAL
        </a>
      </footer>
    </div>
  )
}