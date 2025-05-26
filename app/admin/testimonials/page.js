'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import testimonialsData from '@/data/testimonials.json'
import { checkAdminAuth, hasPermission } from '@/middleware/adminAuth'

export default function TestimonialsPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(null)
  const [testimonialsList, setTestimonialsList] = useState([])
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    text: '',
    icon: '',
  })

  useEffect(() => {
    const user = checkAdminAuth()
    if (!user) {
      router.push('/admin/auth/sign-in')
      return
    }
    
    if (!hasPermission(user, 'testimonials', 'view')) {
      router.push('/admin')
      return
    }
    
    setCurrentUser(user)
    if (testimonialsData) {
      setTestimonialsList(testimonialsData)
    } else {
      console.error('Testimonials data not found')
    }
    setLoading(false)
  }, [router])

  const canEdit = currentUser && hasPermission(currentUser, 'testimonials', 'edit')
  const canDelete = currentUser && hasPermission(currentUser, 'testimonials', 'delete')

  if (loading) {
    return <div className="admin-loading">Loading...</div>
  }

  const handleDelete = (id) => {
    if (!canDelete) return
    if (confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonialsList(testimonialsList.filter(testimonial => testimonial.id !== id))
      // TODO: Persist deletion via API.
    }
  }

  const handleEditClick = (testimonial) => {
    if (!canEdit) return
    setEditingTestimonial(testimonial)
    setIsAdding(false)
    setFormData({
      name: testimonial.name,
      title: testimonial.title,
      text: testimonial.text,
      icon: testimonial.icon,
    })
  }

  const handleAddClick = () => {
    if (!canEdit) return
    setEditingTestimonial(null)
    setIsAdding(true)
    setFormData({
      name: '',
      title: '',
      text: '',
      icon: '',
    })
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCancel = () => {
    setEditingTestimonial(null)
    setIsAdding(false)
    setFormData({
      name: '',
      title: '',
      text: '',
      icon: '',
    })
  }

  const handleSave = () => {
    if (isAdding) {
      const newId = testimonialsList.length > 0 ? Math.max(...testimonialsList.map(t => t.id)) + 1 : 1
      const newTestimonial = {
        id: newId,
        name: formData.name,
        title: formData.title,
        text: formData.text,
        icon: formData.icon,
      }
      setTestimonialsList([...testimonialsList, newTestimonial])
    } else if (editingTestimonial) {
      const updatedTestimonial = {
        ...editingTestimonial,
        name: formData.name,
        title: formData.title,
        text: formData.text,
        icon: formData.icon,
      }
      setTestimonialsList(
        testimonialsList.map(testimonial => testimonial.id === updatedTestimonial.id ? updatedTestimonial : testimonial)
      )
    }
    handleCancel()
    // TODO: Persist changes via API.
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <div className="page-title">
          <h1>
            <i className="fas fa-star"></i>
            Testimonials Management
          </h1>
          <p>Manage customer testimonials and reviews</p>
        </div>
        {canEdit && (
          <button className="btn btn-primary" onClick={handleAddClick}>
            <i className="fas fa-plus"></i>
            Add New Testimonial
          </button>
        )}
      </div>

      {(editingTestimonial || isAdding) && (
        <div className="admin-form-card">
          <div className="card-header">
            <h3>
              <i className={isAdding ? "fas fa-plus" : "fas fa-edit"}></i>
              {isAdding ? 'Add New Testimonial' : `Edit Testimonial (ID: ${editingTestimonial.id})`}
            </h3>
          </div>
          <div className="card-body">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">
                  <i className="fas fa-user"></i>
                  Customer Name
                </label>
                <input 
                  type="text" 
                  id="name"
                  name="name" 
                  value={formData.name} 
                  onChange={handleFormChange}
                  placeholder="Enter customer name"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">
                  <i className="fas fa-briefcase"></i>
                  Title/Position
                </label>
                <input 
                  type="text" 
                  id="title"
                  name="title" 
                  value={formData.title} 
                  onChange={handleFormChange}
                  placeholder="Enter job title or position"
                  className="form-input"
                />
              </div>
              <div className="form-group form-group-full">
                <label htmlFor="text">
                  <i className="fas fa-quote-left"></i>
                  Testimonial Text
                </label>
                <textarea 
                  id="text"
                  name="text" 
                  value={formData.text} 
                  onChange={handleFormChange}
                  placeholder="Enter testimonial content"
                  className="form-input"
                  rows="4"
                />
              </div>
              <div className="form-group form-group-full">
                <label htmlFor="icon">
                  <i className="fas fa-image"></i>
                  Profile Image URL
                </label>
                <input 
                  type="text" 
                  id="icon"
                  name="icon" 
                  value={formData.icon} 
                  onChange={handleFormChange}
                  placeholder="Enter image URL"
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-success" onClick={handleSave}>
                <i className="fas fa-save"></i>
                Save Testimonial
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                <i className="fas fa-times"></i>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-table-card">
        <div className="table-header">
          <h3>
            <i className="fas fa-list"></i>
            Testimonials List
          </h3>
          <div className="table-stats">
            <span className="stat-badge">
              {testimonialsList.length} Testimonials
            </span>
          </div>
        </div>
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Title</th>
                <th>Testimonial</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonialsList && testimonialsList.map(testimonial => (
                <tr key={testimonial.id}>
                  <td>
                    <span className="table-id">#{testimonial.id}</span>
                  </td>
                  <td>
                    <div className="customer-info">
                      <span className="customer-name">{testimonial.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="customer-title">{testimonial.title}</span>
                  </td>
                  <td>
                    <div className="testimonial-text">
                      {testimonial.text.length > 100 
                        ? `${testimonial.text.substring(0, 100)}...`
                        : testimonial.text
                      }
                    </div>
                  </td>
                  <td>
                    <div className="profile-image">
                      <img 
                        src={testimonial.icon} 
                        alt={testimonial.name} 
                        className="table-img"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="table-actions">
                      {canEdit && (
                        <button 
                          onClick={() => handleEditClick(testimonial)} 
                          className="action-btn edit-btn"
                          title="Edit Testimonial"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                      )}
                      {canDelete && (
                        <button 
                          onClick={() => handleDelete(testimonial.id)} 
                          className="action-btn delete-btn"
                          title="Delete Testimonial"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      )}
                      {!canEdit && !canDelete && (
                        <span className="no-permissions">View Only</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {(!testimonialsList || testimonialsList.length === 0) && (
                <tr>
                  <td colSpan="6" className="empty-state">
                    <div className="empty-content">
                      <i className="fas fa-comment-slash"></i>
                      <p>No testimonials found</p>
                      {canEdit && (
                        <button className="btn btn-primary" onClick={handleAddClick}>
                          <i className="fas fa-plus"></i>
                          Add First Testimonial
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}