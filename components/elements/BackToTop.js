import Link from "next/link"
import { useEffect, useState } from "react"

export default function BackToTop() {
    const [hasScrolled, setHasScrolled] = useState(false)

    useEffect(() => {
        // Using throttling to improve scroll performance
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 100) {
                        setHasScrolled(true)
                    } else {
                        setHasScrolled(false)
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    }, [])

    return (
        <>
            {hasScrolled && (
                <Link className="scroll-top scroll-to-target open" href="#top" style={{ position: 'fixed', zIndex: 2147483647 }}>
                    <i className="fas fa-angle-up"></i>
                </Link>
            )}
        </>
    )
}