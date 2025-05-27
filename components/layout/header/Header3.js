'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import CartShow from "@/components/elements/CartShow"
import WishListShow from "@/components/elements/WishListShow"
import Link from "next/link"
import HeaderMobSticky from "../HeaderMobSticky"
import HeaderSticky from "../HeaderSticky"
import HeaderTabSticky from "../HeaderTabSticky"

export default function Header1({ scroll, isMobileMenu, handleMobileMenu, isCartSidebar, handleCartSidebar, hideSearchBar }) {
    const router = useRouter()
    const [isToggled, setToggled] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const handleToggle = () => setToggled(!isToggled)

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        // Redirect to the product page with the search query as a URL parameter
        router.push(`/product?query=${encodeURIComponent(searchQuery)}`)
    }

    return (
        <>
            <header>
                <div className="logo-area mt-30 d-none d-xl-block">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-2 col-lg-3">
                                <div className="logo">
                                    <Link href="/">
                                        <img src="/assets/img/logo/logo.png" alt="logo" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-10 col-lg-9">
                                <div className={`header-meta-info d-flex align-items-center ${hideSearchBar ? 'justify-content-end' : 'justify-content-between'}`}>
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
                                    <div className={`header-meta header-brand d-flex align-items-center justify-content-end ${hideSearchBar ? 'ml-auto' : ''}`}>
                                        <div className="header-meta__social d-flex align-items-center ml-25">
                                            <button className="header-cart p-relative tp-cart-toggle" onClick={handleCartSidebar} style={{marginRight: '15px'}}>
                                                <i className="fal fa-shopping-cart" />
                                                <CartShow />
                                            </button>
                                            {!hideSearchBar && (
                                                <Link href="/sign-in" style={{marginRight: '15px'}}>
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
                </div>
            </header>
            <HeaderSticky scroll={scroll} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} hideSearchBar={hideSearchBar} />
            <HeaderTabSticky scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} hideSearchBar={hideSearchBar} />
            <HeaderMobSticky scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} hideSearchBar={hideSearchBar} />
        </>
    )
}