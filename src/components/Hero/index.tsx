"use client"

import Overline from "@/components/Overline";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearch } from "@/context/SearchContext";

const overlines = ["Fashion", "Electronics", "Furniture", "Shoes"];

export default function Hero() {
    const { setQuery } = useSearch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = form.querySelector("input");
        if (input) {
            setQuery(input.value);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start">
            <div className="flex flex-row items-center gap-6">
                {overlines.map((title, index) => (
                    <Overline key={index} title={title} />
                ))}
            </div>
            <h1 className="text-[15rem] font-extrabold uppercase">
                Shop<span className="italic">Bold</span>
            </h1>
            <p className="text-sm">
                From everyday essentials to statement pieces, Mira Shop brings you curated finds that feel like you. Fun, fierce, and fabulously you.
            </p>
            <form onSubmit={handleSubmit} className="flex items-center w-full max-w-md mx-auto mt-6">
                <div className="relative w-full">
                    <input type="text" placeholder="What You Looking For?" className="w-full pl-4 pr-10 py-2 rounded-full bg-[var(--background)] text-[var(--foreground)] border-2 border-[var(--foreground)] placeholder:text-sm focus:outline-none" />
                    <FontAwesomeIcon icon={faSearch} className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[var(--foreground)] size-4" />
                </div>
            </form>
        </div>
    )
}