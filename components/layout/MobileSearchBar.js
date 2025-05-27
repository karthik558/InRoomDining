'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

const MobileSearchBar = ({ query = "" }) => {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState(query)

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        router.push(`/product?query=${encodeURIComponent(searchQuery)}`)
    }

    return (
        <div className="mobile-search-bar d-md-none">
            <form onSubmit={handleSearchSubmit}>
                <div className="mobile-search-input">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="mobile-search-button">
                        <i className="fal fa-search" />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MobileSearchBar
