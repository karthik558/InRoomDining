'use client'

export const checkAdminAuth = () => {
  if (typeof window !== 'undefined') {
    const currentUser = localStorage.getItem('currentAdminUser')
    return currentUser ? JSON.parse(currentUser) : null
  }
  return null
}

export const hasPermission = (user, module, action = 'view') => {
  if (!user) return false
  if (user.role === 'super_admin') return true
  
  const permissions = user.permissions
  if (!permissions || !permissions[module]) return false
  
  return permissions[module][action] || false
}

export const requireAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const user = checkAdminAuth()
    
    if (!user) {
      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/auth/sign-in'
      }
      return null
    }
    
    return <WrappedComponent {...props} currentUser={user} />
  }
}

export const requirePermission = (module, action = 'view') => {
  return (WrappedComponent) => {
    return function PermissionProtectedComponent(props) {
      const user = checkAdminAuth()
      
      if (!user) {
        if (typeof window !== 'undefined') {
          window.location.href = '/admin/auth/sign-in'
        }
        return null
      }
      
      if (!hasPermission(user, module, action)) {
        return (
          <div className="admin-unauthorized">
            <div className="admin-unauthorized-content">
              <i className="fas fa-lock" style={{fontSize: '3rem'}}></i>
              <h2>Access Denied</h2>
              <p>You don't have permission to access this page.</p>
            </div>
          </div>
        )
      }
      
      return <WrappedComponent {...props} currentUser={user} />
    }
  }
}
