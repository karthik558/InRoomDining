'use client'
import Layout from "@/components/layout/Layout"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

export default function Checkout() {
    const { cart } = useSelector((state) => state.shop) || {}
    let total = 0
    cart?.forEach((item) => {
        const price = item.qty * item.price?.max
        total = total + price
    })

    const gstRate = 0.18
    const gstAmount = total * gstRate
    const totalIncludingGst = total + gstAmount

    const [isLoginToggle, setLoginToggle] = useState(false)
    const handleLoginToggle = () => setLoginToggle(!isLoginToggle)

    const [isCuponToggle, setCuponToggle] = useState(false)
    const handleCuponToggle = () => setCuponToggle(!isCuponToggle)

    const [isCboxToggle, setCboxToggle] = useState(false)
    const handleCboxToggle = () => setCboxToggle(!isCboxToggle)

    const [isShipToggle, setShipToggle] = useState(false)
    const handleShipToggle = () => setShipToggle(!isShipToggle)

    const [isActive, setIsActive] = useState({
        status: false,
        key: 1,
    })

    const handleClick = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        roomNumber: '',
        phoneNumber: '',
        specialRequest: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // Generate Unique Order ID
    const generateOrderId = () => {
        const randomFourDigitNumber = Math.floor(1000 + Math.random() * 9000)
        return randomFourDigitNumber
    }

    const [orderId, setOrderId] = useState(generateOrderId())

    useEffect(() => {
        setOrderId(generateOrderId())
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Form validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.roomNumber || !formData.phoneNumber) {
            alert('Please fill out all required fields.')
            return
        }

        // Generate Unique File Name
        const date = new Date()
        const formattedDate = date.toISOString().split('T')[0]
        const formattedTime = date.toTimeString().split(' ')[0].replace(/:/g, '')
        const fileName = `Tamara-IRD-${formData.firstName}-${formData.roomNumber}-${formattedDate}-${formattedTime}-${orderId}.pdf`

        // Dynamically import html2pdf and generate PDF (only in the browser)
        if (typeof window !== 'undefined') {
            const html2pdf = (await import('html2pdf.js')).default
            const element = document.getElementById('order-details')
            const options = {
                margin: 1,
                filename: fileName,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 1 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            }

            html2pdf().from(element).set(options).save().then(() => {
                // Open WhatsApp with pre-filled message
                const orderSummaryText = cart.map(item => `*${item.title}* × ${item.qty} - ₹${(item.qty * item.price?.max).toFixed(2)}`).join('\n')
                const message = encodeURIComponent(`*Order Summary for ${formData.firstName} ${formData.lastName}:*\n\n` +
                    `*Order ID:* ${orderId}\n` +
                    `*First Name:* ${formData.firstName}\n` +
                    `*Last Name:* ${formData.lastName}\n` +
                    `*Email:* ${formData.email}\n` +
                    `*Room Number:* ${formData.roomNumber}\n` +
                    `*Phone Number:* ${formData.phoneNumber}\n` +
                    `*Special Request:* ${formData.specialRequest}\n\n` +
                    `*Order Summary:*\n${orderSummaryText}\n\n` +
                    `*Cart Subtotal:* ₹${total.toFixed(2)}\n` +
                    `*Including (GST) 18%:* ₹${gstAmount.toFixed(2)}\n` +
                    `*Order Total:* ₹${totalIncludingGst.toFixed(2)}`
                )
                const whatsappUrl = `https://wa.me/8129624036?text=${message}`
                window.open(whatsappUrl, '_blank')
            })
        }
    }

    return (
        <>
            <Layout headerStyle={3} footerStyle={2} breadcrumbTitle="Checkout">
                <div>
                    <section className="coupon-area pt-80 pb-30 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".2s">
                        <div className="container">
                            <div className="row">
                            </div>
                        </div>
                    </section>
                    {/* coupon-area end */}
                    {/* checkout-area start */}
                    <section className="checkout-area pb-50 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".2s">
                        <div className="container">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-6 col-md-12">
                                        <div className="checkbox-form">
                                            <h3>Guest Details</h3>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>First Name <span className="required">*</span></label>
                                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Last Name <span className="required">*</span></label>
                                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="checkout-form-list">
                                                        <label>Email Address <span className="required">*</span></label>
                                                        <input type="text" name="email" value={formData.email} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Room Number <span className="required">*</span></label>
                                                        <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Phone Number <span className="required">*</span></label>
                                                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="checkout-form-list">
                                                        <label>Any Special Request ? <span className="optional"></span></label>
                                                        <input type="text" name="specialRequest" value={formData.specialRequest} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                        <div id="order-details" className="your-order mb-30 ">
                                            <h3>Order Details - #{orderId}</h3>
                                            <div className="guest-details">
                                                <h4>Guest Information</h4>
                                                <p><strong>First Name:</strong> {formData.firstName}</p>
                                                <p><strong>Last Name:</strong> {formData.lastName}</p>
                                                <p><strong>Email:</strong> {formData.email}</p>
                                                <p><strong>Room Number:</strong> {formData.roomNumber}</p>
                                                <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
                                                <p><strong>Special Request:</strong> {formData.specialRequest}</p>
                                            </div>
                                            <div className="order-summary">
                                                <h4>Order Summary</h4>
                                                <div className="your-order-table table-responsive">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th className="product-name">Product</th>
                                                                <th className="product-total">Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {cart?.map((item) => (
                                                                <tr className="cart_item" key={item.id}>
                                                                    <td className="product-name">
                                                                        {item.title} <strong className="product-quantity">× {item.qty}</strong>
                                                                    </td>
                                                                    <td className="product-total">
                                                                        <span className="amount">₹{(item.qty * item.price?.max).toFixed(2)}</span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                        <tfoot>
                                                            <tr className="cart-subtotal">
                                                                <th>Cart Subtotal</th>
                                                                <td><span className="amount">₹{total.toFixed(2)}</span></td>
                                                            </tr>
                                                            <tr className="gst-amount">
                                                                <th>Including (GST) 18%</th>
                                                                <td><span className="amount">₹{gstAmount.toFixed(2)}</span></td>
                                                            </tr>
                                                            <tr className="order-total">
                                                                <th>Order Total</th>
                                                                <td><strong><span className="amount">₹{totalIncludingGst.toFixed(2)}</span></strong>
                                                                </td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="invoice-footer">
                                                <p>Thank you for your order!</p>
                                                <p>If you have any questions, please contact us at <a href="mailto:karthiklal.in">karthiklal@lilacindia.com</a> or call us at <a href="callto:08129624036">08129624036.</a></p>
                                            </div>
                                            <div className="payment-method">
                                                <div className="order-button-payment mt-20">
                                                    <button type="submit" className="tp-btn tp-color-btn w-100 banner-animation">Place order</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    )
}