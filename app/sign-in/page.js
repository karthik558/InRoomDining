
'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '../../public/assets/css/signin-modern.css'

export default function SignIn() {
    const [loginData, setLoginData] = useState({ username: '', password: '' })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const router = useRouter()

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        console.log('Login form submitted with:', loginData)
        setIsLoading(true)
        setError('')
        setSuccess('')
        
        // Check for admin credentials
        if (loginData.username.toLowerCase() === 'admin' && loginData.password === 'admin') {
            console.log('Admin credentials matched, setting up session...')
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
            
            localStorage.setItem('currentAdminUser', JSON.stringify(adminUser))
            console.log('Admin session saved to localStorage')
            
            setTimeout(() => {
                setIsLoading(false)
                console.log('Redirecting to admin dashboard...')
                router.push('/admin')
            }, 1500)
        } else {
            // Handle regular user login here
            console.log('Invalid credentials provided:', loginData)
            setTimeout(() => {
                setIsLoading(false)
                setError('Invalid credentials. Please use the default admin credentials below.')
            }, 1000)
        }
    }

    return (
        <>
            <Layout headerStyle={3} footerStyle={2} hideSearchBar={true}>
                <section className="signin-area" style={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                    paddingTop: '80px',
                    paddingBottom: '80px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-5 col-lg-6 col-md-8">
                                <div className="signin-card" style={{
                                    background: 'white',
                                    padding: '50px 40px',
                                    borderRadius: '20px',
                                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                                    border: '1px solid rgba(120, 38, 113, 0.1)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    {/* Decorative background */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '-50%',
                                        right: '-50%',
                                        width: '200%',
                                        height: '200%',
                                        background: 'linear-gradient(45deg, transparent 30%, rgba(120, 38, 113, 0.03) 50%, transparent 70%)',
                                        transform: 'rotate(-45deg)',
                                        zIndex: 1
                                    }}></div>
                                    
                                    <div style={{ position: 'relative', zIndex: 2 }}>
                                        {/* Header */}
                                        <div className="signin-header text-center mb-40">
                                            <div className="signin-icon" style={{
                                                width: '80px',
                                                height: '80px',
                                                background: 'linear-gradient(135deg, #782671 0%, #9c4a8a 100%)',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: '0 auto 20px',
                                                boxShadow: '0 10px 30px rgba(120, 38, 113, 0.3)'
                                            }}>
                                                <i className="fas fa-shield-alt" style={{ color: 'white', fontSize: '32px' }}></i>
                                            </div>
                                            <h2 style={{
                                                color: '#782671',
                                                fontWeight: '700',
                                                fontSize: '28px',
                                                marginBottom: '12px',
                                                fontFamily: "'Jost', sans-serif"
                                            }}>Admin Portal</h2>
                                            <p style={{
                                                color: '#666',
                                                fontSize: '16px',
                                                lineHeight: '1.6',
                                                margin: 0
                                            }}>
                                                Secure access to your admin dashboard
                                            </p>
                                        </div>

                                        {/* Form */}
                                        <form onSubmit={handleLoginSubmit}>
                                            {/* Success/Error Messages */}
                                            {success && (
                                                <div className="success-message" style={{
                                                    background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                                                    border: '1px solid #6ee7b7',
                                                    borderRadius: '10px',
                                                    padding: '12px 16px',
                                                    marginBottom: '20px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    animation: 'fadeInUp 0.3s ease-out'
                                                }}>
                                                    <i className="fas fa-check-circle" style={{ color: '#065f46' }}></i>
                                                    <span style={{ color: '#065f46', fontSize: '14px', fontWeight: '500' }}>
                                                        {success}
                                                    </span>
                                                </div>
                                            )}
                                            
                                            {error && (
                                                <div style={{
                                                    background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                                                    border: '1px solid #fca5a5',
                                                    borderRadius: '10px',
                                                    padding: '12px 16px',
                                                    marginBottom: '20px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    animation: 'shake 0.5s ease-in-out'
                                                }}>
                                                    <i className="fas fa-exclamation-triangle" style={{ color: '#dc2626' }}></i>
                                                    <span style={{ color: '#dc2626', fontSize: '14px', fontWeight: '500' }}>
                                                        {error}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="form-group mb-25">
                                                <label style={{
                                                    display: 'block',
                                                    color: '#333',
                                                    fontWeight: '600',
                                                    marginBottom: '8px',
                                                    fontSize: '14px'
                                                }}>Username</label>
                                                <div style={{ position: 'relative' }}>
                                                    <input 
                                                        type="text" 
                                                        placeholder="Enter your username"
                                                        value={loginData.username}
                                                        onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                                                        required
                                                        style={{
                                                            width: '100%',
                                                            padding: '16px 20px 16px 50px',
                                                            border: '2px solid #e1e5e9',
                                                            borderRadius: '12px',
                                                            fontSize: '16px',
                                                            background: '#fafbfc',
                                                            transition: 'all 0.3s ease',
                                                            fontFamily: "'Jost', sans-serif"
                                                        }}
                                                        onFocus={(e) => {
                                                            e.target.style.borderColor = '#782671'
                                                            e.target.style.background = 'white'
                                                            e.target.style.boxShadow = '0 0 0 4px rgba(120, 38, 113, 0.1)'
                                                        }}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = '#e1e5e9'
                                                            e.target.style.background = '#fafbfc'
                                                            e.target.style.boxShadow = 'none'
                                                        }}
                                                    />
                                                    <i className="fas fa-user" style={{
                                                        position: 'absolute',
                                                        left: '18px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        color: '#782671',
                                                        fontSize: '16px'
                                                    }}></i>
                                                </div>
                                            </div>

                                            <div className="form-group mb-25">
                                                <label style={{
                                                    display: 'block',
                                                    color: '#333',
                                                    fontWeight: '600',
                                                    marginBottom: '8px',
                                                    fontSize: '14px'
                                                }}>Password</label>
                                                <div style={{ position: 'relative' }}>
                                                    <input 
                                                        type="password" 
                                                        placeholder="Enter your password"
                                                        value={loginData.password}
                                                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                                        required
                                                        style={{
                                                            width: '100%',
                                                            padding: '16px 20px 16px 50px',
                                                            border: '2px solid #e1e5e9',
                                                            borderRadius: '12px',
                                                            fontSize: '16px',
                                                            background: '#fafbfc',
                                                            transition: 'all 0.3s ease',
                                                            fontFamily: "'Jost', sans-serif"
                                                        }}
                                                        onFocus={(e) => {
                                                            e.target.style.borderColor = '#782671'
                                                            e.target.style.background = 'white'
                                                            e.target.style.boxShadow = '0 0 0 4px rgba(120, 38, 113, 0.1)'
                                                        }}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = '#e1e5e9'
                                                            e.target.style.background = '#fafbfc'
                                                            e.target.style.boxShadow = 'none'
                                                        }}
                                                    />
                                                    <i className="fas fa-lock" style={{
                                                        position: 'absolute',
                                                        left: '18px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        color: '#782671',
                                                        fontSize: '16px'
                                                    }}></i>
                                                </div>
                                            </div>

                                            <div className="form-options d-flex align-items-center justify-content-between mb-30" style={{
                                                fontSize: '14px'
                                            }}>
                                                <div className="form-check d-flex align-items-center">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        id="rememberMe"
                                                        style={{
                                                            width: '18px',
                                                            height: '18px',
                                                            marginRight: '8px',
                                                            accentColor: '#782671'
                                                        }}
                                                    />
                                                    <label className="form-check-label" htmlFor="rememberMe" style={{
                                                        color: '#666',
                                                        cursor: 'pointer'
                                                    }}>
                                                        Remember me
                                                    </label>
                                                </div>
                                                <Link href="/" style={{
                                                    color: '#782671',
                                                    textDecoration: 'none',
                                                    fontWeight: '500',
                                                    transition: 'color 0.3s ease'
                                                }}>
                                                    ← Back to Site
                                                </Link>
                                            </div>

                                            <button 
                                                type="submit" 
                                                disabled={isLoading}
                                                style={{
                                                    width: '100%',
                                                    padding: '16px',
                                                    background: isLoading 
                                                        ? 'linear-gradient(135deg, #999 0%, #777 100%)' 
                                                        : 'linear-gradient(135deg, #782671 0%, #9c4a8a 100%)',
                                                    border: 'none',
                                                    borderRadius: '12px',
                                                    color: 'white',
                                                    fontSize: '16px',
                                                    fontWeight: '600',
                                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px',
                                                    fontFamily: "'Jost', sans-serif",
                                                    transform: isLoading ? 'none' : 'translateY(0)',
                                                    boxShadow: isLoading ? 'none' : '0 4px 15px rgba(120, 38, 113, 0.4)'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (!isLoading) {
                                                        e.target.style.transform = 'translateY(-2px)'
                                                        e.target.style.boxShadow = '0 8px 25px rgba(120, 38, 113, 0.5)'
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (!isLoading) {
                                                        e.target.style.transform = 'translateY(0)'
                                                        e.target.style.boxShadow = '0 4px 15px rgba(120, 38, 113, 0.4)'
                                                    }
                                                }}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <i className="fas fa-spinner fa-spin"></i>
                                                        Signing in...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fas fa-sign-in-alt"></i>
                                                        Access Dashboard
                                                    </>
                                                )}
                                            </button>
                                        </form>

                                        {/* Admin Credentials Info */}
                                        <div style={{
                                            marginTop: '30px',
                                            padding: '20px',
                                            background: 'linear-gradient(135deg, #782671 0%, #9c4a8a 100%)',
                                            borderRadius: '15px',
                                            textAlign: 'center',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="7"/%3E%3Ccircle cx="53" cy="53" r="7"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                                                opacity: 0.3
                                            }}></div>
                                            <div style={{ position: 'relative', zIndex: 1 }}>
                                                <div style={{ 
                                                    color: 'white', 
                                                    fontSize: '16px', 
                                                    fontWeight: '600',
                                                    marginBottom: '8px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px'
                                                }}>
                                                    <i className="fas fa-key"></i>
                                                    Default Admin Credentials
                                                </div>
                                                <div style={{ 
                                                    color: 'rgba(255, 255, 255, 0.9)', 
                                                    fontSize: '14px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '15px',
                                                    flexWrap: 'wrap'
                                                }}>
                                                    <span>Username: <strong>admin</strong></span>
                                                    <span>•</span>
                                                    <span>Password: <strong>admin</strong></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}