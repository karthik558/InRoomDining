'use client'
import { addCart } from "@/features/shopSlice"
import { addWishlist } from "@/features/wishlistSlice"
import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import products from "../../data/products"
import {
    addPerPage,
    addSort,
    addprice,
    clearCategory,
} from "../../features/filterSlice"
import { clearCategoryToggle } from "../../features/productSlice"
import ShopCard from "./ShopCard"
import ShopCardList from "./ShopCardList"
import "../../public/assets/css/filter-buttons-spacing.css"

// Accepts an optional "query" prop for filtering items by search term.
const FilterShopBox = ({ query = "" }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { shopList, shopSort } = useSelector((state) => state.filter)
    const { price, category } = shopList || {}
    const { sort, perPage } = shopSort

    const addToCart = (id) => {
        const item = products?.find((item) => item.id === id)
        dispatch(addCart({ product: item }))
    }
    const addToWishlist = (id) => {
        const item = products?.find((item) => item.id === id)
        dispatch(addWishlist({ product: item }))
    }

    const [activeIndex, setActiveIndex] = useState(2)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }

    // Filter functions - Fixed to properly filter by product price
    const priceFilter = (item) => {
        // The actual product price is stored in item.price.max
        const productPrice = item?.price?.max || 0
        return productPrice >= price?.min && productPrice <= price?.max
    }

    const categoryFilter = (item) =>
        category?.length !== 0 && item?.category !== undefined
            ? category?.includes(
                item?.category[0]
                    ?.type.toLocaleLowerCase()
                    .split(" ")
                    .join("-")
            )
            : true

    // New: search filter based on the query.
    const searchQueryFilter = (item) => {
        if (!query.trim()) return true
        return item.title.toLowerCase().includes(query.toLowerCase())
    }

    const sortFilter = (a, b) =>
        sort === "des" ? (a.id > b.id ? -1 : 1) : (a.id < b.id ? -1 : 1)

    // Use slice with undefined as end to show all items by default when perPage.end is 0.
    const sliceEnd = perPage.end !== 0 ? perPage.end : undefined

    // Removed fixed height scrollable container style to improve layout flow
    const scrollableContainerStyle = {
        // Empty style object - our CSS will handle the layout properly
    }

    // Apply all filters including the search query.
    let content = products
        ?.filter(priceFilter)
        ?.filter(categoryFilter)
        ?.filter(searchQueryFilter)
        ?.sort(sortFilter)
        .slice(perPage.start, sliceEnd)
        ?.map((item, i) => (
            <Fragment key={i}>
                <ShopCard
                    item={item}
                    addToCart={addToCart}
                    addToWishlist={addToWishlist}
                    activeIndex={activeIndex}
                    handleOnClick={handleOnClick}
                />
            </Fragment>
        ))

    // Handlers for sort and perPage remain unchanged.
    const sortHandler = (e) => {
        dispatch(addSort(e.target.value))
    }

    const perPageHandler = (e) => {
        const pageData = JSON.parse(e.target.value)
        dispatch(addPerPage(pageData))
    }

    // clearAll now resets filters and also clears the search query from the URL.
    const clearAll = () => {
        // Reset price filter to default range
        dispatch(addprice({ min: 0, max: 2000 }))
        dispatch(clearCategory())
        dispatch(clearCategoryToggle())
        dispatch(addSort(""))
        dispatch(addPerPage({ start: 0, end: 0 }))
        // Clear the search query by replacing the URL without the search parameter.
        router.push('/product')
    }

    return (
        <>
            <div className="product-filter-content mb-40">
                <div className="row align-items-center">
                    <div className="col-sm-6">
                        <div className="product-item-count">
                            <span>
                                <b>{content?.length}</b> Item{content?.length !== 1 && "s"} On List
                            </span>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="product-navtabs d-flex justify-content-end align-items-center">
                            <div className="tp-shop-selector">
                                {(price?.min !== 0 ||
                                    price?.max !== 2000 ||
                                    category?.length !== 0 ||
                                    sort !== "" ||
                                    perPage.start !== 0 ||
                                    perPage.end !== 0 ||
                                    query.trim()) && (
                                        <button
                                            onClick={clearAll}
                                            className="btn btn-danger text-nowrap filter-clear-btn"
                                        >
                                            Clear All
                                        </button>
                                    )}
                                <select
                                    value={sort}
                                    className="chosen-single form-select"
                                    onChange={sortHandler}
                                >
                                    <option value="">Sort by (default)</option>
                                    <option value="asc">Newest</option>
                                    <option value="des">Oldest</option>
                                </select>
                                <select
                                    onChange={perPageHandler}
                                    className="chosen-single form-select ms-3"
                                    value={JSON.stringify(perPage)}
                                >
                                    <option
                                        value={JSON.stringify({
                                            start: 0,
                                            end: 0,
                                        })}
                                    >
                                        All
                                    </option>
                                    <option
                                        value={JSON.stringify({
                                            start: 0,
                                            end: 10,
                                        })}
                                    >
                                        10 per page
                                    </option>
                                    <option
                                        value={JSON.stringify({
                                            start: 0,
                                            end: 20,
                                        })}
                                    >
                                        20 per page
                                    </option>
                                    <option
                                        value={JSON.stringify({
                                            start: 0,
                                            end: 30,
                                        })}
                                    >
                                        30 per page
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="product-view-tabs mb-20">
                <div className="d-flex justify-content-start">
                    <ul className="nav nav-tabs product-tabs" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button 
                                className={`nav-link ${activeIndex === 1 ? 'active' : ''}`}
                                onClick={() => handleOnClick(1)}
                                aria-selected={activeIndex === 1}
                            >
                                <i className="far fa-list mr-5"></i> List View
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button 
                                className={`nav-link ${activeIndex === 2 ? 'active' : ''}`}
                                onClick={() => handleOnClick(2)}
                                aria-selected={activeIndex === 2}
                            >
                                <i className="far fa-th-large mr-5"></i> Grid View
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="row mb-50">
                <div className="col-lg-12">
                    <div className="tab-content" id="nav-tabContent">
                        <div
                            className={
                                activeIndex === 1
                                    ? "tab-pane fade show active"
                                    : "tab-pane fade"
                            }
                        >
                            <div style={scrollableContainerStyle}>
                                {products
                                    ?.filter(priceFilter)
                                    ?.filter(categoryFilter)
                                    ?.filter(searchQueryFilter)
                                    ?.sort(sortFilter)
                                    .slice(perPage.start, sliceEnd)
                                    ?.map((item, i) => (
                                        <Fragment key={i}>
                                            <ShopCardList
                                                item={item}
                                                addToCart={addToCart}
                                                addToWishlist={addToWishlist}
                                            />
                                        </Fragment>
                                    ))}
                            </div>
                        </div>
                        <div
                            className={
                                activeIndex === 2
                                    ? "tab-pane fade show active"
                                    : "tab-pane fade"
                            }
                        >
                            <div className="row row-cols-xxl-4 row-cols-xl-4 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-2 tpproduct" style={scrollableContainerStyle}>
                                {products
                                    ?.filter(priceFilter)
                                    ?.filter(categoryFilter)
                                    ?.filter(searchQueryFilter)
                                    ?.sort(sortFilter)
                                    .slice(perPage.start, sliceEnd)
                                    ?.map((item, i) => (
                                        <Fragment key={i}>
                                            <ShopCard
                                                item={item}
                                                addToCart={addToCart}
                                                addToWishlist={addToWishlist}
                                            />
                                        </Fragment>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FilterShopBox