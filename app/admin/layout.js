'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import '../../public/assets/css/admin-layout.css'
import '../../public/assets/css/admin-auth.css'

export default function AdminRootLayout({ children }) {
  return <AdminLayout>{children}</AdminLayout>
}