"use client";

import { useState } from "react";

interface IngredientSelectorProps {
    ingredients: string[];
    selectedIngredients: string[];
    onSelectionChange: (selected: string[]) => void;
}

/**
 * IngredientSelector - Allows users to select ingredients they have available.
 * Features search, select all, and clear functionality.
 */
export default function IngredientSelector({
    ingredients,
    selectedIngredients,
    onSelectionChange,
}: IngredientSelectorProps) {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter ingredients based on search query
    const filteredIngredients = ingredients.filter((ingredient) =>
        ingredient.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Toggle ingredient selection
    const toggleIngredient = (ingredient: string) => {
        if (selectedIngredients.includes(ingredient)) {
            onSelectionChange(selectedIngredients.filter((i) => i !== ingredient));
        } else {
            onSelectionChange([...selectedIngredients, ingredient]);
        }
    };

    // Select all visible ingredients
    const selectAll = () => {
        const newSelection = [...new Set([...selectedIngredients, ...filteredIngredients])];
        onSelectionChange(newSelection);
    };

    // Clear all selections
    const clearAll = () => {
        onSelectionChange([]);
        setSearchQuery("");
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sticky top-24">
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white">Your Pantry</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        {selectedIngredients.length} of {ingredients.length} selected
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-4">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search ingredients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                />
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={selectAll}
                    className="flex-1 py-2 px-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-lg transition-colors"
                >
                    Select All
                </button>
                <button
                    onClick={clearAll}
                    className="flex-1 py-2 px-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-lg transition-colors"
                >
                    Clear All
                </button>
            </div>

            {/* Ingredients list */}
            <div className="max-h-80 overflow-y-auto pr-1 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
                {filteredIngredients.map((ingredient) => {
                    const isSelected = selectedIngredients.includes(ingredient);
                    return (
                        <button
                            key={ingredient}
                            onClick={() => toggleIngredient(ingredient)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${isSelected
                                    ? "bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-500"
                                    : "bg-slate-50 dark:bg-slate-700/30 border-2 border-transparent hover:bg-slate-100 dark:hover:bg-slate-700/50"
                                }`}
                        >
                            {/* Checkbox */}
                            <div
                                className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${isSelected
                                        ? "bg-orange-500 shadow-sm"
                                        : "bg-white dark:bg-slate-600 border-2 border-slate-300 dark:border-slate-500"
                                    }`}
                            >
                                {isSelected && (
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>

                            {/* Ingredient name */}
                            <span
                                className={`text-sm capitalize ${isSelected
                                        ? "text-orange-700 dark:text-orange-300 font-medium"
                                        : "text-slate-600 dark:text-slate-300"
                                    }`}
                            >
                                {ingredient}
                            </span>
                        </button>
                    );
                })}

                {/* Empty state */}
                {filteredIngredients.length === 0 && (
                    <div className="py-8 text-center">
                        <p className="text-slate-400 dark:text-slate-500 text-sm">
                            No ingredients found
                        </p>
                    </div>
                )}
            </div>

            {/* Selected count footer */}
            {selectedIngredients.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex flex-wrap gap-1.5">
                        {selectedIngredients.slice(0, 5).map((ingredient) => (
                            <span
                                key={ingredient}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded-full capitalize"
                            >
                                {ingredient}
                            </span>
                        ))}
                        {selectedIngredients.length > 5 && (
                            <span className="inline-flex items-center px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs rounded-full">
                                +{selectedIngredients.length - 5} more
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
