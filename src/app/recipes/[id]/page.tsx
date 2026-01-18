import Link from "next/link";
import { notFound } from "next/navigation";
import { recipes, getRecipeById } from "@/data/recipes";

interface PageProps {
    params: Promise<{ id: string }>;
}

/**
 * Generate static params for all recipes at build time
 */
export function generateStaticParams() {
    return recipes.map((recipe) => ({
        id: recipe.id,
    }));
}

/**
 * Recipe detail page - Shows full recipe with ingredients and steps.
 */
export default async function RecipePage({ params }: PageProps) {
    const { id } = await params;
    const recipe = getRecipeById(id);

    if (!recipe) {
        notFound();
    }

    // Category gradients for visual styling
    const categoryGradients: Record<string, string> = {
        Breakfast: "from-amber-400 to-orange-500",
        Lunch: "from-emerald-400 to-teal-500",
        Dinner: "from-rose-400 to-pink-500",
        Dessert: "from-purple-400 to-indigo-500",
        Snack: "from-cyan-400 to-blue-500",
    };

    const gradient = categoryGradients[recipe.category] || "from-gray-400 to-gray-500";

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
            {/* Hero Header */}
            <div className={`relative bg-gradient-to-br ${gradient} pt-8 pb-24`}>
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <pattern id="hero-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="10" cy="10" r="2" fill="white" />
                        </pattern>
                        <rect x="0" y="0" width="100" height="100" fill="url(#hero-pattern)" />
                    </svg>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back button */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to recipes
                    </Link>

                    {/* Recipe header */}
                    <div className="flex flex-col md:flex-row items-start gap-6">
                        {/* Recipe icon */}
                        <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                            <span className="text-5xl">
                                {recipe.category === "Breakfast" && "🍳"}
                                {recipe.category === "Lunch" && "🥗"}
                                {recipe.category === "Dinner" && "🍲"}
                                {recipe.category === "Dessert" && "🍪"}
                                {recipe.category === "Snack" && "🥪"}
                            </span>
                        </div>

                        <div className="flex-1">
                            {/* Badges */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                                    {recipe.category}
                                </span>
                                <span className={`text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm ${recipe.difficulty === "Easy"
                                        ? "bg-green-500/30 text-white"
                                        : recipe.difficulty === "Medium"
                                            ? "bg-yellow-500/30 text-white"
                                            : "bg-red-500/30 text-white"
                                    }`}>
                                    {recipe.difficulty}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                {recipe.name}
                            </h1>

                            <p className="text-white/80 text-lg mb-4">
                                {recipe.description}
                            </p>

                            {/* Meta info */}
                            <div className="flex items-center gap-4 text-white/90">
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {recipe.cookTime}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    {recipe.ingredients.length} ingredients
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                    {recipe.steps.length} steps
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-16">
                <div className="grid md:grid-cols-[1fr_2fr] gap-6">
                    {/* Ingredients card */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 h-fit">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white mb-4">
                            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Ingredients
                        </h2>

                        <ul className="space-y-2">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-3 px-3 py-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                                >
                                    <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                                    <span className="text-sm text-slate-700 dark:text-slate-200 capitalize">
                                        {ingredient}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Steps card */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white mb-4">
                            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Instructions
                        </h2>

                        <ol className="space-y-4">
                            {recipe.steps.map((step, index) => (
                                <li key={index} className="flex gap-4">
                                    <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-rose-500 text-white text-sm font-bold rounded-lg flex items-center justify-center shadow-md">
                                        {index + 1}
                                    </span>
                                    <p className="text-slate-600 dark:text-slate-300 pt-1.5 leading-relaxed">
                                        {step}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* Tips section */}
                <div className="mt-8 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-6 border border-orange-100 dark:border-orange-800">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white mb-3">
                        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Chef&apos;s Tip
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                        For best results, make sure all ingredients are at room temperature before starting.
                        Take your time with each step, and don&apos;t be afraid to adjust seasonings to taste!
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 dark:border-slate-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to all recipes
                    </Link>
                </div>
            </footer>
        </div>
    );
}
