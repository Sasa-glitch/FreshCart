import React from "react";
import CategoriesHead from "../_components/CategoriesHead/CategoriesHead";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { callCategories } from "@/api/services/route.services";
import { Category } from "@/api/types";
import CategoriesCard from "../_components/CategoriesCard/CategoriesCard";

export default async function page() {
    const categories: Category[] | undefined = await callCategories();
    return (
        <>
            <CategoriesHead />
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {categories?.map((category) => {
                        return (
                            <CategoriesCard
                                category={category}
                                key={category._id}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}
