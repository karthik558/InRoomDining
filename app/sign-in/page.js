'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, memo, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { monitorPagePerformance } from '@/components/admin/PerformanceMonitor'

// Create memoized form component for better performance
const LoginForm = memo(function LoginForm({ onSubmit, isLoading, error, success }) {
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(loginData)
  }
  
  const handleChange = useCallback((field) => (e) => {
    const value = e.target.value
    setLoginData(prev => ({...prev, [field]: value}))
  }, [])
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Success/Error Messages */}
      {success && (
        <div className="success-message">
          <i className="fas fa-check-circle"></i>
          <span>{success}</span>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          <span>{error}</span>
        </div>
      )}
      
      <div className="form-group">
        <label>Username</label>
        <div style={{ position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Enter your username"
            value={loginData.username}
            onChange={handleChange('username')}
            required
          />
          <i className="far fa-user input-icon"></i>
        </div>
      </div>
      
      <div className="form-group">
        <label>Password</label>
        <div style={{ position: 'relative' }}>
          <input 
            type="password" 
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleChange('password')}
            required
          />
          <i className="far fa-lock-alt input-icon"></i>
        </div>
      </div>
      
      <div className="form-options">
        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <Link href="/">← Back to Site</Link>
      </div>
      
      <button 
        type="submit" 
        className="signin-btn"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <i className="far fa-sign-in"></i>
            <span>Sign In</span>
          </>
        )}
      </button>
      
      <div className="admin-credentials">
        <div className="admin-credentials-title">Default Admin Credentials</div>
        <div className="admin-credentials-info">
          <span>Username: <strong>admin</strong></span>
          <span>Password: <strong>admin</strong></span>
        </div>
      </div>
    </form>
  )
})

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()
  
  useEffect(() => {
    // Start performance monitoring
    const cleanupMonitoring = monitorPagePerformance('SignInPage')
    
    return () => {
      if (cleanupMonitoring) cleanupMonitoring()
    }
  }, [])

  const handleLogin = useCallback((loginData) => {
    setIsLoading(true)
    setError('')
    setSuccess('')
    
    // Use setTimeout to simulate network request without blocking the UI
    setTimeout(() => {
      // Check for admin credentials
      if (loginData.username.toLowerCase() === 'admin' && loginData.password === 'admin') {
        setSuccess('Login successful! Redirecting to dashboard...')
        
        // Set admin session
        const adminUser = {
          username: 'admin',
          role: 'super_admin',
          permissions: {
            products: { view: true, edit: true, delete: true },
            deal_products: { view: true, edit: true, delete: true },
            slider_products: { view: true, edit: true, delete: true },
            testimonials: { view: true, edit: true, delete: true },
            users: { view: true, edit: true, delete: true }
          },
          loginTime: new Date().toISOString()
        }
        
        try {
          localStorage.setItem('currentAdminUser', JSON.stringify(adminUser))
          
          // Use requestAnimationFrame for smoother transitions
          requestAnimationFrame(() => {
            setTimeout(() => {
              setIsLoading(false)
              router.push('/admin')
            }, 500)
          })
        } catch (err) {
          setError('An error occurred while saving session data.')
          setIsLoading(false)
        }
      } else {
        // Handle regular user login here
        requestAnimationFrame(() => {
          setIsLoading(false)
          setError('Invalid credentials. Please use the default admin credentials below.')
        })
      }
    }, 300)
  }, [router])

  return (
    <>
      <Layout headerStyle={3} footerStyle={2} hideSearchBar={true}>
        <section className="signin-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-5 col-lg-6 col-md-8">
                <div className="signin-card">
                  <div className="signin-header text-center">
                    <div className="signin-icon">
                      <i className="fas fa-shield-alt"></i>
                    </div>
                    <h2>Admin Portal</h2>
                    <p>Secure access to your admin dashboard</p>
                  </div>
                  
                  {/* Use our optimized LoginForm component */}
                  <LoginForm 
                    onSubmit={handleLogin}
                    isLoading={isLoading}
                    error={error}
                    success={success}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
