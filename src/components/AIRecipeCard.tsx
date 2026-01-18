"use client";

interface AIRecipe {
    name: string;
    ingredients: string[];
    steps: string[];
}

interface AIRecipeCardProps {
    recipe: AIRecipe;
    userIngredients: string[];
}

/**
 * AIRecipeCard - Displays an AI-generated recipe with distinct styling.
 * Highlights which ingredients the user has vs what's added by AI.
 */
export default function AIRecipeCard({ recipe, userIngredients }: AIRecipeCardProps) {
    // Normalize ingredients for comparison
    const normalizedUserIngredients = userIngredients.map((i) => i.toLowerCase());

    return (
        <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-2xl overflow-hidden border-2 border-purple-300 dark:border-purple-700 shadow-xl">
            {/* Header with AI badge */}
            <div className="relative bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
                <div className="flex items-center gap-3">
                    {/* AI Icon */}
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                AI Generated
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-white">{recipe.name}</h3>
                    </div>
                </div>

                {/* Decorative sparkles */}
                <div className="absolute right-6 top-4 opacity-50">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6L12 2z" />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Ingredients Section */}
                <div className="mb-6">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
                        <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Ingredients
                    </h4>

                    <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient, index) => {
                            const isUserIngredient = normalizedUserIngredients.includes(ingredient.toLowerCase());

                            return (
                                <li
                                    key={index}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isUserIngredient
                                            ? "bg-green-100 dark:bg-green-900/30"
                                            : "bg-yellow-100 dark:bg-yellow-900/30"
                                        }`}
                                >
                                    {isUserIngredient ? (
                                        <svg className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    )}
                                    <span
                                        className={`text-sm capitalize ${isUserIngredient
                                                ? "text-green-700 dark:text-green-300"
                                                : "text-yellow-700 dark:text-yellow-300"
                                            }`}
                                    >
                                        {ingredient}
                                        {!isUserIngredient && (
                                            <span className="ml-2 text-xs opacity-75">(AI suggested)</span>
                                        )}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Steps Section */}
                <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
                        <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Instructions
                    </h4>

                    <ol className="space-y-3">
                        {recipe.steps.map((step, index) => (
                            <li key={index} className="flex gap-3">
                                <span className="flex-shrink-0 w-7 h-7 bg-purple-500 text-white text-sm font-bold rounded-lg flex items-center justify-center shadow-sm">
                                    {index + 1}
                                </span>
                                <p className="text-sm text-slate-600 dark:text-slate-300 pt-1">
                                    {step}
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Footer note */}
                <div className="mt-6 pt-4 border-t border-purple-200 dark:border-purple-800">
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Recipe generated by AI based on your available ingredients
                    </p>
                </div>
            </div>
        </div>
    );
}
