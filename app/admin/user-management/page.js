'use client'
import { useState, useEffect } from 'react'

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'view_only',
    permissions: ['view'],
    status: 'active'
  })
  const [currentUser, setCurrentUser] = useState(null)

  const roles = {
    super_admin: {
      label: 'Super Admin',
      permissions: ['view', 'edit', 'delete', 'manage_users'],
      color: '#ef4444'
    },
    admin: {
      label: 'Admin',
      permissions: ['view', 'edit', 'delete'],
      color: '#f59e0b'
    },
    editor: {
      label: 'Editor',
      permissions: ['view', 'edit'],
      color: '#10b981'
    },
    view_only: {
      label: 'View Only',
      permissions: ['view'],
      color: '#6b7280'
    }
  }

  const modules = [
    { key: 'products', label: 'Products' },
    { key: 'deal_products', label: 'Deal Products' },
    { key: 'slider_products', label: 'Slider Products' },
    { key: 'testimonials', label: 'Testimonials' },
    { key: 'users', label: 'User Management' }
  ]

  useEffect(() => {
    // Load current user
    const user = localStorage.getItem('currentAdminUser')
    if (user) {
      const auth = JSON.parse(user)
      setCurrentUser(auth)
      
      // Load users from localStorage
      const savedUsers = JSON.parse(localStorage.getItem('adminUsers') || '[]')
      setUsers(savedUsers)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingUser) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === editingUser.id 
          ? { ...formData, id: editingUser.id, createdAt: editingUser.createdAt, updatedAt: new Date().toISOString() }
          : user
      )
      setUsers(updatedUsers)
      localStorage.setItem('adminUsers', JSON.stringify(updatedUsers))
    } else {
      // Add new user
      const newUser = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      const updatedUsers = [...users, newUser]
      setUsers(updatedUsers)
      localStorage.setItem('adminUsers', JSON.stringify(updatedUsers))
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
      role: 'view_only',
      permissions: ['view'],
      status: 'active'
    })
    setIsAdding(false)
    setEditingUser(null)
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setIsAdding(false)
    setFormData({
      username: user.username,
      password: user.password,
      role: user.role,
      permissions: user.permissions,
      status: user.status
    })
  }

  const handleDelete = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(user => user.id !== userId)
      setUsers(updatedUsers)
      localStorage.setItem('adminUsers', JSON.stringify(updatedUsers))
    }
  }

  const handleRoleChange = (role) => {
    setFormData(prev => ({
      ...prev,
      role,
      permissions: roles[role].permissions
    }))
  }

  const handlePermissionChange = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }))
  }

  // Check if current user can manage users
  if (!currentUser || (currentUser.role !== 'super_admin' && currentUser.role !== 'admin')) {
    return (
      <div className="admin-unauthorized">
        <div className="admin-unauthorized-content">
          <i className="fas fa-lock fa-3x"></i>
          <h2>Access Denied</h2>
          <p>You don't have permission to access user management. Only admins and super admins can manage users.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-content">
      <div className="admin-content-header">
        <h1>User Management</h1>
        <button 
          className="admin-btn admin-btn-primary"
          onClick={() => setIsAdding(true)}
        >
          <i className="fas fa-plus"></i>
          Add New User
        </button>
      </div>

      {/* User Form */}
      {(isAdding || editingUser) && (
        <div className="admin-card admin-form-card">
          <div className="admin-card-header">
            <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
            <button 
              className="admin-btn admin-btn-ghost"
              onClick={resetForm}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  required
                />
              </div>
              
              <div className="admin-form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => handleRoleChange(e.target.value)}
                >
                  {Object.entries(roles).map(([key, role]) => (
                    <option key={key} value={key}>{role.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="admin-form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="admin-form-group">
              <label>Permissions</label>
              <div className="admin-permissions-grid">
                {['view', 'edit', 'delete', 'manage_users'].map(permission => (
                  <label key={permission} className="admin-checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(permission)}
                      onChange={() => handlePermissionChange(permission)}
                    />
                    <span className="admin-checkbox-text">
                      {permission.replace('_', ' ').toUpperCase()}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="admin-btn admin-btn-primary">
                <i className="fas fa-save"></i>
                {editingUser ? 'Update User' : 'Create User'}
              </button>
              <button 
                type="button" 
                className="admin-btn admin-btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>All Users</h3>
          <span className="admin-badge admin-badge-info">{users.length} users</span>
        </div>
        
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Permissions</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="admin-user-info">
                    <div className="admin-user-avatar">
                      <i className="fas fa-crown"></i>
                    </div>
                    <strong>admin</strong>
                  </div>
                </td>
                <td>
                  <span 
                    className="admin-role-badge" 
                    style={{ backgroundColor: roles.super_admin.color }}
                  >
                    Super Admin
                  </span>
                </td>
                <td>
                  <div className="admin-permissions-list">
                    {roles.super_admin.permissions.map(perm => (
                      <span key={perm} className="admin-permission-tag">
                        {perm}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <span className="admin-status-badge admin-status-active">
                    Active
                  </span>
                </td>
                <td>Default</td>
                <td>
                  <span className="admin-table-note">Default Admin</span>
                </td>
              </tr>
              
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="admin-user-info">
                      <div className="admin-user-avatar">
                        <i className="fas fa-user"></i>
                      </div>
                      {user.username}
                    </div>
                  </td>
                  <td>
                    <span 
                      className="admin-role-badge" 
                      style={{ backgroundColor: roles[user.role]?.color }}
                    >
                      {roles[user.role]?.label}
                    </span>
                  </td>
                  <td>
                    <div className="admin-permissions-list">
                      {user.permissions.map(perm => (
                        <span key={perm} className="admin-permission-tag">
                          {perm}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`admin-status-badge admin-status-${user.status}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="admin-table-actions">
                      <button
                        className="admin-btn admin-btn-sm admin-btn-ghost"
                        onClick={() => handleEdit(user)}
                        title="Edit User"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="admin-btn admin-btn-sm admin-btn-danger"
                        onClick={() => handleDelete(user.id)}
                        title="Delete User"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {users.length === 0 && (
            <div className="admin-empty-state">
              <i className="fas fa-users fa-3x"></i>
              <h3>No Users Found</h3>
              <p>Create your first user to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
