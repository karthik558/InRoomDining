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

    // Filter functions
    const priceFilter = (item) =>
        item?.price?.min >= price?.min && item?.price?.max <= price?.max

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

    // Updated scrollable container style to improve scrolling behavior.
    const scrollableContainerStyle = {
        maxHeight: '600px',
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS devices
        scrollBehavior: 'smooth',
        paddingRight: '15px'
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
        dispatch(addprice({ min: 0, max: 100 }))
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
                                    price?.max !== 100 ||
                                    category?.length !== 0 ||
                                    sort !== "" ||
                                    perPage.start !== 0 ||
                                    perPage.end !== 0 ||
                                    query.trim()) && (
                                        <button
                                            onClick={clearAll}
                                            className="btn btn-danger text-nowrap me-2"
                                            style={{ minHeight: "45px", marginBottom: "15px" }}
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
                            <div className="row row-cols-xxl-4 row-cols-xl-4 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1 tpproduct" style={scrollableContainerStyle}>
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