import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { callCategories } from "@/api/services/route.services";

// const categories = [
//     {
//         name: "Music",
//         slug: "music",
//         image: "https://ecommerce.routemisr.com/Route-Academy-categories/1681511818071.jpeg",
//     },
//     {
//         name: "Men's Fashion",
//         slug: "mens-fashion",
//         image: "https://ecommerce.routemisr.com/Route-Academy-categories/1681511865180.jpeg",
//     },
//     {
//         name: "Women's Fashion",
//         slug: "womens-fashion",
//         image: "https://ecommerce.routemisr.com/Route-Academy-categories/1681511900498.jpeg",
//     },
//     {
//         name: "SuperMarket",
//         slug: "supermarket",
//         image: "https://ecommerce.routemisr.com/Route-Academy-categories/1681511935283.jpeg",
//     },
//     {
//         name: "Baby & Toys",
//         slug: "baby-toys",
//         image: "https://ecommerce.routemisr.com/Route-Academy-categories/1681511964011.jpeg",
//     },
//     {
//         name: "Home",
//         slug: "home",
//         image: "https://ecommerce.routemisr.com/Route-Academy-categories/1681512024498.jpeg",
//     },
//     {
//         name: "Books",
//         slug: "books",
//         image: "https://ecommerce.routemisr.com/Route-Academy-categories/1681512057498.jpeg",
//     },
//     {
//         name: "Beauty & Health",
//         slug: "beauty-health",
//         image: "https://ecommerce.routemisr.com/Route-Academy-categories/1681512089739.jpeg",
//     },
//     {
//         name: "Mobiles",
//         slug: "mobiles",
//         image: "https://ecommerce.routemisr.com/Route-Academy-categories/1681512121316.jpeg",
//     },
//     {
//         name: "Electronics",
//         slug: "electronics",
//         image: "https://ecommerce.routemisr.com/Route-Academy-categories/1681512150598.jpeg",
//     },
// ];

export default async function CategoryGrid() {
    const categories = await callCategories();
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                        <span className="border-l-4 border-primary pl-3">
                            Shop By{" "}
                            <span className="text-primary">Category</span>
                        </span>
                    </h2>
                    <Link
                        href="/categories"
                        className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1.5 transition-colors"
                    >
                        View All Categories
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className="w-3"
                        />
                    </Link>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
                    {categories?.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/products?category=${cat.slug}`}
                            className="group flex flex-col items-center gap-3"
                        >
                            <div className="w-full aspect-square max-w-30 rounded-full bg-mute-lightest border-2 border-transparent group-hover:border-primary overflow-hidden transition-all duration-300 mx-auto">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    width={120}
                                    height={120}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <p className="text-sm font-medium text-gray-700 group-hover:text-primary text-center transition-colors">
                                {cat.name}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
