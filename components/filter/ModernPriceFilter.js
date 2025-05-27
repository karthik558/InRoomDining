'use client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addprice } from "../../features/filterSlice"

const ModernPriceFilter = () => {
    const { shopList } = useSelector((state) => state.filter)
    
    const [minPrice, setMinPrice] = useState(shopList.price.min)
    const [maxPrice, setMaxPrice] = useState(shopList.price.max)
    const [tempMin, setTempMin] = useState(shopList.price.min)
    const [tempMax, setTempMax] = useState(shopList.price.max)

    const dispatch = useDispatch()

    // Apply price filter
    const applyPriceFilter = () => {
        const min = Math.max(0, parseInt(tempMin) || 0)
        const max = Math.min(2000, parseInt(tempMax) || 2000)
        
        if (min <= max) {
            setMinPrice(min)
            setMaxPrice(max)
            dispatch(addprice({ min, max }))
        }
    }

    // Reset price filter
    const resetPriceFilter = () => {
        setTempMin(0)
        setTempMax(2000)
        setMinPrice(0)
        setMaxPrice(2000)
        dispatch(addprice({ min: 0, max: 2000 }))
    }

    useEffect(() => {
        setMinPrice(shopList.price.min)
        setMaxPrice(shopList.price.max)
        setTempMin(shopList.price.min)
        setTempMax(shopList.price.max)
    }, [shopList])

    return (
        <div className="modern-price-filter">
            <div className="price-range-display">
                <span className="price-label">Price Range:</span>
                <span className="current-range">₹{minPrice} - ₹{maxPrice}</span>
            </div>
            
            <div className="price-inputs">
                <div className="price-input-group">
                    <label htmlFor="min-price">Min</label>
                    <div className="input-wrapper">
                        <span className="currency">₹</span>
                        <input
                            id="min-price"
                            type="number"
                            min="0"
                            max="2000"
                            value={tempMin}
                            onChange={(e) => setTempMin(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    applyPriceFilter()
                                }
                            }}
                            placeholder="0"
                        />
                    </div>
                </div>
                
                <div className="price-separator">-</div>
                
                <div className="price-input-group">
                    <label htmlFor="max-price">Max</label>
                    <div className="input-wrapper">
                        <span className="currency">₹</span>
                        <input
                            id="max-price"
                            type="number"
                            min="0"
                            max="2000"
                            value={tempMax}
                            onChange={(e) => setTempMax(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    applyPriceFilter()
                                }
                            }}
                            placeholder="2000"
                        />
                    </div>
                </div>
            </div>
            
            <div className="price-actions">
                <button 
                    type="button" 
                    className="apply-btn"
                    onClick={applyPriceFilter}
                >
                    Apply
                </button>
                <button 
                    type="button" 
                    className="reset-btn"
                    onClick={resetPriceFilter}
                >
                    Reset
                </button>
            </div>
            
            <div className="price-presets">
                <button 
                    type="button" 
                    className="preset-btn"
                    onClick={() => {
                        setTempMin(0)
                        setTempMax(500)
                        setMinPrice(0)
                        setMaxPrice(500)
                        dispatch(addprice({ min: 0, max: 500 }))
                    }}
                >
                    Under ₹500
                </button>
                <button 
                    type="button" 
                    className="preset-btn"
                    onClick={() => {
                        setTempMin(500)
                        setTempMax(1000)
                        setMinPrice(500)
                        setMaxPrice(1000)
                        dispatch(addprice({ min: 500, max: 1000 }))
                    }}
                >
                    ₹500 - ₹1000
                </button>
                <button 
                    type="button" 
                    className="preset-btn"
                    onClick={() => {
                        setTempMin(1000)
                        setTempMax(2000)
                        setMinPrice(1000)
                        setMaxPrice(2000)
                        dispatch(addprice({ min: 1000, max: 2000 }))
                    }}
                >
                    Above ₹1000
                </button>
            </div>
        </div>
    )
}

export default ModernPriceFilter
