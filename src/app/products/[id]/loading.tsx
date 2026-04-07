import React from "react";

export default function loading() {
    return (
        <>
            <section className="py-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8 animate-pulse">
                        <div className="lg:w-1/2">
                            <div className="bg-gray-200 rounded-xl h-96 w-full" />
                            <div className="flex gap-2 mt-4">
                                <div className="bg-gray-200 rounded h-20 w-20" />
                                <div className="bg-gray-200 rounded h-20 w-20" />
                                <div className="bg-gray-200 rounded h-20 w-20" />
                                <div className="bg-gray-200 rounded h-20 w-20" />
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex gap-2 mb-4">
                                    <div className="bg-gray-200 h-6 w-24 rounded-full" />
                                    <div className="bg-gray-200 h-6 w-20 rounded-full" />
                                </div>
                                <div className="bg-gray-200 h-8 w-3/4 rounded mb-4" />
                                <div className="bg-gray-200 h-4 w-1/3 rounded mb-6" />
                                <div className="bg-gray-200 h-10 w-1/3 rounded mb-6" />
                                <div className="bg-gray-200 h-24 w-full rounded mb-6" />
                                <div className="flex gap-4">
                                    <div className="bg-gray-200 h-14 flex-1 rounded-xl" />
                                    <div className="bg-gray-200 h-14 flex-1 rounded-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
