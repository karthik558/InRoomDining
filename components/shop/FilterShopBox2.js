'use client'
import { addCart } from "@/features/shopSlice"
import { addWishlist } from "@/features/wishlistSlice"
import { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import products from "../../data/products"
import {
    addPerPage,
    addSort,
    addprice,
    clearCategory,
} from "../../features/filterSlice"
import {
    clearCategoryToggle,
} from "../../features/productSlice"
import ShopCard from "./ShopCard"

const FilterShopBox2 = ({ itemStart, itemEnd }) => {
    const { shopList, shopSort } = useSelector((state) => state.filter)
    const {
        price,
        category,
    } = shopList || {}

    const { sort, perPage } = shopSort

    const dispatch = useDispatch()

    const addToCart = (id) => {
        const item = products?.find((item) => item.id === id)
        dispatch(addCart({ product: item }))
    }

    const addToWishlist = (id) => {
        const item = products?.find((item) => item.id === id)
        dispatch(addWishlist({ product: item }))
    }


    // price filter - Fixed to properly filter by product price
    const priceFilter = (item) => {
        // The actual product price is stored in item.price.max
        const productPrice = item?.price?.max || 0
        return productPrice >= price?.min && productPrice <= price?.max
    }

    // // product-type filter



    // product-type filter
    const categoryFilter = (item) =>
        category?.length !== 0 && item?.category !== undefined ? category?.includes(item?.category[0]?.type.toLocaleLowerCase().split(" ").join("-")) : item

    // sort filter
    const sortFilter = (a, b) =>
        sort === "des" ? a.id > b.id && -1 : a.id < b.id && -1

    let content = products.slice(itemStart, itemEnd)
        ?.filter(priceFilter)

        ?.filter(categoryFilter)
        ?.sort(sortFilter).slice(perPage.start, perPage.end !== 0 ? perPage.end : 10)?.map((item, i) => (
            <Fragment key={i}>
                <ShopCard item={item} addToCart={addToCart} addToWishlist={addToWishlist} />
            </Fragment>
            // End all products
        ))

    // sort handler
    const sortHandler = (e) => {
        dispatch(addSort(e.target.value))
    }

    // per page handler
    const perPageHandler = (e) => {
        const pageData = JSON.parse(e.target.value)
        dispatch(addPerPage(pageData))
    }

    // clear all filters
    const clearAll = () => {
        dispatch(addprice({ min: 0, max: 2000 }))




        dispatch(clearCategory())
        dispatch(clearCategoryToggle())

        dispatch(addSort(""))
        dispatch(addPerPage({ start: 0, end: 0 }))
    }


    return (
        <>
            {content}

        </>
    )
}

export default FilterShopBox2
