import Link from "next/link"
import Countdown from "../elements/CountDown"
import productData from "../../data/dealproduct.json"

// Function to convert UTC to IST and format time
const convertUTCToIST = (date) => {
    const utcDate = new Date(date)
    // Convert to milliseconds and add the IST offset (5 hours 30 minutes)
    const istOffset = 5.5 * 60 * 60 * 1000
    const istDate = new Date(utcDate.getTime() + istOffset)

    // Format the time to HH:MM
    const hours = istDate.getHours().toString().padStart(2, '0')
    const minutes = istDate.getMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes}`
}

export default function DealProduct1() {
    const currentTime = new Date()
    const startTime = new Date(productData.product.startTime)
    const endTime = new Date(productData.product.endTime)
    const isDealActive = currentTime >= startTime && currentTime <= endTime

    // Calculate progress
    const totalDuration = endTime - startTime
    const elapsed = currentTime - startTime
    const progress = Math.min((elapsed / totalDuration) * 100, 100)

    return (
        <>
            <section className="dealproduct-area pb-95">
                <div className="container">
                    <div className="theme-bg pt-40 pb-40">
                        <div className="row">
                            <div className="col-lg-6 col-md-12">
                                <div className="tpdealproduct">
                                    <div className="tpdealproduct__thumb p-relative text-center">
                                        <img src={productData.product.image} alt="dealproduct-thumb" />
                                        <div className="tpdealproductd__offer">
                                            <h5 className="tpdealproduct__offer-price"><span>From</span>{productData.product.offerPrice}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="tpdealcontact pt-30">
                                    {isDealActive ? (
                                        <>
                                            <div className="tpdealcontact__price mb-5">
                                                <span>{productData.product.currentPrice}</span>
                                                <del>{productData.product.originalPrice}</del>
                                            </div>
                                            <div className="tpdealcontact__text mb-30">
                                                <h4 className="tpdealcontact__title mb-10"><Link href={productData.product.link}>{productData.product.title}</Link></h4>
                                                <p>{productData.product.description}</p>
                                            </div>
                                            <div className="tpdealcontact__progress mb-30">
                                                <div className="progress">
                                                    <div className="progress-bar" style={{ width: `${progress}%` }} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                            </div>
                                            <div className="tpdealcontact__count">
                                                <div className="tpdealcontact__countdown">
                                                    <Countdown endDateTime={endTime} />
                                                </div>
                                                <i>Remains until the <br /> end of the offer</i>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="tpdealcontact__ended">
                                            <h4 className="tpdealcontact__title mb-10">Deal Ended</h4>
                                            <p>Unfortunately, this deal has ended. Please check back later for more offers.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}