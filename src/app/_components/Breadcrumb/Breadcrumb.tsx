import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
            {items.map((item, index) => (
                <span key={index} className="flex items-center gap-2">
                    {index > 0 && (
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            className="w-2.5 text-mute"
                        />
                    )}
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="text-mute hover:text-primary transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-medium text-gray-900">
                            {item.label}
                        </span>
                    )}
                </span>
            ))}
        </nav>
    );
}
