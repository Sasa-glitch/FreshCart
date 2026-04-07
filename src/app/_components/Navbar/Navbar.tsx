"use client";

import {
    faEnvelope,
    faHeart,
    faUser,
    faCircleUser,
    faAddressBook,
} from "@fortawesome/free-regular-svg-icons";
import {
    faBars,
    faCartShopping,
    faChevronDown,
    faGift,
    faMagnifyingGlass,
    faPhone,
    faTruck,
    faUserPlus,
    faXmark,
    faHeadset,
    faSignOut,
    faBoxOpen,
    faGear,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import siteIcon from "@images/siteLogo.svg";
import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCart } from "@/app/_context/CartContext";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/products" },
];

const categoryLinks = [
    { label: "All Categories", href: "/categories" },
    { label: "Electronics", href: "/products?category=6439d2d167d9aa4ca970649f" },
    { label: "Women's Fashion", href: "/products?category=6439d58a0049ad0b52b9003f" },
    { label: "Men's Fashion", href: "/products?category=6439d5b90049ad0b52b90048" },
    { label: "Beauty & Health", href: "/products?category=6439d30b67d9aa4ca97064b1" },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { cartCount, updateCartIconCount } = useCart();
    // handling changing the UI passed on user status
    const session = useSession();
    console.log("This is session Object", session);
    const isLogged = session.status === "authenticated";
    const loggedUserName = session.data?.user?.name;
    // signout function
    const router = useRouter()
    const handleSignOut = async () => {
        await signOut({redirect: false});
        updateCartIconCount();
        router.replace("/");
    }
    const sessionFromGetSession = getSession();
    console.log("This is session from get session Object", sessionFromGetSession);
    return (
        <>
            {/* Top info bar */}
            <div className="py-3 hidden md:block border-b border-mute-light text-xs">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center text-mute">
                            <FontAwesomeIcon
                                icon={faTruck}
                                className="text-primary w-3.5 me-1.5"
                            />
                            <p>Free Shipping on Orders 500 EGP</p>
                        </div>
                        <div className="flex items-center text-mute">
                            <FontAwesomeIcon
                                icon={faGift}
                                className="text-primary w-3.5 me-1.5"
                            />
                            <p>New Arrivals Daily</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="tel:+201140169594"
                            className="flex items-center text-mute hover:text-primary transition-colors"
                        >
                            <FontAwesomeIcon
                                icon={faPhone}
                                className="w-3 me-1.5"
                            />
                            <p>+201140169594</p>
                        </Link>
                        <Link
                            href="mailto:support@freshcart.com"
                            className="flex items-center text-mute hover:text-primary transition-colors"
                        >
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="w-3 me-1.5"
                            />
                            <p>support@freshcart.com</p>
                        </Link>
                        <span className="w-px h-4 bg-mute-light" />
                        {/* action area */}
                        {isLogged ? (
                            <>
                                <Link
                                    href="/profile"
                                    className="flex items-center text-mute hover:text-primary transition-colors"
                                >
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        className="w-3 me-1.5"
                                    />
                                    <p>{loggedUserName}</p>
                                </Link>
                                <span
                                    onClick={handleSignOut}
                                    className="flex items-center text-mute hover:text-primary transition-colors cursor-pointer"
                                >
                                    <FontAwesomeIcon
                                        icon={faSignOut}
                                        className="w-3.5 me-1.5"
                                    />
                                    <p>Sign Out </p>
                                </span>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="flex items-center text-mute hover:text-primary transition-colors"
                                >
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        className="w-3 me-1.5"
                                    />
                                    <p>Sign In</p>
                                </Link>
                                <Link
                                    href="/register"
                                    className="flex items-center text-mute hover:text-primary transition-colors"
                                >
                                    <FontAwesomeIcon
                                        icon={faUserPlus}
                                        className="w-3.5 me-1.5"
                                    />
                                    <p>Sign Up</p>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="sticky top-0 left-0 z-50 bg-white border-b border-mute-light shadow-sm">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center gap-4">
                    {/* Logo */}
                    <Link href="/" className="shrink-0">
                        <Image
                            src={siteIcon}
                            alt="FreshCart"
                            height={28}
                            width={140}
                            priority
                        />
                    </Link>

                    {/* Search bar - hidden on mobile */}
                    <div className="hidden md:flex flex-1 max-w-lg relative">
                        <input
                            type="text"
                            placeholder="Search for products, brands and more..."
                            className="w-full rounded-full py-2.5 ps-5 pe-12 border border-mute-light bg-mute-lightest text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                        <button className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 bg-primary hover:bg-primary-dark rounded-full flex items-center justify-center text-white transition-colors cursor-pointer">
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className="w-3.5"
                            />
                        </button>
                    </div>

                    {/* Desktop nav links - hidden on mobile */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-lg transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        {/* Categories dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-lg transition-colors cursor-pointer">
                                Categories
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className="w-2.5 transition-transform group-hover:rotate-180"
                                />
                            </button>
                            <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-lg ring-1 ring-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="py-1">
                                    {categoryLinks.map((cat) => (
                                        <Link
                                            key={cat.href}
                                            href={cat.href}
                                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-mute-lightest hover:text-primary transition-colors"
                                        >
                                            {cat.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Link
                            href="/brands"
                            className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-lg transition-colors"
                        >
                            Brands
                        </Link>
                    </div>

                    {/* Support badge */}
                    <Link
                        href="/contact"
                        className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-mute-lightest transition-colors"
                    >
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <FontAwesomeIcon
                                icon={faHeadset}
                                className="w-3.5 text-white"
                            />
                        </div>
                        <div className="text-xs leading-tight">
                            <p className="font-semibold text-gray-900">
                                Support
                            </p>
                            <p className="text-mute">24/7 Help</p>
                        </div>
                    </Link>

                    {/* Right side actions */}
                    <div className="flex items-center gap-1">
                        <Link
                            href="/wish-list"
                            title="Wishlist"
                            className="w-10 h-10 flex justify-center items-center text-mute rounded-full hover:text-primary hover:bg-mute-lightest transition-colors"
                        >
                            <FontAwesomeIcon icon={faHeart} className="w-5" />
                        </Link>
                        <Link
                            href="/cart"
                            title="Cart"
                            className="relative w-10 h-10 flex justify-center items-center text-mute rounded-full hover:text-primary hover:bg-mute-lightest transition-colors"
                        >
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                className="w-5"
                            />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        {/* Sign In button / User Menu - desktop */}
                        {isLogged ? (
                            <div className="hidden md:block relative group ml-1">
                                <button className="relative p-2.5 rounded-full hover:bg-mute-lightest transition-colors cursor-pointer" title="Account">
                                    <FontAwesomeIcon icon={faCircleUser} className="text-xl text-mute group-hover:text-primary transition-colors" />
                                </button>
                                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-mute-light rounded-2xl shadow-lg transition-all duration-200 origin-top-right opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible z-50">
                                    <div className="p-4 border-b border-mute-light">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <FontAwesomeIcon icon={faCircleUser} className="text-xl text-primary" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-dark truncate">{loggedUserName}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-mute hover:text-primary hover:bg-mute-lightest transition-colors">
                                            <FontAwesomeIcon icon={faUser} className="w-4" />
                                            My Profile
                                        </Link>
                                        <Link href="/allorders" className="flex items-center gap-3 px-4 py-2.5 text-sm text-mute hover:text-primary hover:bg-mute-lightest transition-colors">
                                            <FontAwesomeIcon icon={faBoxOpen} className="w-4" />
                                            My Orders
                                        </Link>
                                        <Link href="/wish-list" className="flex items-center gap-3 px-4 py-2.5 text-sm text-mute hover:text-primary hover:bg-mute-lightest transition-colors">
                                            <FontAwesomeIcon icon={faHeart} className="w-4" />
                                            My Wishlist
                                        </Link>
                                        <Link href="/profile/addresses" className="flex items-center gap-3 px-4 py-2.5 text-sm text-mute hover:text-primary hover:bg-mute-lightest transition-colors">
                                            <FontAwesomeIcon icon={faAddressBook} className="w-4" />
                                            Addresses
                                        </Link>
                                        <Link href="/profile/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-mute hover:text-primary hover:bg-mute-lightest transition-colors">
                                            <FontAwesomeIcon icon={faGear} className="w-4" />
                                            Settings
                                        </Link>
                                    </div>
                                    <div className="border-t border-mute-light py-2">
                                        <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left cursor-pointer">
                                            <FontAwesomeIcon icon={faRightFromBracket} className="w-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors ml-1"
                            >
                                <FontAwesomeIcon icon={faUser} className="w-3.5" />
                                Sign In
                            </Link>
                        )}
                        {/* Mobile menu toggle */}
                        <button
                            className="lg:hidden w-10 h-10 flex justify-center items-center text-white bg-primary rounded-full hover:bg-primary-dark transition-colors ml-1 cursor-pointer"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <FontAwesomeIcon
                                icon={mobileMenuOpen ? faXmark : faBars}
                                className="w-5"
                            />
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-mute-light bg-white">
                        <div className="container mx-auto px-4 py-4 space-y-2">
                            {/* Mobile search */}
                            <div className="relative md:hidden mb-3">
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    className="w-full rounded-full py-2.5 ps-5 pe-12 border border-mute-light bg-mute-lightest text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                />
                                <button className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white cursor-pointer">
                                    <FontAwesomeIcon
                                        icon={faMagnifyingGlass}
                                        className="w-3.5"
                                    />
                                </button>
                            </div>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-primary hover:bg-mute-lightest rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/categories"
                                className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-primary hover:bg-mute-lightest rounded-lg transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Categories
                            </Link>
                            <Link
                                href="/brands"
                                className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-primary hover:bg-mute-lightest rounded-lg transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Brands
                            </Link>
                            <Link
                                href="/wish-list"
                                className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-primary hover:bg-mute-lightest rounded-lg transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Wishlist
                            </Link>
                            <Link
                                href="/cart"
                                className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-primary hover:bg-mute-lightest rounded-lg transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Cart
                            </Link>
                            <div className="pt-2 border-t border-mute-light flex flex-col gap-2">
                                {isLogged ? (
                                    <>
                                        <Link className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-mute-lightest transition-colors" href="/profile" onClick={() => setMobileMenuOpen(false)}>
                                            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                                <FontAwesomeIcon icon={faUser} className="text-mute" />
                                            </div>
                                            <span className="font-medium text-gray-700">{loggedUserName}</span>
                                        </Link>
                                        <button onClick={() => { setMobileMenuOpen(false); signOut(); }} className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors rounded-xl cursor-pointer">
                                            <FontAwesomeIcon icon={faRightFromBracket} className="w-4" />
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex gap-2 w-full">
                                        <Link
                                            href="/login"
                                            className="flex-1 text-center bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="flex-1 text-center border border-primary text-primary hover:bg-primary hover:text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}
