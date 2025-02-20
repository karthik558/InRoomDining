'use client'
import Link from 'next/link'
import '../../public/assets/css/admin-layout.css'

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      {/* Products Card */}
      <Link href="/admin/products" className="admin-card">
        <h3>Products</h3>
        <p>Manage your products</p>
      </Link>

      {/* Deal Products Card */}
      <Link href="/admin/deal-products" className="admin-card">
        <h3>Deal Products</h3>
        <p>Manage deal products</p>
      </Link>

      {/* Slider Products Card */}
      <Link href="/admin/slider-products" className="admin-card">
        <h3>Slider Products</h3>
        <p>Manage slider products</p>
      </Link>

      {/* Testimonials Card */}
      <Link href="/admin/testimonials" className="admin-card">
        <h3>Testimonials</h3>
        <p>Manage testimonials</p>
      </Link>
    </div>
  )
}