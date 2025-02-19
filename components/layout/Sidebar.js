import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import MobileMenu from "./MobileMenu"

export default function Sidebar({ isMobileMenu, handleMobileMenu }) {
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
            <div className={`tpsideinfo ${isMobileMenu ? "tp-sidebar-opened" : ""}`}>
                <button className="tpsideinfo__close" onClick={handleMobileMenu}>
                    Close<i className="fal fa-times ml-10" />
                </button>
                <div className="tpsideinfo__search text-center pt-35">
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Search Products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit">
                            <i className="fal fa-search" />
                        </button>
                    </form>
                </div>
                <div className="tpsideinfo__account-link">
                    <Link href="/sign-in">
                        <i className="fal fa-user" /> Login / Register
                    </Link>
                </div>
                <div className="tpsideinfo__wishlist-link">
                    <Link href="/cart" target="_parent">
                        <i className="fal fa-shopping-cart" /> Cart
                    </Link>
                </div>
                <div className="tpsideinfo__wishlist-link">
                    <Link href="/product" target="_parent">
                        <i className="fal fa-shopping-basket" /> Shop
                    </Link>
                </div>
                <div className="tpsideinfo__wishlist-link">
                    <Link href="/wishlist" target="_parent">
                        <i className="fal fa-heart" /> Wishlist
                    </Link>
                </div>
            </div>
            <div
                className={`body-overlay ${isMobileMenu ? "opened" : ""}`}
                onClick={handleMobileMenu}
            />
        </>
    )
}