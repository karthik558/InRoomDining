'use client'
import { useState, useEffect } from 'react'
import sliderProductsData from '@/data/sliderproduct.json'
import '../../../public/assets/css/admin-layout.css'

export default function SliderProductsPage() {
  const [sliderProductsList, setSliderProductsList] = useState([])
  const [editingSliderProduct, setEditingSliderProduct] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    subTitle: '',
    title: '',
    link: '',
    buttonText: '',
    image: '',
  })

  useEffect(() => {
    if (sliderProductsData && sliderProductsData.slides) {
      setSliderProductsList(sliderProductsData.slides)
    } else {
      // Handle the case where sliderProductsData is not available
      console.error('Slider products data not found')
    }
  }, [])

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this slider product?')) {
      setSliderProductsList(sliderProductsList.filter(slide => slide.id !== id))
      // TODO: Persist deletion via API.
    }
  }

  const handleEditClick = (slide) => {
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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Slider Products Management</h2>
        <button className="button button-add" onClick={handleAddClick}>Add New Slider Product</button>
      </div>

      {(editingSliderProduct || isAdding) && (
        <div className="form-container" style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
            {isAdding ? 'Add New Slider Product' : `Edit Slider Product (ID: ${editingSliderProduct.id})`}
          </h3>
          <div className="form-group">
            <label>Sub Title:</label>
            <input type="text" name="subTitle" value={formData.subTitle} onChange={handleFormChange} />
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
            <label>Button Text:</label>
            <input type="text" name="buttonText" value={formData.buttonText} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>Image Filename:</label>
            <input type="text" name="image" value={formData.image} onChange={handleFormChange} />
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
              <th>Sub Title</th>
              <th>Title</th>
              <th>Link</th>
              <th>Button Text</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sliderProductsList && sliderProductsList.map(slide => (
              <tr key={slide.id}>
                <td>{slide.id}</td>
                <td>{slide.subTitle}</td>
                <td>{slide.title}</td>
                <td>{slide.link}</td>
                <td>{slide.buttonText}</td>
                <td>
                  <img src={slide.image} alt={slide.title} className="product-img" />
                </td>
                <td style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleEditClick(slide)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#007bff' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(slide.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc3545' }}>
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