'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const isActive = (path) => (pathname === path ? 'active' : '')

  useEffect(() => {
    const user = localStorage.getItem('currentAdminUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
    } else {
      router.push('/sign-in')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('currentAdminUser')
    router.push('/sign-in')
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // For admin pages, require authentication
  if (!currentUser) {
    return <div className="admin-loading">Loading...</div>
  }

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-left">
          <button 
            className="mobile-menu-toggle"
            onClick={toggleSidebar}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="logo-container">
            <img src="/assets/img/logo/logo-white.png" alt="Logo" />
            <span>Admin Dashboard</span>
          </div>
        </div>
        
        <div className="admin-header-right">
          <div className="user-info">
            <span className="user-welcome">Welcome, {currentUser.username}</span>
            <span className="user-role">{currentUser.role}</span>
          </div>
          <nav className="header-nav">
            <Link href="/" className="main-site-link">
              <i className="fas fa-external-link-alt"></i>
              Main Site
            </Link>
            <button onClick={handleLogout} className="logout-button">
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </nav>
        </div>
      </header>

      <div className="admin-body">
        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-content">
            <ul className="sidebar-menu">
              <li>
                <Link href="/admin" className={`sidebar-item ${isActive('/admin')}`}>
                  <i className="fas fa-tachometer-alt"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              
              {(currentUser.role === 'super_admin' || currentUser.role === 'admin') && (
                <li>
                  <Link href="/admin/user-management" className={`sidebar-item ${isActive('/admin/user-management')}`}>
                    <i className="fas fa-users"></i>
                    <span>User Management</span>
                  </Link>
                </li>
              )}
              
              {(currentUser.permissions?.products?.view || currentUser.role === 'super_admin') && (
                <li>
                  <Link href="/admin/products" className={`sidebar-item ${isActive('/admin/products')}`}>
                    <i className="fas fa-box"></i>
                    <span>Products</span>
                  </Link>
                </li>
              )}
              
              {(currentUser.permissions?.deal_products?.view || currentUser.role === 'super_admin') && (
                <li>
                  <Link href="/admin/deal-products" className={`sidebar-item ${isActive('/admin/deal-products')}`}>
                    <i className="fas fa-tags"></i>
                    <span>Deal Products</span>
                  </Link>
                </li>
              )}
              
              {(currentUser.permissions?.slider_products?.view || currentUser.role === 'super_admin') && (
                <li>
                  <Link href="/admin/slider-products" className={`sidebar-item ${isActive('/admin/slider-products')}`}>
                    <i className="fas fa-images"></i>
                    <span>Slider Products</span>
                  </Link>
                </li>
              )}
              
              {(currentUser.permissions?.testimonials?.view || currentUser.role === 'super_admin') && (
                <li>
                  <Link href="/admin/testimonials" className={`sidebar-item ${isActive('/admin/testimonials')}`}>
                    <i className="fas fa-star"></i>
                    <span>Testimonials</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </aside>

        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div 
            className="sidebar-overlay" 
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="admin-main">
          <div className="admin-content">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}