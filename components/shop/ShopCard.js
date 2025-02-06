import Link from "next/link"

// A helper function that converts a numerical rating (0-100) into star icons
function getStars(rating) {
    const totalStars = 5
    // Convert rating out of 100 to a 5-star scale
    const filledStars = Math.round((rating / 100) * totalStars)

    // Build an array of star elements
    return Array.from({ length: totalStars }, (_, index) => {
        if (index < filledStars) {
            // Filled star
            return <i className="fas fa-star" key={index} />
        }
        // Empty star
        return <i className="far fa-star" key={index} />
    })
}

const ShopCard = ({ item, addToCart, addToWishlist }) => {
    return (
        <>
            <div className="col">
                <div className="tpproduct tpproductitem mb-15 p-relative">
                    <div className="tpproduct__thumb">
                        <div className="tpproduct__thumbitem p-relative">
                            <Link href={`/shop/${item.id}`}>
                                <img src={`/assets/img/product/${item.imgf}`} alt="product-thumb" />
                            </Link>
                            <div className="tpproduct__thumb-bg">
                                <div className="tpproductactionbg">
                                    <a onClick={() => addToCart(item.id)} className="add-to-cart">
                                        <i className="fal fa-shopping-basket" />
                                    </a>
                                    <a onClick={() => addToWishlist(item.id)} className="wishlist">
                                        <i className="fal fa-heart" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tpproduct__content-area">
                        <h3 className="tpproduct__title mb-5">
                            <Link href={`/shop/${item.id}`}>{item.title}</Link>
                        </h3>
                        <div className="tpproduct__priceinfo p-relative">
                            <div className="tpproduct__ammount">
                                <span>₹{item.price.max}.00</span>
                            </div>
                        </div>
                    </div>
                    <div className="tpproduct__ratingarea">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="tpproduct__rating">
                                <ul>
                                    <li>
                                        {/* Dynamically render star icons based on item.rating */}
                                        {getStars(item.rating)}
                                    </li>
                                    <li>
                                        {/* Show the numeric rating beside the stars (optional) */}
                                        <span>({item.rating})</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopCard