import Link from "next/link"

export default function Footer2() {
    return (
        <>
            <footer>
                <div className="footer-area secondary-footer black-bg-2 pt-65">
                    <div className="container">
                        <div className="main-footer pb-15 mb-30">
                            <div className="row">
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <div className="footer-widget footer-col-1 mb-40">
                                        <div className="footer-logo mb-30">
                                            <Link href="/"><img src="/assets/img/logo/logo-white.png" alt="logo" style={{ width: '150px', height: 'auto' }} /></Link>
                                        </div>
                                        <div className="footer-content">
                                            <p>The Lilac Advantage: Experience the ease of hassle-free bookings, ensuring your journey begins with convenience at every click.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-sm-6">
                                    <div className="footer-widget footer-col-2 ml-30 mb-40">
                                        <h4 className="footer-widget__title mb-30">Information</h4>
                                        <div className="footer-widget__links">
                                            <ul>
                                                <li><Link href="/about">Home</Link></li>
                                                <li><Link href="#">FAQs</Link></li>
                                                <li><Link href="/contact">Contacts</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-sm-6">
                                    <div className="footer-widget footer-col-3 mb-40">
                                        <h4 className="footer-widget__title mb-30">My Account</h4>
                                        <div className="footer-widget__links">
                                            <ul>
                                                <li><Link href="https://lilachotels.com/privacy/">Privacy Policy</Link></li>
                                                <li><Link href="#">Terms & Condition</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-sm-6">
                                    <div className="footer-widget footer-col-4 mb-40">
                                        <h4 className="footer-widget__title mb-30">Social Network</h4>
                                        <div className="footer-widget__links">
                                            <ul>
                                                <li><Link href="https://www.facebook.com/LilacHotels/"><i className="fab fa-facebook-f" />Facebook</Link></li>
                                                <li><Link href="https://www.linkedin.com/company/tamara-leisure-experiences/"><i className="fab fa-linkedin" />Linkedin</Link></li>
                                                <li><Link href="https://www.instagram.com/lilachotels/"><i className="fab fa-instagram" />Instagram</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-8">
                                    <div className="footer-widget footer-col-5 mb-40">
                                        <h4 className="footer-widget__title mb-30">Our Hotels</h4>
                                        <div className="footer-widget__links keyword">
                                            <Link href="/">Lilac Guruvayoor</Link>
                                            <Link href="/">Lilac Kumbakonam</Link>
                                            <Link href="/">O-by Tamara TVM</Link>
                                            <Link href="/">O-by Tamara TN</Link>
                                            <Link href="/">Lilac 1</Link>
                                            <Link href="/">Lilac 2</Link>
                                            <Link href="/">Amal Tamara</Link>
                                            <Link href="/">Tamara Bhutan</Link>
                                            <Link href="/">Tamara Kodai</Link>
                                            <Link href="/">Tamara Coorg</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-cta pb-20">
                            <div className="row justify-content-between">
                                <div className="col-xl-6 col-lg-4 col-md-4 col-sm-6">
                                    <div className="footer-cta__contact">
                                        <div className="footer-cta__icon">
                                            <i className="far fa-phone" />
                                        </div>
                                        <div className="footer-cta__text">
                                            <Link href="tel:08065551244">08065551244</Link>
                                            <span>Working 7:30 - 22:30</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="footer-copyright black-bg-2">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-xl-6 col-lg-7 col-md-5">
                                    <div className="footer-copyright__content">
                                        <span>© Copyright {new Date().getFullYear()} <Link href="/"></Link>. All rights reserved. Developed by <Link href="https://karthiklal.in"> KARTHIK LAL</Link>.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}
