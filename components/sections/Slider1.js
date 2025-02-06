'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Link from "next/link"
import sliderData from "../../data/sliderproduct.json"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
        delay: 5000,
    },

    // Navigation
    navigation: {
        nextEl: '.h1n',
        prevEl: '.h1p',
    },

    // Pagination
    pagination: {
        el: '.slider-pagination',
        clickable: true,
    },
}

export default function Slider1() {
    return (
        <>
            <section className="slider-area pb-25">
                <div className="container">
                    <div className="row justify-content-xl-end">
                        <div className="col-xl-9 col-xxl-7 col-lg-9">
                            <div className="tp-slider-area p-relative">
                                <div className="swiper-container slider-active">
                                    <Swiper {...swiperOptions}>
                                        {sliderData.slides.map((slide, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="tp-slide-item">
                                                    <div className="tp-slide-item__content">
                                                        <h4 className="tp-slide-item__sub-title">{slide.subTitle}</h4>
                                                        <h3 className="tp-slide-item__title mb-25">
                                                            {slide.title}
                                                            <i>
                                                                <img src={slide.titleShape} alt="" />
                                                            </i>
                                                        </h3>
                                                        <Link className="tp-slide-item__slide-btn tp-btn" href={slide.link}>
                                                            {slide.buttonText} <i className="fal fa-long-arrow-right" />
                                                        </Link>
                                                    </div>
                                                    <div className="tp-slide-item__img">
                                                        <img src={slide.image} alt="" />
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                                <div className="slider-pagination" />
                            </div>
                        </div>
                        <div className="col-xl-3 col-xxl-3 col-lg-3">
                            <div className="row">
                                {sliderData.banners.map((banner, index) => (
                                    <div className="col-lg-12 col-md-6" key={index}>
                                        <div className={`tpslider-banner ${index === 0 ? 'mb-30' : ''}`}>
                                            <Link href={banner.link}>
                                                <div className="tpslider-banner__img">
                                                    <img src={banner.image} alt="" />
                                                    <div className="tpslider-banner__content">
                                                        <span className="tpslider-banner__sub-title">{banner.subTitle}</span>
                                                        <h4 className="tpslider-banner__title">{banner.title}</h4>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}