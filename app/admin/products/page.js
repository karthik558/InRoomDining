'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import productsData from '@/data/products.json'
import { checkAdminAuth, hasPermission } from '@/middleware/adminAuth'

export default function ProductsPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(null)
  const [productsList, setProductsList] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    rating: '',
    priceMin: '',
    priceMax: '',
    imgf: '',
  })

  useEffect(() => {
    const user = checkAdminAuth()
    if (!user) {
      router.push('/admin/auth/sign-in')
      return
    }
    
    if (!hasPermission(user, 'products', 'view')) {
      router.push('/admin')
      return
    }
    
    setCurrentUser(user)
    setProductsList(productsData)
    setLoading(false)
  }, [router])

  const canEdit = currentUser && hasPermission(currentUser, 'products', 'edit')
  const canDelete = currentUser && hasPermission(currentUser, 'products', 'delete')

  if (loading) {
    return <div className="admin-loading">Loading...</div>
  }

  const handleDelete = (id) => {
    if (!canDelete) return
    if (confirm('Are you sure you want to delete this product?')) {
      setProductsList(productsList.filter(prod => prod.id !== id))
      // TODO: Persist deletion via API.
    }
  }

  const handleEditClick = (product) => {
    if (!canEdit) return
    setEditingProduct(product)
    setIsAdding(false)
    setFormData({
      title: product.title,
      rating: product.rating,
      priceMin: product.price.min,
      priceMax: product.price.max,
      imgf: product.imgf,
    })
  }

  const handleAddClick = () => {
    if (!canEdit) return
    setEditingProduct(null)
    setIsAdding(true)
    setFormData({
      title: '',
      rating: '',
      priceMin: '',
      priceMax: '',
      imgf: '',
    })
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCancel = () => {
    setEditingProduct(null)
    setIsAdding(false)
    setFormData({
      title: '',
      rating: '',
      priceMin: '',
      priceMax: '',
      imgf: '',
    })
  }

  const handleSave = () => {
    if (isAdding) {
      const newId = productsList.length > 0 ? Math.max(...productsList.map(p => p.id)) + 1 : 1
      const newProduct = {
        id: newId,
        title: formData.title,
        rating: Number(formData.rating),
        price: { min: Number(formData.priceMin), max: Number(formData.priceMax) },
        imgf: formData.imgf,
      }
      setProductsList([...productsList, newProduct])
    } else if (editingProduct) {
      const updatedProduct = {
        ...editingProduct,
        title: formData.title,
        rating: Number(formData.rating),
        price: { min: Number(formData.priceMin), max: Number(formData.priceMax) },
        imgf: formData.imgf,
      }
      setProductsList(
        productsList.map(prod => prod.id === updatedProduct.id ? updatedProduct : prod)
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
            <i className="fas fa-box"></i>
            Products Management
          </h1>
          <p>Manage your product catalog</p>
        </div>
        {canEdit && (
          <button className="btn btn-primary" onClick={handleAddClick}>
            <i className="fas fa-plus"></i>
            Add New Product
          </button>
        )}
      </div>

      {(editingProduct || isAdding) && (
        <div className="admin-form-card">
          <div className="card-header">
            <h3>
              <i className={isAdding ? "fas fa-plus" : "fas fa-edit"}></i>
              {isAdding ? 'Add New Product' : `Edit Product (ID: ${editingProduct.id})`}
            </h3>
          </div>
          <div className="card-body">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title">
                  <i className="fas fa-tag"></i>
                  Product Title
                </label>
                <input 
                  type="text" 
                  id="title"
                  name="title" 
                  value={formData.title} 
                  onChange={handleFormChange}
                  placeholder="Enter product title"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="rating">
                  <i className="fas fa-star"></i>
                  Rating
                </label>
                <input 
                  type="number" 
                  id="rating"
                  name="rating" 
                  value={formData.rating} 
                  onChange={handleFormChange}
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="0.0"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="priceMin">
                  <i className="fas fa-dollar-sign"></i>
                  Minimum Price
                </label>
                <input 
                  type="number" 
                  id="priceMin"
                  name="priceMin" 
                  value={formData.priceMin} 
                  onChange={handleFormChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="priceMax">
                  <i className="fas fa-dollar-sign"></i>
                  Maximum Price
                </label>
                <input 
                  type="number" 
                  id="priceMax"
                  name="priceMax" 
                  value={formData.priceMax} 
                  onChange={handleFormChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="form-input"
                />
              </div>
              <div className="form-group form-group-full">
                <label htmlFor="imgf">
                  <i className="fas fa-image"></i>
                  Image Filename
                </label>
                <input 
                  type="text" 
                  id="imgf"
                  name="imgf" 
                  value={formData.imgf} 
                  onChange={handleFormChange}
                  placeholder="product-image.jpg"
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-success" onClick={handleSave}>
                <i className="fas fa-save"></i>
                Save Product
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
            Products List
          </h3>
          <div className="table-stats">
            <span className="stat-badge">
              {productsList.length} Products
            </span>
          </div>
        </div>
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Image</th>
                <th>Rating</th>
                <th>Price Range</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {productsList.map(product => (
                <tr key={product.id}>
                  <td>
                    <span className="table-id">#{product.id}</span>
                  </td>
                  <td>
                    <div className="product-info">
                      <span className="product-title">{product.title}</span>
                    </div>
                  </td>
                  <td>
                    <div className="product-image">
                      <img 
                        src={`/assets/img/product/${product.imgf}`} 
                        alt={product.title} 
                        className="table-img"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="rating-display">
                      <i className="fas fa-star"></i>
                      <span>{product.rating}</span>
                    </div>
                  </td>
                  <td>
                    <span className="price-range">
                      ${product.price.min} - ${product.price.max}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      {canEdit && (
                        <button 
                          onClick={() => handleEditClick(product)} 
                          className="action-btn edit-btn"
                          title="Edit Product"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                      )}
                      {canDelete && (
                        <button 
                          onClick={() => handleDelete(product.id)} 
                          className="action-btn delete-btn"
                          title="Delete Product"
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
              {productsList.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-state">
                    <div className="empty-content">
                      <i className="fas fa-box-open"></i>
                      <p>No products found</p>
                      {canEdit && (
                        <button className="btn btn-primary" onClick={handleAddClick}>
                          <i className="fas fa-plus"></i>
                          Add First Product
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