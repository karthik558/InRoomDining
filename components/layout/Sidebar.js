import Link from "next/link"
import MobileMenu from "./MobileMenu"

export default function Sidebar({ isMobileMenu, handleMobileMenu }) {
    return (
        <>
            <div className={`tpsideinfo ${isMobileMenu ? "tp-sidebar-opened" : ""}`}>
                <button className="tpsideinfo__close" onClick={handleMobileMenu}>Close<i className="fal fa-times ml-10" /></button>
                <div className="tpsideinfo__search text-center pt-35">
                    <form action="#">
                        <input type="text" placeholder="Search Products..." />
                        <button><i className="fal fa-search" /></button>
                    </form>
                </div>
                <div className="tpsideinfo__account-link">
                    <Link href="/sign-in"><i className="fal fa-user" /> Login / Register</Link>
                </div>
                <div className="tpsideinfo__wishlist-link">
                    <Link href="/cart" target="_parent"><i className="fal fa-shopping-cart" /> Cart</Link>
                </div>
                <div className="tpsideinfo__wishlist-link">
                    <Link href="/shop-2" target="_parent"><i className="fal fa-shopping-basket" /> Shop</Link>
                </div>
                <div className="tpsideinfo__wishlist-link">
                    <Link href="/wishlist" target="_parent"><i className="fal fa-heart" /> Wishlist</Link>
                </div>
            </div>
            <div className={`body-overlay ${isMobileMenu ? "opened" : ""}`} onClick={handleMobileMenu} />
        </>
    )
}
