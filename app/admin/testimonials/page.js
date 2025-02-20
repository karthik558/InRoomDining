'use client'
import { useState, useEffect } from 'react'
import testimonialsData from '@/data/testimonials.json'
import '../../../public/assets/css/admin-layout.css'

export default function TestimonialsPage() {
  const [testimonialsList, setTestimonialsList] = useState([])
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    text: '',
    icon: '',
  })

  useEffect(() => {
    if (testimonialsData) {
      setTestimonialsList(testimonialsData)
    } else {
      // Handle the case where testimonialsData is not available
      console.error('Testimonials data not found')
    }
  }, [])

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonialsList(testimonialsList.filter(testimonial => testimonial.id !== id))
      // TODO: Persist deletion via API.
    }
  }

  const handleEditClick = (testimonial) => {
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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Testimonials Management</h2>
        <button className="button button-add" onClick={handleAddClick}>Add New Testimonial</button>
      </div>

      {(editingTestimonial || isAdding) && (
        <div className="form-container" style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
            {isAdding ? 'Add New Testimonial' : `Edit Testimonial (ID: ${editingTestimonial.id})`}
          </h3>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>Title:</label>
            <input type="text" name="title" value={formData.title} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>Text:</label>
            <textarea name="text" value={formData.text} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>Image Filename (icon):</label>
            <input type="text" name="icon" value={formData.icon} onChange={handleFormChange} />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="button button-save" onClick={handleSave}>Save</button>
            <button className="button button-cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Title</th>
              <th>Text</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonialsList && testimonialsList.map(testimonial => (
              <tr key={testimonial.id}>
                <td>{testimonial.id}</td>
                <td>{testimonial.name}</td>
                <td>{testimonial.title}</td>
                <td>{testimonial.text}</td>
                <td>
                  <img src={testimonial.icon} alt={testimonial.name} className="product-img" />
                </td>
                <td style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleEditClick(testimonial)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#007bff' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(testimonial.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc3545' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}