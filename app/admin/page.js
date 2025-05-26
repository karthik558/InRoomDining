'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState(null)
  const [stats, setStats] = useState({
    products: 0,
    dealProducts: 0,
    sliderProducts: 0,
    testimonials: 0,
    users: 0
  })

  useEffect(() => {
    const user = localStorage.getItem('currentAdminUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    
    // Load stats from localStorage or API
    const savedUsers = JSON.parse(localStorage.getItem('adminUsers') || '[]')
    setStats({
      products: 12,
      dealProducts: 5,
      sliderProducts: 8,
      testimonials: 24,
      users: savedUsers.length + 1 // +1 for the default admin
    })
  }, [])

  const dashboardCards = [
    {
      title: 'Products',
      description: 'Manage your product catalog',
      icon: 'fas fa-box',
      link: '/admin/products',
      count: stats.products,
      color: 'primary',
      permission: 'products'
    },
    {
      title: 'Deal Products', 
      description: 'Manage special deals and offers',
      icon: 'fas fa-tags',
      link: '/admin/deal-products',
      count: stats.dealProducts,
      color: 'success',
      permission: 'deal_products'
    },
    {
      title: 'Slider Products',
      description: 'Manage homepage slider items',
      icon: 'fas fa-images', 
      link: '/admin/slider-products',
      count: stats.sliderProducts,
      color: 'info',
      permission: 'slider_products'
    },
    {
      title: 'Testimonials',
      description: 'Manage customer testimonials',
      icon: 'fas fa-star',
      link: '/admin/testimonials', 
      count: stats.testimonials,
      color: 'warning',
      permission: 'testimonials'
    }
  ]

  const hasPermission = (permission) => {
    if (!currentUser) return false
    if (currentUser.role === 'super_admin') return true
    return currentUser.permissions?.[permission]?.view || false
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1><i className="fas fa-chart-line"></i> Dashboard Overview</h1>
          <p>Welcome back, <strong>{currentUser?.username}</strong>! Here's what's happening with your website.</p>
        </div>
        <div className="header-actions">
          <div className="quick-stats">
            <div className="quick-stat">
              <i className="fas fa-users"></i>
              <span>{stats.users} Users</span>
            </div>
            <div className="quick-stat">
              <i className="fas fa-clock"></i>
              <span>Last login: Today</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stats-grid">
          {dashboardCards
            .filter(card => hasPermission(card.permission))
            .map((card, index) => (
              <Link href={card.link} key={index} className={`dashboard-card card-${card.color}`}>
                <div className="card-header">
                  <div className="card-icon">
                    <i className={card.icon}></i>
                  </div>
                  <div className="card-count">{card.count}</div>
                </div>
                <div className="card-content">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
                <div className="card-footer">
                  <span>View Details</span>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </Link>
            ))
          }
          
          {(currentUser?.role === 'super_admin' || currentUser?.role === 'admin') && (
            <Link href="/admin/user-management" className="dashboard-card card-admin">
              <div className="card-header">
                <div className="card-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="card-count">{stats.users}</div>
              </div>
              <div className="card-content">
                <h3>User Management</h3>
                <p>Manage admin users and permissions</p>
              </div>
              <div className="card-footer">
                <span>Manage Users</span>
                <i className="fas fa-arrow-right"></i>
              </div>
            </Link>
          )}
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section-row">
          <div className="section-card recent-activity">
            <div className="section-header">
              <h3><i className="fas fa-clock"></i> Recent Activity</h3>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon success">
                  <i className="fas fa-plus"></i>
                </div>
                <div className="activity-content">
                  <p><strong>Product Added</strong></p>
                  <span>New product "Premium Product" was added</span>
                  <time>2 hours ago</time>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon info">
                  <i className="fas fa-edit"></i>
                </div>
                <div className="activity-content">
                  <p><strong>Testimonial Updated</strong></p>
                  <span>Customer testimonial was updated</span>
                  <time>4 hours ago</time>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon warning">
                  <i className="fas fa-user"></i>
                </div>
                <div className="activity-content">
                  <p><strong>User Login</strong></p>
                  <span>Admin user logged in successfully</span>
                  <time>6 hours ago</time>
                </div>
              </div>
            </div>
          </div>

          <div className="section-card quick-actions">
            <div className="section-header">
              <h3><i className="fas fa-bolt"></i> Quick Actions</h3>
            </div>
            <div className="quick-actions-grid">
              {hasPermission('products') && (
                <button className="quick-action-btn primary">
                  <i className="fas fa-plus"></i>
                  <span>Add Product</span>
                </button>
              )}
              {hasPermission('testimonials') && (
                <button className="quick-action-btn success">
                  <i className="fas fa-star"></i>
                  <span>Add Testimonial</span>
                </button>
              )}
              {(currentUser?.role === 'super_admin' || currentUser?.role === 'admin') && (
                <button className="quick-action-btn info">
                  <i className="fas fa-user-plus"></i>
                  <span>Add User</span>
                </button>
              )}
              <button className="quick-action-btn warning">
                <i className="fas fa-chart-bar"></i>
                <span>View Reports</span>
              </button>
              <button className="quick-action-btn secondary">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </button>
              <button className="quick-action-btn purple">
                <i className="fas fa-backup"></i>
                <span>Backup Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}