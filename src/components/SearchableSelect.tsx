"use client";

import { useState, useRef, useEffect } from "react";

interface Option {
    value: string;
    label: string;
}

interface SearchableSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    hasError?: boolean;
}

export default function SearchableSelect({
    options,
    value,
    onChange,
    placeholder = "Search...",
    hasError = false,
}: SearchableSelectProps) {
    const selectedOption = options.find((o) => o.value === value);
    const [query, setQuery] = useState(selectedOption?.label || "");
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Keep display text in sync if value changes externally
    useEffect(() => {
        const match = options.find((o) => o.value === value);
        if (match) setQuery(match.label);
    }, [value, options]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                // Restore display text to the current selection on blur
                const match = options.find((o) => o.value === value);
                setQuery(match?.label || "");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [value, options]);

    const filtered = query
        ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
        : options;

    const handleSelect = (option: Option) => {
        setQuery(option.label);
        setIsOpen(false);
        onChange(option.value);
    };

    const borderClass = hasError
        ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
        : "border-slate-300 focus:ring-blue-500/20 focus:border-blue-500";

    return (
        <div ref={wrapperRef} className="relative">
            <input
                type="text"
                autoComplete="off"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                placeholder={placeholder}
                className={`w-full px-4 py-2.5 bg-white border ${borderClass} rounded-lg text-slate-900 focus:ring-2 outline-none transition-all placeholder:text-slate-400 pr-8`}
            />

            {/* Search icon */}
            <svg
                className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>

            {/* Dropdown */}
            {isOpen && filtered.length > 0 && (
                <ul className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-52 overflow-y-auto">
                    {filtered.map((option) => (
                        <li
                            key={option.value}
                            onMouseDown={() => handleSelect(option)}
                            className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${value === option.value
                                    ? "bg-blue-50 text-blue-700 font-medium"
                                    : "text-slate-700 hover:bg-slate-50"
                                }`}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}

            {/* Empty state */}
            {isOpen && filtered.length === 0 && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg px-4 py-3 text-sm text-slate-400 italic">
                    No options found
                </div>
            )}
        </div>
    );
}
