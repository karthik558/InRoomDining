'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import CartShow from "@/components/elements/CartShow"
import WishListShow from "@/components/elements/WishListShow"
import Link from "next/link"
import HeaderMobSticky from "../HeaderMobSticky"
import HeaderSticky from "../HeaderSticky"
import HeaderTabSticky from "../HeaderTabSticky"

export default function Header1({ scroll, isMobileMenu, handleMobileMenu, isCartSidebar, handleCartSidebar }) {
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
                <div className="header-top space-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="header-welcome-text text-start">
                                    <span>Contact for enquiry </span>
                                    <Link href="tel:08065551244">
                                        08065551244 <i className="fal fa-phone" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                                <div className="header-meta-info d-flex align-items-center justify-content-between">
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
                                    <div className="header-meta header-brand d-flex align-items-center">
                                        <div className="header-meta__social d-flex align-items-center ml-25">
                                            <button
                                                className="header-cart p-relative tp-cart-toggle"
                                                onClick={handleCartSidebar}
                                            >
                                                <i className="fal fa-shopping-cart" />
                                                <CartShow />
                                            </button>
                                            <Link href="/sign-in">
                                                <i className="fal fa-user" />
                                            </Link>
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
            <HeaderSticky scroll={scroll} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} />
            <HeaderTabSticky
                scroll={scroll}
                isMobileMenu={isMobileMenu}
                handleMobileMenu={handleMobileMenu}
                isCartSidebar={isCartSidebar}
                handleCartSidebar={handleCartSidebar}
            />
            <HeaderMobSticky
                scroll={scroll}
                isMobileMenu={isMobileMenu}
                handleMobileMenu={handleMobileMenu}
                isCartSidebar={isCartSidebar}
                handleCartSidebar={handleCartSidebar}
            />
        </>
    )
}