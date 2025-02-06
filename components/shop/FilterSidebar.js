import CategoryLevel from "../filter/Categories"
import PriceRangeSlider from "../filter/PriceRangeSlider"

const FilterSidebar = () => {
    return (
        <div className="product-sidebar">
            <div className="product-sidebar__widget mb-30">
                <div className="product-sidebar__info product-info-list">
                    <h4 className="product-sidebar__title mb-25">Category</h4>
                    <CategoryLevel />
                </div>
            </div>
            <div className="product-sidebar__widget mb-30">
                <div className="product-sidebar__info product-info-list">
                    <h4 className="product-sidebar__title mb-25">Price Range</h4>
                    <PriceRangeSlider />
                </div>
            </div>
        </div>
    )
}

export default FilterSidebar
