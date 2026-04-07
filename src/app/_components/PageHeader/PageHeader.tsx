import React from "react";

interface PageHeaderProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    breadcrumb?: React.ReactNode;
}

export default function PageHeader({
    icon,
    title,
    subtitle,
    breadcrumb,
}: PageHeaderProps) {
    return (
        <div className="bg-linear-to-r from-primary-dark via-primary to-primary-light text-white py-8 px-6 mb-8">
            <div className="container mx-auto">
                {breadcrumb && <div className="mb-4 text-sm">{breadcrumb}</div>}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                        {icon}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <p className="text-white/80 text-sm mt-0.5">
                            {subtitle}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
