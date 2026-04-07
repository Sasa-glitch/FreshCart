import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function PromoBanners() {
    return (
        <section className="py-8 bg-mute-lightest">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Deal of the Day - Green */}
                    <div className="relative bg-linear-to-br from-green-700 via-green-600 to-green-500 rounded-2xl p-8 md:p-10 text-white overflow-hidden min-h-70 flex flex-col justify-center">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4" />
                        <div className="absolute bottom-0 right-16 w-32 h-32 bg-white/5 rounded-full translate-y-1/4" />
                        <div className="relative z-10">
                            <span className="inline-flex items-center gap-1.5 bg-white/20 text-sm px-3 py-1 rounded-full mb-4">
                                🔥 Deal of the Day
                            </span>
                            <h3 className="text-3xl md:text-4xl font-bold mb-2">
                                Fresh Organic Fruits
                            </h3>
                            <p className="text-green-100 mb-2">
                                Get up to 40% off on selected organic fruits
                            </p>
                            <div className="flex items-baseline gap-4 mb-6">
                                <span className="text-4xl font-extrabold">
                                    40% OFF
                                </span>
                                <span className="text-green-200 text-sm">
                                    Use code:{" "}
                                    <strong className="text-white">
                                        ORGANIC40
                                    </strong>
                                </span>
                            </div>
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors text-sm"
                            >
                                Shop Now
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className="w-3"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* New Arrivals - Orange/Red */}
                    <div className="relative bg-linear-to-br from-orange-500 via-orange-400 to-rose-400 rounded-2xl p-8 md:p-10 text-white overflow-hidden min-h-70 flex flex-col justify-center">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4" />
                        <div className="absolute bottom-0 right-16 w-32 h-32 bg-white/5 rounded-full translate-y-1/4" />
                        <div className="relative z-10">
                            <span className="inline-flex items-center gap-1.5 bg-white/20 text-sm px-3 py-1 rounded-full mb-4">
                                ✨ New Arrivals
                            </span>
                            <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                                Exotic Vegetables
                            </h3>
                            <p className="text-orange-100 mb-2">
                                Discover our latest collection of premium
                                vegetables
                            </p>
                            <div className="flex items-baseline gap-4 mb-6">
                                <span className="text-4xl font-extrabold">
                                    25% OFF
                                </span>
                                <span className="text-orange-200 text-sm">
                                    Use code:{" "}
                                    <strong className="text-white">
                                        FRESH25
                                    </strong>
                                </span>
                            </div>
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 bg-white text-orange-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors text-sm"
                            >
                                Explore Now
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className="w-3"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
