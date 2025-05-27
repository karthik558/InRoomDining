'use client'
import CategoryLevel from "../filter/Categories"
import ModernPriceFilter from "../filter/ModernPriceFilter"
import '../../public/assets/css/slider-dots-fix.css'
import '../../public/assets/css/category-checkbox-fix.css'
import '../../public/assets/css/modern-price-filter.css'

const FilterSidebar = () => {
    return (
        <div className="product-sidebar">
            <div className="filter-header d-lg-none">
                <h3>Filter Products</h3>
            </div>
            <div className="product-sidebar__widget mb-30">
                <div className="product-sidebar__info product-info-list">
                    <h4 className="product-sidebar__title mb-25">Category</h4>
                    <CategoryLevel />
                </div>
            </div>
            <div className="product-sidebar__widget mb-30">
                <div className="product-sidebar__info product-info-list">
                    <h4 className="product-sidebar__title mb-25">Price Range</h4>
                    <ModernPriceFilter />
                </div>
            </div>
        </div>
    )
}

export default FilterSidebar
