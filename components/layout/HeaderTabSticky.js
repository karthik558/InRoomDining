'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import CartShow from "../elements/CartShow"
import WishListShow from "../elements/WishListShow"

export default function HeaderTabSticky({ scroll, isMobileMenu, handleMobileMenu, isCartSidebar, handleCartSidebar, hideSearchBar }) {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        // Redirect to the product page with the search query as a URL parameter
        router.push(`/product?query=${encodeURIComponent(searchQuery)}`)
    }

    return (
        <>
            <div
                id="header-tab-sticky"
                className={`tp-md-lg-header d-none d-md-block d-xl-none pt-30 pb-30 ${scroll ? "header-sticky" : ""}`}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 d-flex align-items-center">
                            <div className="header-canvas flex-auto">
                                <button className="tp-menu-toggle" onClick={handleMobileMenu}>
                                    <i className="far fa-bars" />
                                </button>
                            </div>
                            <div className="logo">
                                <Link href="/">
                                    <img src="/assets/img/logo/logo.png" alt="logo" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8">
                            <div className="header-meta-info d-flex align-items-center justify-content-between">
                                {!hideSearchBar && (
                                    <div className="header-search-bar">
                                        <form onSubmit={handleSearchSubmit}>
                                            <div className="search-info p-relative">
                                                <input
                                                    type="text"
                                                    placeholder="Search products..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                                <button type="submit" className="header-search-icon">
                                                    <i className="fal fa-search" />
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                                <div className={`header-meta__social d-flex align-items-center justify-content-end ${hideSearchBar ? 'ml-auto' : 'ml-25'}`}>
                                    <button className="header-cart p-relative tp-cart-toggle" onClick={handleCartSidebar}>
                                        <i className="fal fa-shopping-cart" />
                                        <CartShow />
                                    </button>
                                    {!hideSearchBar && (
                                        <Link href="/sign-in">
                                            <i className="fal fa-user" />
                                        </Link>
                                    )}
                                    <Link href="/wishlist" className="header-cart p-relative tp-cart-toggle">
                                        <i className="fal fa-heart" />
                                        <WishListShow />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}