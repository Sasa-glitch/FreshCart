import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faTwitter,
    faInstagram,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
    faPhone,
    faEnvelope,
    faLocationDot,
    faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import siteIcon from "@images/siteLogo.svg";

const shopLinks = [
    { label: "All Products", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "Brands", href: "/brands" },
    { label: "Electronics", href: "/products?category=electronics" },
    { label: "Men's Fashion", href: "/products?category=mens-fashion" },
    { label: "Women's Fashion", href: "/products?category=womens-fashion" },
];

const accountLinks = [
    { label: "My Account", href: "/account" },
    { label: "Order History", href: "/orders" },
    { label: "Wishlist", href: "/wish-list" },
    { label: "Shopping Cart", href: "/cart" },
    { label: "Sign In", href: "/login" },
    { label: "Create Account", href: "/register" },
];

const supportLinks = [
    { label: "Contact Us", href: "/contact" },
    { label: "Help Center", href: "/help" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns & Refunds", href: "/returns" },
    { label: "Track Order", href: "/track" },
];

const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
];

const socialLinks = [
    { icon: faFacebookF, href: "#", label: "Facebook" },
    { icon: faTwitter, href: "#", label: "Twitter" },
    { icon: faInstagram, href: "#", label: "Instagram" },
    { icon: faYoutube, href: "#", label: "YouTube" },
];

function FooterLinkGroup({
    title,
    links,
}: {
    title: string;
    links: { label: string; href: string }[];
}) {
    return (
        <div>
            <h3 className="font-bold text-white text-base mb-4">{title}</h3>
            <ul className="space-y-2.5">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link
                            href={link.href}
                            className="text-sm text-gray-400 hover:text-primary transition-colors"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="bg-dark text-gray-300 mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <Link
                            href="/"
                            className="inline-block bg-white rounded-lg px-3 py-2 mb-4"
                        >
                            <Image
                                src={siteIcon}
                                alt="FreshCart"
                                height={24}
                                width={124}
                            />
                        </Link>
                        <p className="text-sm text-gray-400 mb-6 leading-relaxed max-w-xs">
                            FreshCart is your one-stop destination for quality
                            products. From fashion to electronics, we bring you
                            the best brands at competitive prices with a
                            seamless shopping experience.
                        </p>
                        <div className="space-y-2.5 text-sm mb-6">
                            <div className="flex items-center gap-2 text-gray-400">
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className="w-3.5 text-primary"
                                />
                                <span>+1 (800) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="w-3.5 text-primary"
                                />
                                <span>support@freshcart.com</span>
                            </div>
                            <div className="flex items-start gap-2 text-gray-400">
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className="w-3.5 text-primary mt-0.5"
                                />
                                <span>
                                    123 Commerce Street, New York, NY 10001
                                </span>
                            </div>
                        </div>
                        {/* Social icons */}
                        <div className="flex gap-2">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-9 h-9 bg-dark-light hover:bg-primary rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all"
                                >
                                    <FontAwesomeIcon
                                        icon={social.icon}
                                        className="w-3.5"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    <FooterLinkGroup title="Shop" links={shopLinks} />
                    <FooterLinkGroup title="Account" links={accountLinks} />
                    <FooterLinkGroup title="Support" links={supportLinks} />
                    <FooterLinkGroup title="Legal" links={legalLinks} />
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-dark-light">
                <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-sm text-gray-500">
                        © 2026 FreshCart. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-gray-500">
                        <div className="flex items-center gap-1.5 text-sm">
                            <FontAwesomeIcon
                                icon={faCreditCard}
                                className="w-4"
                            />
                            <span>Visa</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm">
                            <FontAwesomeIcon
                                icon={faCreditCard}
                                className="w-4"
                            />
                            <span>Mastercard</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm">
                            <FontAwesomeIcon
                                icon={faCreditCard}
                                className="w-4"
                            />
                            <span>PayPal</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
