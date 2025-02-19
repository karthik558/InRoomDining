import Layout from "@/components/layout/Layout"
import DealProduct1 from "@/components/sections/DealProduct1"
import Product1 from "@/components/sections/Product1"
import Slider1 from "@/components/sections/Slider1"
import Testimonial2 from "@/components/sections/Testimonial2"
export const metadata = {
    title: 'Lilac IRD: Home',
}
export default function Home() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={2}>
                <Slider1 />
                <DealProduct1 />
                <Product1 />
                <Testimonial2 />
            </Layout>
        </>
    )
}