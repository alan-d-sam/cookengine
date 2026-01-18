"use client";

import Link from "next/link";
import { Recipe } from "@/data/recipes";

interface RecipeCardProps {
    recipe: Recipe;
    canCook: boolean;
}

/**
 * RecipeCard - Displays a recipe preview with image, title, and metadata.
 * Shows a "Cook Now" badge when all ingredients are available.
 */
export default function RecipeCard({ recipe, canCook }: RecipeCardProps) {
    // Generate gradient based on category for placeholder images
    const categoryGradients: Record<string, string> = {
        Breakfast: "from-amber-400 to-orange-500",
        Lunch: "from-emerald-400 to-teal-500",
        Dinner: "from-rose-400 to-pink-500",
        Dessert: "from-purple-400 to-indigo-500",
        Snack: "from-cyan-400 to-blue-500",
    };

    const gradient = categoryGradients[recipe.category] || "from-gray-400 to-gray-500";

    return (
        <Link href={`/recipes/${recipe.id}`} className="group">
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Image placeholder with gradient */}
                <div
                    className={`relative h-48 bg-gradient-to-br ${gradient} flex items-center justify-center`}
                >
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <pattern id={`pattern-${recipe.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <circle cx="10" cy="10" r="2" fill="white" />
                            </pattern>
                            <rect x="0" y="0" width="100" height="100" fill={`url(#pattern-${recipe.id})`} />
                        </svg>
                    </div>

                    {/* Recipe emoji/icon based on category */}
                    <span className="text-6xl filter drop-shadow-lg">
                        {recipe.category === "Breakfast" && "🍳"}
                        {recipe.category === "Lunch" && "🥗"}
                        {recipe.category === "Dinner" && "🍲"}
                        {recipe.category === "Dessert" && "🍪"}
                        {recipe.category === "Snack" && "🥪"}
                    </span>

                    {/* Cook Now Badge */}
                    {canCook && (
                        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Cook Now
                        </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 text-xs font-medium px-3 py-1.5 rounded-full shadow">
                        {recipe.category}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                        {recipe.name}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                        {recipe.description}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {recipe.cookTime}
                        </div>

                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${recipe.difficulty === "Easy"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : recipe.difficulty === "Medium"
                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}>
                            {recipe.difficulty}
                        </span>
                    </div>

                    {/* Ingredient count */}
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                        <p className="text-xs text-slate-400 dark:text-slate-500">
                            {recipe.ingredients.length} ingredients needed
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
