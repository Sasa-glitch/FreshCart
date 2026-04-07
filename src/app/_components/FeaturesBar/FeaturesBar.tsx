import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTruck,
    faRotateLeft,
    faShieldHalved,
    faHeadset,
} from "@fortawesome/free-solid-svg-icons";

const features = [
    {
        icon: faTruck,
        title: "Free Shipping",
        subtitle: "On orders over 500 EGP",
    },
    {
        icon: faRotateLeft,
        title: "Easy Returns",
        subtitle: "14-day return policy",
    },
    {
        icon: faShieldHalved,
        title: "Secure Payment",
        subtitle: "100% secure checkout",
    },
    {
        icon: faHeadset,
        title: "24/7 Support",
        subtitle: "Contact us anytime",
    },
];

export default function FeaturesBar() {
    return (
        <section className="bg-mute-lightest border-y border-mute-light py-5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="flex items-center gap-3"
                        >
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                <FontAwesomeIcon
                                    icon={feature.icon}
                                    className="w-4 text-primary"
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-gray-900">
                                    {feature.title}
                                </p>
                                <p className="text-xs text-mute">
                                    {feature.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
