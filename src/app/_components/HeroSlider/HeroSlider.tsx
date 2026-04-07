"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import slide1Img from "@images/homeSlider1.webp";
import slide2Img from "@images/homeSlider2.webp";
import slide3Img from "@images/homeSlider3.webp";

const slidesData = [
    {
        id: 1,
        image: slide1Img,
        eyebrow: "Get 20% off your first order",
        title: "Fresh Products Delivered to your Door",
        primaryBtnText: "Shop Now",
        primaryBtnLink: "/products",
        secondaryBtnText: "View Deals",
        secondaryBtnLink: "/deals",
    },
    {
        id: 2,
        image: slide2Img,
        eyebrow: "Fresh from farm to your table",
        title: "Premium Quality Guaranteed",
        primaryBtnText: "Shop Now",
        primaryBtnLink: "/products",
        secondaryBtnText: "Learn More",
        secondaryBtnLink: "/about",
    },
    {
        id: 3,
        image: slide3Img,
        eyebrow: "Same day delivery available",
        title: "Fast & Free Delivery",
        primaryBtnText: "Order Now",
        primaryBtnLink: "/products",
        secondaryBtnText: "Delivery Info",
        secondaryBtnLink: "/delivery",
    },
];

type SlideState =
    | "current"
    | "entering-right"
    | "entering-left"
    | "exiting-left"
    | "exiting-right";

const stateStyles: Record<SlideState, React.CSSProperties> = {
    current: {
        transform: "translateX(0)",
        opacity: 1,
        zIndex: 2,
        transition: "transform 0.5s cubic-bezier(0.77,0,0.18,1), opacity 0.5s ease",
    },
    "entering-right": {
        transform: "translateX(100%)",
        opacity: 0,
        zIndex: 1,
        transition: "none",
    },
    "entering-left": {
        transform: "translateX(-100%)",
        opacity: 0,
        zIndex: 1,
        transition: "none",
    },
    "exiting-left": {
        transform: "translateX(-100%)",
        opacity: 0,
        zIndex: 1,
        transition: "transform 0.5s cubic-bezier(0.77,0,0.18,1), opacity 0.5s ease",
    },
    "exiting-right": {
        transform: "translateX(100%)",
        opacity: 0,
        zIndex: 1,
        transition: "transform 0.5s cubic-bezier(0.77,0,0.18,1), opacity 0.5s ease",
    },
};

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [states, setStates] = useState<SlideState[]>(
        slidesData.map((_, i) => (i === 0 ? "current" : "entering-right"))
    );
    const animating = useRef(false);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);

    function goTo(next: number, dir?: number) {
        if (animating.current || next === current) return;
        animating.current = true;

        const direction = dir !== undefined ? dir : next > current ? 1 : -1;

        // Step 1: position the incoming slide off-screen instantly
        setStates((prev) => {
            const s = [...prev];
            s[next] = direction > 0 ? "entering-right" : "entering-left";
            return s;
        });

        // Step 2: one rAF later, trigger the transition
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setStates((prev) => {
                    const s = [...prev];
                    s[current] = direction > 0 ? "exiting-left" : "exiting-right";
                    s[next] = "current";
                    return s;
                });
                setCurrent(next);

                // Step 3: after animation ends, reset all non-current slides
                setTimeout(() => {
                    setStates((prev) => {
                        const s = [...prev];
                        s.forEach((_, i) => {
                            if (i !== next) s[i] = "entering-right";
                        });
                        return s;
                    });
                    animating.current = false;
                }, 520);
            });
        });
    }

    function handlePrev() {
        const prev = (current - 1 + slidesData.length) % slidesData.length;
        goTo(prev, -1);
    }

    function handleNext() {
        const next = (current + 1) % slidesData.length;
        goTo(next, 1);
    }

    function startAutoplay() {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
        autoplayRef.current = setInterval(() => {
            setCurrent((c) => {
                const next = (c + 1) % slidesData.length;
                goTo(next, 1);
                return c;
            });
        }, 4000);
    }

    function stopAutoplay() {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
    }

    useEffect(() => {
        startAutoplay();
        return () => stopAutoplay();
    }, []);

    return (
        <section
            className="relative w-full overflow-hidden group"
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
            aria-roledescription="carousel"
        >
            <div className="relative w-full h-100 md:h-125">
                {slidesData.map((slide, i) => {
                    const isCurrent = states[i] === "current";
                    return (
                        <div
                            key={slide.id}
                            className="absolute inset-0 flex items-center"
                            style={stateStyles[states[i]]}
                            aria-hidden={!isCurrent}
                        >
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover object-center pointer-events-none"
                                    priority={i === 0}
                                />
                            </div>

                            {/* Gradient Overlay matching reference */}
                            <div className="absolute inset-0 bg-linear-to-r from-primary/95 to-primary-light/60 mix-blend-multiply pointer-events-none" />
                            {/* Additional overlay purely for color correction if needed, based on image */}
                            <div className="absolute inset-0 bg-primary/20 pointer-events-none" />

                            <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
                                <div className="max-w-xl">
                                    <h2
                                        style={{
                                            opacity: isCurrent ? 1 : 0,
                                            transform: isCurrent ? "translateY(0)" : "translateY(12px)",
                                            transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s",
                                        }}
                                        className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight shadow-sm"
                                    >
                                        {slide.title}
                                    </h2>
                                    <p
                                        style={{
                                            opacity: isCurrent ? 1 : 0,
                                            transform: isCurrent ? "translateY(0)" : "translateY(12px)",
                                            transition: "opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s",
                                        }}
                                        className="text-white/90 mb-8 text-lg font-medium tracking-wide"
                                    >
                                        {slide.eyebrow}
                                    </p>
                                    <div
                                        style={{
                                            opacity: isCurrent ? 1 : 0,
                                            transform: isCurrent ? "translateY(0)" : "translateY(12px)",
                                            transition: "opacity 0.4s ease 0.3s, transform 0.4s ease 0.3s",
                                        }}
                                        className="flex gap-3"
                                    >
                                        <Link
                                            href={slide.primaryBtnLink}
                                            className="bg-white text-primary font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5"
                                        >
                                            {slide.primaryBtnText}
                                        </Link>
                                        <Link
                                            href={slide.secondaryBtnLink}
                                            className="bg-transparent border-2 border-white/50 text-white font-semibold px-6 py-2.5 rounded-lg hover:border-white hover:bg-white/10 transition-colors hover:-translate-y-0.5"
                                        >
                                            {slide.secondaryBtnText}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Navigation arrows (hidden on mobile, visible on md+) hover group effect */}
            <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full hidden md:flex items-center justify-center text-primary shadow-lg transition-all duration-300 hover:scale-110 z-20 cursor-pointer opacity-0 group-hover:opacity-100"
            >
                <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
            </button>
            <button
                onClick={handleNext}
                aria-label="Next slide"
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full hidden md:flex items-center justify-center text-primary shadow-lg transition-all duration-300 hover:scale-110 z-20 cursor-pointer opacity-0 group-hover:opacity-100"
            >
                <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slidesData.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`transition-all duration-300 rounded-full cursor-pointer border-0 p-0 ${
                            i === current
                                ? "w-6 h-2.5 bg-white shadow-sm"
                                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/70"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
