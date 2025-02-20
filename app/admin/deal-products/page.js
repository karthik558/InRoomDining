'use client'
import { useState, useEffect } from 'react'
import dealProductsData from '@/data/dealproduct.json'
import '../../../public/assets/css/admin-layout.css'

export default function DealProductsPage() {
  const [dealProductsList, setDealProductsList] = useState([])
  const [editingDealProduct, setEditingDealProduct] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
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
    if (dealProductsData && dealProductsData.product) {
      setDealProductsList([dealProductsData.product])
    } else {
      // Handle the case where dealProductsData is not available
      console.error('Deal products data not found')
    }
  }, [])

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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Deal Products Management</h2>
        <button className="button button-add" onClick={handleAddClick}>Add New Deal Product</button>
      </div>

      {(editingDealProduct || isAdding) && (
        <div className="form-container" style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
            {isAdding ? 'Add New Deal Product' : `Edit Deal Product (ID: ${editingDealProduct.id})`}
          </h3>
          <div className="form-group">
            <label>Image Filename:</label>
            <input type="text" name="image" value={formData.image} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>Offer Price:</label>
            <input type="text" name="offerPrice" value={formData.offerPrice} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>Current Price:</label>
            <input type="text" name="currentPrice" value={formData.currentPrice} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>Original Price:</label>
            <input type="text" name="originalPrice" value={formData.originalPrice} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>Title:</label>
            <input type="text" name="title" value={formData.title} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>Link:</label>
            <input type="text" name="link" value={formData.link} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>Start Time:</label>
            <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>End Time:</label>
            <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleFormChange} />
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
              <th>Image</th>
              <th>Offer Price</th>
              <th>Current Price</th>
              <th>Original Price</th>
              <th>Title</th>
              <th>Link</th>
              <th>Description</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dealProductsList && dealProductsList.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img src={product.image} alt={product.title} className="product-img" />
                </td>
                <td>{product.offerPrice}</td>
                <td>{product.currentPrice}</td>
                <td>{product.originalPrice}</td>
                <td>{product.title}</td>
                <td>{product.link}</td>
                <td>{product.description}</td>
                <td>{new Date(product.startTime).toLocaleString()}</td>
                <td>{new Date(product.endTime).toLocaleString()}</td>
                <td style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleEditClick(product)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#007bff' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(product.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc3545' }}>
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