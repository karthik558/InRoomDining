'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import sliderProductsData from '@/data/sliderproduct.json'
import { checkAdminAuth, hasPermission } from '@/middleware/adminAuth'

export default function SliderProductsPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(null)
  const [sliderProductsList, setSliderProductsList] = useState([])
  const [editingSliderProduct, setEditingSliderProduct] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    id: '',
    subTitle: '',
    title: '',
    link: '',
    buttonText: '',
    image: '',
  })

  useEffect(() => {
    const user = checkAdminAuth()
    if (!user) {
      router.push('/admin/auth/sign-in')
      return
    }
    
    if (!hasPermission(user, 'slider_products', 'view')) {
      router.push('/admin')
      return
    }
    
    setCurrentUser(user)
    if (sliderProductsData && sliderProductsData.slides) {
      setSliderProductsList(sliderProductsData.slides)
    } else {
      console.error('Slider products data not found')
    }
    setLoading(false)
  }, [router])

  const canEdit = currentUser && hasPermission(currentUser, 'slider_products', 'edit')
  const canDelete = currentUser && hasPermission(currentUser, 'slider_products', 'delete')

  if (loading) {
    return <div className="admin-loading">Loading...</div>
  }

  const handleDelete = (id) => {
    if (!canDelete) return
    if (confirm('Are you sure you want to delete this slider product?')) {
      setSliderProductsList(sliderProductsList.filter(slide => slide.id !== id))
      // TODO: Persist deletion via API.
    }
  }

  const handleEditClick = (slide) => {
    if (!canEdit) return
    setEditingSliderProduct(slide)
    setIsAdding(false)
    setFormData({
      id: slide.id,
      subTitle: slide.subTitle,
      title: slide.title,
      link: slide.link,
      buttonText: slide.buttonText,
      image: slide.image,
    })
  }

  const handleAddClick = () => {
    if (!canEdit) return
    setEditingSliderProduct(null)
    setIsAdding(true)
    setFormData({
      id: '',
      subTitle: '',
      title: '',
      link: '',
      buttonText: '',
      image: '',
    })
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCancel = () => {
    setEditingSliderProduct(null)
    setIsAdding(false)
    setFormData({
      id: '',
      subTitle: '',
      title: '',
      link: '',
      buttonText: '',
      image: '',
    })
  }

  const handleSave = () => {
    if (isAdding) {
      const newId = sliderProductsList.length > 0 ? Math.max(...sliderProductsList.map(s => s.id)) + 1 : 1
      const newSliderProduct = {
        id: newId,
        subTitle: formData.subTitle,
        title: formData.title,
        link: formData.link,
        buttonText: formData.buttonText,
        image: formData.image,
      }
      setSliderProductsList([...sliderProductsList, newSliderProduct])
    } else if (editingSliderProduct) {
      const updatedSliderProduct = {
        ...editingSliderProduct,
        subTitle: formData.subTitle,
        title: formData.title,
        link: formData.link,
        buttonText: formData.buttonText,
        image: formData.image,
      }
      setSliderProductsList(
        sliderProductsList.map(slide => slide.id === updatedSliderProduct.id ? updatedSliderProduct : slide)
      )
    }
    handleCancel()
    // TODO: Persist changes via API.
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div className="page-title">
          <i className="fas fa-images"></i>
          <h1>Slider Products Management</h1>
          <p>Manage homepage slider content and banners</p>
        </div>
        {canEdit && (
          <button className="admin-btn admin-btn-primary" onClick={handleAddClick}>
            <i className="fas fa-plus"></i>
            Add New Slider
          </button>
        )}
      </div>

      {(editingSliderProduct || isAdding) && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>
                <i className="fas fa-edit"></i>
                {isAdding ? 'Add New Slider Product' : `Edit Slider Product (ID: ${editingSliderProduct.id})`}
              </h2>
              <button className="admin-modal-close" onClick={handleCancel}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="admin-modal-content">
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>
                    <i className="fas fa-text-height"></i>
                    Sub Title
                  </label>
                  <input 
                    type="text" 
                    name="subTitle" 
                    value={formData.subTitle} 
                    onChange={handleFormChange}
                    placeholder="e.g., Special Offer"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>
                    <i className="fas fa-heading"></i>
                    Title
                  </label>
                  <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleFormChange}
                    placeholder="Main slider title"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>
                    <i className="fas fa-link"></i>
                    Link URL
                  </label>
                  <input 
                    type="text" 
                    name="link" 
                    value={formData.link} 
                    onChange={handleFormChange}
                    placeholder="Destination URL"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>
                    <i className="fas fa-mouse-pointer"></i>
                    Button Text
                  </label>
                  <input 
                    type="text" 
                    name="buttonText" 
                    value={formData.buttonText} 
                    onChange={handleFormChange}
                    placeholder="e.g., Shop Now"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group admin-form-group-full">
                  <label>
                    <i className="fas fa-image"></i>
                    Image Filename
                  </label>
                  <input 
                    type="text" 
                    name="image" 
                    value={formData.image} 
                    onChange={handleFormChange}
                    placeholder="e.g., slider-banner.jpg"
                    className="admin-input"
                  />
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={handleCancel}>
                <i className="fas fa-times"></i>
                Cancel
              </button>
              <button className="admin-btn admin-btn-primary" onClick={handleSave}>
                <i className="fas fa-save"></i>
                {isAdding ? 'Add Slider' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-table-container">
        {sliderProductsList && sliderProductsList.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Preview</th>
                <th>Content</th>
                <th>Call to Action</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sliderProductsList.map(slide => (
                <tr key={slide.id}>
                  <td>
                    <span className="admin-badge admin-badge-info">#{slide.id}</span>
                  </td>
                  <td>
                    <div className="slider-preview">
                      <img src={slide.image} alt={slide.title} className="admin-slider-image" />
                    </div>
                  </td>
                  <td>
                    <div className="slider-content">
                      <div className="slider-subtitle">{slide.subTitle}</div>
                      <div className="slider-title">{slide.title}</div>
                    </div>
                  </td>
                  <td>
                    <div className="slider-cta">
                      <div className="cta-button">{slide.buttonText}</div>
                      <div className="cta-link">
                        <i className="fas fa-external-link-alt"></i>
                        {slide.link ? slide.link.substring(0, 30) + '...' : 'No link'}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      {canEdit && (
                        <button 
                          className="admin-action-btn admin-action-edit" 
                          onClick={() => handleEditClick(slide)}
                          title="Edit Slider"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                      )}
                      {canDelete && (
                        <button 
                          className="admin-action-btn admin-action-delete" 
                          onClick={() => handleDelete(slide.id)}
                          title="Delete Slider"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="admin-empty-state">
            <i className="fas fa-images"></i>
            <h3>No Slider Products Found</h3>
            <p>Create your first slider to showcase featured content on the homepage.</p>
            {canEdit && (
              <button className="admin-btn admin-btn-primary" onClick={handleAddClick}>
                <i className="fas fa-plus"></i>
                Add Your First Slider
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}