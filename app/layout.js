'use client'
import { store } from "@/features/store"
import { Jost } from 'next/font/google'
import { Provider } from "react-redux"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify"
import "/public/assets/css/animate.css"
import "/public/assets/css/bootstrap.min.css"
import "/public/assets/css/fontawesome.min.css"
import "/public/assets/css/nice-select.css"
import "/public/assets/css/slick.css"
import "/public/assets/css/swiper-bundle.css"
import "/public/assets/css/magnific-popup.css"
import "/public/assets/css/meanmenu.css"
import "/public/assets/css/spacing.css"
import "/public/assets/css/main.css"
import "/public/assets/css/search-enhancements.css"
import "/public/assets/css/header-alignment-fix.css"
import "/public/assets/css/header-icon-fix.css"
import "/public/assets/css/header-alignment-override.css"
import "/public/assets/css/search-bar-spacing.css"
import "/public/assets/css/testimonial-fix.css"
import "/public/assets/css/signin-optimized.css"
import "/public/assets/css/admin-performance.css"
import "/public/assets/css/shop-layout-fix.css"
import "/public/assets/css/shop-card-fix.css"
import "/public/assets/css/price-slider-fix.css"
import "/public/assets/css/mobile-shop-fix.css"
import "/public/assets/css/view-tabs-fix.css"
import "/public/assets/css/sidebar-filter-fix.css"
import "/public/assets/css/shop-polish.css"
import "/public/assets/css/mobile-search-filter.css"
import "/public/assets/css/price-display-fix.css"
const jost = Jost({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: "--tp-ff-body",
})
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${jost.variable}`}>
                <Provider store={store}>
                    {children}
                    <ToastContainer
                        position="bottom-right"
                        autoClose={500}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                </Provider>
            </body>
        </html>
    )
}
