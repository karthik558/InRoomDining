'use client'
import { useState, useEffect } from 'react'
import productsData from '@/data/products.json'
import '../../../public/assets/css/admin-layout.css'

export default function ProductsPage() {
  const [productsList, setProductsList] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    rating: '',
    priceMin: '',
    priceMax: '',
    imgf: '',
  })

  useEffect(() => {
    setProductsList(productsData)
  }, [])

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProductsList(productsList.filter(prod => prod.id !== id))
      // TODO: Persist deletion via API.
    }
  }

  const handleEditClick = (product) => {
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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Products Management</h2>
        <button className="button button-add" onClick={handleAddClick}>Add New Product</button>
      </div>

      {(editingProduct || isAdding) && (
        <div className="form-container" style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
            {isAdding ? 'Add New Product' : `Edit Product (ID: ${editingProduct.id})`}
          </h3>
          <div className="form-group">
            <label>Title:</label>
            <input type="text" name="title" value={formData.title} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>Rating:</label>
            <input type="number" name="rating" value={formData.rating} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>Price Min:</label>
            <input type="number" name="priceMin" value={formData.priceMin} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>Price Max:</label>
            <input type="number" name="priceMax" value={formData.priceMax} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>Image Filename (icon):</label>
            <input type="text" name="imgf" value={formData.imgf} onChange={handleFormChange} />
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
              <th>Title</th>
              <th>Image</th>
              <th>Rating</th>
              <th>Price Range</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>
                  <img src={`/assets/img/product/${product.imgf}`} alt={product.title} className="product-img" />
                </td>
                <td>{product.rating}</td>
                <td>${product.price.min} - ${product.price.max}</td>
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