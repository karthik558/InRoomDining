
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Contact() {

    return (
        <>
            <Layout headerStyle={3} footerStyle={2} breadcrumbTitle="Contact">
                <div>
                    <section className="contact-area pt-80 pb-80">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 col-12">
                                    <div className="tpcontact__right mb-40">
                                        <div className="tpcontact__shop mb-30">
                                            <h4 className="tpshop__title mb-25">Get In Touch</h4>
                                            <div className="tpshop__info">
                                                <ul>
                                                    <li><i className="fal fa-map-marker-alt" /> <Link href="#">Outer Ring Rd, near Pandayil Temple, East Nada, Guruvayur, Kerala 680101</Link></li>
                                                    {/* <li>
                                                        <i className="fal fa-phone" />
                                                        <Link href="tel:08065551244">08065 551 244</Link>
                                                        <Link href="tel:08065551244">08065 551 244</Link>
                                                    </li> */}
                                                    <li>
                                                        <i className="fal fa-clock" />
                                                        <span>Opening Hours:</span>
                                                        <span>7.30 - 22.30 IST</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="tpcontact__support">
                                            <Link href="tel:08065551244">Contact Now <i className="fal fa-headphones" /></Link>
                                            <Link target="_blank" href="https://www.google.com/maps/place/Lilac+Hotel,+Guruvayur/@10.5912572,76.0410931,179m/data=!3m1!1e3!4m21!1m11!3m10!1s0x3ba795b404626523:0xb59e316a7dd68513!2sLilac+Hotel,+Guruvayur!5m2!4m1!1i2!8m2!3d10.5910505!4d76.0412273!10e1!16s%2Fg%2F11v3jh8qvv!3m8!1s0x3ba795b404626523:0xb59e316a7dd68513!5m2!4m1!1i2!8m2!3d10.5910505!4d76.0412273!16s%2Fg%2F11v3jh8qvv?entry=ttu&g_ep=EgoyMDI1MDIwMi4wIKXMDSoASAFQAw%3D%3D">Get Direction <i className="fal fa-map-marker-alt" /></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-12">
                                    <div className="tpcontact__form">
                                        <div className="tpcontact__info mb-35">
                                            <h4 className="tpcontact__title">Make Custom Request</h4>
                                            <p>Must-have pieces selected every month want style Ideas and Treats?</p>
                                        </div>
                                        <form action="https://weblearnbd.net/tphtml/ninico/assets/mail.php" id="contact-form" method="POST">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="tpcontact__input mb-20">
                                                        <input name="name" type="text" placeholder="Full name" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="tpcontact__input mb-20">
                                                        <input name="email" type="email" placeholder="Email address" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="tpcontact__input mb-20">
                                                        <input name="number" type="text" placeholder="Phone number" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="tpcontact__input mb-20">
                                                        <input name="subject" type="text" placeholder="Subject" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="tpcontact__input mb-30">
                                                        <textarea name="message" placeholder="Enter message" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tpcontact__submit">
                                                <button className="tp-btn tp-color-btn tp-wish-cart">Send Now <i className="fal fa-long-arrow-right" /></button>
                                            </div>
                                        </form>
                                        <p className="ajax-response mt-30" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* contact-area-end */}
                    {/* map-area-start */}
                    <div className="map-area">
                        <div className="tpshop__location-map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d779.152009757795!2d76.04109308141555!3d10.591257154799672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba795b404626523%3A0xb59e316a7dd68513!2sLilac%20Hotel%2C%20Guruvayur!5e1!3m2!1sen!2sin!4v1738746774926!5m2!1sen!2sin" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}