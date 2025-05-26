'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dealProductsData from '@/data/dealproduct.json'
import { checkAdminAuth, hasPermission } from '@/middleware/adminAuth'

export default function DealProductsPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(null)
  const [dealProductsList, setDealProductsList] = useState([])
  const [editingDealProduct, setEditingDealProduct] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    id: '',
    image: '',
    offerPrice: '',
    currentPrice: '',
    originalPrice: '',
    title: '',
    link: '',
    description: '',
    startTime: '',
    endTime: '',
  })

  useEffect(() => {
    const user = checkAdminAuth()
    if (!user) {
      router.push('/admin/auth/sign-in')
      return
    }
    
    if (!hasPermission(user, 'deal_products', 'view')) {
      router.push('/admin')
      return
    }
    
    setCurrentUser(user)
    if (dealProductsData && dealProductsData.product) {
      setDealProductsList([dealProductsData.product])
    } else {
      console.error('Deal products data not found')
    }
    setLoading(false)
  }, [router])

  const canEdit = currentUser && hasPermission(currentUser, 'deal_products', 'edit')
  const canDelete = currentUser && hasPermission(currentUser, 'deal_products', 'delete')

  if (loading) {
    return <div className="admin-loading">Loading...</div>
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this deal product?')) {
      setDealProductsList(dealProductsList.filter(product => product.id !== id))
      // TODO: Persist deletion via API.
    }
  }

  const handleEditClick = (product) => {
    setEditingDealProduct(product)
    setIsAdding(false)
    setFormData({
      id: product.id,
      image: product.image,
      offerPrice: product.offerPrice,
      currentPrice: product.currentPrice,
      originalPrice: product.originalPrice,
      title: product.title,
      link: product.link,
      description: product.description,
      startTime: product.startTime,
      endTime: product.endTime,
    })
  }

  const handleAddClick = () => {
    setEditingDealProduct(null)
    setIsAdding(true)
    setFormData({
      id: '',
      image: '',
      offerPrice: '',
      currentPrice: '',
      originalPrice: '',
      title: '',
      link: '',
      description: '',
      startTime: '',
      endTime: '',
    })
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCancel = () => {
    setEditingDealProduct(null)
    setIsAdding(false)
    setFormData({
      id: '',
      image: '',
      offerPrice: '',
      currentPrice: '',
      originalPrice: '',
      title: '',
      link: '',
      description: '',
      startTime: '',
      endTime: '',
    })
  }

  const handleSave = () => {
    if (isAdding) {
      const newId = dealProductsList.length > 0 ? Math.max(...dealProductsList.map(p => p.id)) + 1 : 1
      const newDealProduct = {
        id: newId,
        image: formData.image,
        offerPrice: formData.offerPrice,
        currentPrice: formData.currentPrice,
        originalPrice: formData.originalPrice,
        title: formData.title,
        link: formData.link,
        description: formData.description,
        startTime: formData.startTime,
        endTime: formData.endTime,
      }
      setDealProductsList([...dealProductsList, newDealProduct])
    } else if (editingDealProduct) {
      const updatedDealProduct = {
        ...editingDealProduct,
        image: formData.image,
        offerPrice: formData.offerPrice,
        currentPrice: formData.currentPrice,
        originalPrice: formData.originalPrice,
        title: formData.title,
        link: formData.link,
        description: formData.description,
        startTime: formData.startTime,
        endTime: formData.endTime,
      }
      setDealProductsList(
        dealProductsList.map(product => product.id === updatedDealProduct.id ? updatedDealProduct : product)
      )
    }
    handleCancel()
    // TODO: Persist changes via API.
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div className="page-title">
          <i className="fas fa-tags"></i>
          <h1>Deal Products Management</h1>
          <p>Manage special deals and promotional products</p>
        </div>
        {canEdit && (
          <button className="admin-btn admin-btn-primary" onClick={handleAddClick}>
            <i className="fas fa-plus"></i>
            Add New Deal Product
          </button>
        )}
      </div>

      {(editingDealProduct || isAdding) && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>
                <i className="fas fa-edit"></i>
                {isAdding ? 'Add New Deal Product' : `Edit Deal Product (ID: ${editingDealProduct.id})`}
              </h2>
              <button className="admin-modal-close" onClick={handleCancel}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="admin-modal-content">
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>
                    <i className="fas fa-image"></i>
                    Image Filename
                  </label>
                  <input 
                    type="text" 
                    name="image" 
                    value={formData.image} 
                    onChange={handleFormChange}
                    placeholder="e.g., product-image.jpg"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>
                    <i className="fas fa-tag"></i>
                    Offer Price
                  </label>
                  <input 
                    type="text" 
                    name="offerPrice" 
                    value={formData.offerPrice} 
                    onChange={handleFormChange}
                    placeholder="e.g., $199.99"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>
                    <i className="fas fa-dollar-sign"></i>
                    Current Price
                  </label>
                  <input 
                    type="text" 
                    name="currentPrice" 
                    value={formData.currentPrice} 
                    onChange={handleFormChange}
                    placeholder="e.g., $299.99"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>
                    <i className="fas fa-money-bill"></i>
                    Original Price
                  </label>
                  <input 
                    type="text" 
                    name="originalPrice" 
                    value={formData.originalPrice} 
                    onChange={handleFormChange}
                    placeholder="e.g., $399.99"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group admin-form-group-full">
                  <label>
                    <i className="fas fa-heading"></i>
                    Title
                  </label>
                  <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleFormChange}
                    placeholder="Product title"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group admin-form-group-full">
                  <label>
                    <i className="fas fa-link"></i>
                    Link
                  </label>
                  <input 
                    type="text" 
                    name="link" 
                    value={formData.link} 
                    onChange={handleFormChange}
                    placeholder="Product link URL"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group admin-form-group-full">
                  <label>
                    <i className="fas fa-align-left"></i>
                    Description
                  </label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleFormChange}
                    placeholder="Product description"
                    className="admin-textarea"
                    rows="4"
                  />
                </div>

                <div className="admin-form-group">
                  <label>
                    <i className="fas fa-play"></i>
                    Start Time
                  </label>
                  <input 
                    type="datetime-local" 
                    name="startTime" 
                    value={formData.startTime} 
                    onChange={handleFormChange}
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>
                    <i className="fas fa-stop"></i>
                    End Time
                  </label>
                  <input 
                    type="datetime-local" 
                    name="endTime" 
                    value={formData.endTime} 
                    onChange={handleFormChange}
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
                {isAdding ? 'Add Deal Product' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-table-container">
        {dealProductsList && dealProductsList.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Prices</th>
                <th>Title</th>
                <th>Deal Period</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dealProductsList.map(product => (
                <tr key={product.id}>
                  <td>
                    <span className="admin-badge admin-badge-info">#{product.id}</span>
                  </td>
                  <td>
                    <div className="product-image-cell">
                      <img src={product.image} alt={product.title} className="admin-product-image" />
                    </div>
                  </td>
                  <td>
                    <div className="price-info">
                      <div className="offer-price">{product.offerPrice}</div>
                      <div className="original-price">{product.originalPrice}</div>
                      <div className="current-price">{product.currentPrice}</div>
                    </div>
                  </td>
                  <td>
                    <div className="product-title">
                      <strong>{product.title}</strong>
                      {product.description && (
                        <p className="product-desc">{product.description.substring(0, 50)}...</p>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="deal-period">
                      <div className="start-time">
                        <i className="fas fa-play"></i>
                        {new Date(product.startTime).toLocaleDateString()}
                      </div>
                      <div className="end-time">
                        <i className="fas fa-stop"></i>
                        {new Date(product.endTime).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      {canEdit && (
                        <button 
                          className="admin-action-btn admin-action-edit" 
                          onClick={() => handleEditClick(product)}
                          title="Edit Deal Product"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                      )}
                      {canDelete && (
                        <button 
                          className="admin-action-btn admin-action-delete" 
                          onClick={() => handleDelete(product.id)}
                          title="Delete Deal Product"
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
            <i className="fas fa-tags"></i>
            <h3>No Deal Products Found</h3>
            <p>Start by adding your first deal product to showcase special offers.</p>
            {canEdit && (
              <button className="admin-btn admin-btn-primary" onClick={handleAddClick}>
                <i className="fas fa-plus"></i>
                Add Your First Deal Product
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}