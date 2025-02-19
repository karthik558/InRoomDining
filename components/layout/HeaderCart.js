'use client'
import { addQty, deleteCart } from "@/features/shopSlice"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"

export default function HeaderCart({ isCartSidebar, handleCartSidebar }) {
    const { cart } = useSelector((state) => state.shop) || {}
    const dispatch = useDispatch()

    // Delete cart item
    const deleteCartHandler = (id) => {
        dispatch(deleteCart(id))
    }

    // Increase cart quantity by dispatching addQty with an incremented quantity.
    const increaseCartHandler = (item) => {
        dispatch(addQty({ id: item.id, qty: item.qty + 1 }))
    }

    // Decrease cart quantity by dispatching addQty with a decremented quantity (cannot go below 1).
    const decreaseCartHandler = (item) => {
        if (item.qty > 1) {
            dispatch(addQty({ id: item.id, qty: item.qty - 1 }))
        }
    }

    // Calculate total
    let total = 0
    cart?.forEach((item) => {
        const price = item.qty * item.price?.max
        total = total + price
    })

    return (
        <>
            <div className={`tpcartinfo tp-cart-info-area ${isCartSidebar ? "tp-sidebar-opened" : ""}`}>
                <button className="tpcart__close" onClick={handleCartSidebar}>
                    <i className="fal fa-times" />
                </button>
                <div className="tpcart">
                    <h4 className="tpcart__title">Your Cart</h4>
                    <div className="tpcart__product">
                        <div className="tpcart__product-list scrollable-cart">
                            <ul>
                                {cart?.map((item, i) => (
                                    <li key={i}>
                                        <div className="tpcart__item">
                                            <div className="tpcart__img">
                                                <img src={`/assets/img/product/${item.imgf}`} alt={item.title} />
                                                <div className="tpcart__del" onClick={() => deleteCartHandler(item.id)}>
                                                    <Link href="#">
                                                        <i className="far fa-times-circle" />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="tpcart__content">
                                                <span className="tpcart__content-title">
                                                    <Link href="/shop-details">{item.title}</Link>
                                                </span>
                                                <div className="tpcart__cart-price">
                                                    <button
                                                        onClick={() => decreaseCartHandler(item)}
                                                        className="quantity-btn quantity-btn-decrease"
                                                        disabled={item.qty <= 1}
                                                    >
                                                        –
                                                    </button>
                                                    <span className="quantity">{item.qty} x </span>
                                                    <span className="new-price">₹{item.price.max}</span>
                                                    <button
                                                        onClick={() => increaseCartHandler(item)}
                                                        className="quantity-btn quantity-btn-increase"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="tpcart__checkout">
                            <div className="tpcart__total-price d-flex justify-content-between align-items-center">
                                <span>Subtotal:</span>
                                <span className="heilight-price">₹ {total.toFixed(2)}</span>
                            </div>
                            <div className="tpcart__checkout-btn">
                                <Link className="tpcart-btn mb-10" href="/cart">
                                    View Cart
                                </Link>
                                <Link className="tpcheck-btn" href="/checkout">
                                    Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`cartbody-overlay ${isCartSidebar ? "opened" : ""}`}
                onClick={handleCartSidebar}
            />
        </>
    )
}