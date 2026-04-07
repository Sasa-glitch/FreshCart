import HeroSlider from "./_components/HeroSlider/HeroSlider";
import FeaturesBar from "./_components/FeaturesBar/FeaturesBar";
import PromoBanners from "./_components/PromoBanners/PromoBanners";
import NewsletterSection from "./_components/NewsletterSection/NewsletterSection";
import ProductsGrid from "./_components/ProductsGrid/ProductsGrid";
import { lazy, Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";



export default async function Home() {
    const CategoryGrid = lazy(
        () => import("./_components/CategoryGrid/CategoryGrid"),
    );
    return (
        <>
            <HeroSlider />
            <FeaturesBar />
            <Suspense fallback={<div className="flex justify-center h-30 items-center"><Spinner/></div>}>
                <CategoryGrid />
            </Suspense>
            <PromoBanners />

            {/* Featured Products Section */}
            <ProductsGrid />

            <NewsletterSection />
        </>
    );
}
