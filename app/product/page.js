'use client'
import Layout from "@/components/layout/Layout"
import FilterShopBox from "@/components/shop/FilterShopBox"
import FilterSidebar from "@/components/shop/FilterSidebar"
import MobileSearchBar from "@/components/layout/MobileSearchBar"
import { useState } from "react"
import { useSearchParams } from "next/navigation"

export default function Shop2() {
    // Retrieve the search query from the URL parameters
    const searchParams = useSearchParams()
    const query = searchParams.get("query") || ""

    const [activeIndex, setActiveIndex] = useState(2)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }

    return (
        <>
            <Layout headerStyle={2} footerStyle={2} breadcrumbTitle="Shop">
                <div className="product-area pt-70 pb-40">
                    <div className="container">
                        {/* Mobile Search Bar - Only visible on mobile */}
                        <MobileSearchBar query={query} />
                        
                        {/* Mobile Filters - Only visible on mobile */}
                        <div className="d-lg-none mb-30 mobile-filters-wrapper">
                            <FilterSidebar />
                        </div>
                        
                        <div className="row">
                            {/* Main Content Area */}
                            <div className="col-lg-9 col-md-12">
                                <div className="product-sidebar__product-item">
                                    {/* Pass the query parameter to FilterShopBox so it can filter the items */}
                                    <FilterShopBox itemStart={12} itemEnd={18} query={query} />
                                </div>
                            </div>
                            
                            {/* Desktop Sidebar - Hidden on mobile */}
                            <div className="col-lg-3 d-none d-lg-block">
                                <div className="tpsidebar product-sidebar__product-category">
                                    <FilterSidebar />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}