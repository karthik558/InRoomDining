'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import CartShow from "../elements/CartShow"
import WishListShow from "../elements/WishListShow"

export default function HeaderSticky({ scroll, isCartSidebar, handleCartSidebar }) {
    
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
            <div id="header-sticky" className={`logo-area tp-sticky-one mainmenu-5 ${scroll ? "header-sticky" : ""}`}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-2 col-lg-3">
                            <div className="logo" style={{ marginTop: '20px', marginLeft: '10px' }}>
                                <Link href="/"><img src="/assets/img/logo/logo.png" alt="logo" style={{ width: '150px', height: 'auto' }} /></Link>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="main-menu">
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-9">
                            <div className="header-meta-info d-flex align-items-center justify-content-end">
                                <div className="header-meta__social  d-flex align-items-center">
                                    <button className="header-cart p-relative tp-cart-toggle" onClick={handleCartSidebar}>
                                        <i className="fal fa-shopping-cart" />
                                        <CartShow />
                                    </button>
                                    <Link href="/sign-in"><i className="fal fa-user" /></Link>
                                    <Link href="/wishlist" className="header-cart p-relative tp-cart-toggle">
                                        <i className="fal fa-heart" />
                                        <WishListShow />
                                    </Link>
                                </div>
                                <div className="header-meta__search-5 ml-25">
                                    <div className="header-search-bar-5">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
