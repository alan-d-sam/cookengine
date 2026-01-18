"use client";

import { useState, useMemo } from "react";
import { recipes, getAllIngredients } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";
import IngredientSelector from "@/components/IngredientSelector";
import AIRecipeCard from "@/components/AIRecipeCard";

interface AIRecipe {
  name: string;
  ingredients: string[];
  steps: string[];
}

/**
 * Home page - Main landing page with ingredient selection and recipe filtering.
 * Shows static recipes that can be made with selected ingredients.
 * Offers AI recipe generation when no static recipes match.
 */
export default function Home() {
  // State for selected ingredients
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  // State for AI recipe
  const [aiRecipe, setAiRecipe] = useState<AIRecipe | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Get all unique ingredients from recipes
  const allIngredients = useMemo(() => getAllIngredients(), []);

  // Filter recipes based on selected ingredients
  const filteredRecipes = useMemo(() => {
    if (selectedIngredients.length === 0) {
      return { cookable: [], partial: recipes };
    }

    const normalizedSelected = selectedIngredients.map((i) => i.toLowerCase());

    const cookable: typeof recipes = [];
    const partial: typeof recipes = [];

    recipes.forEach((recipe) => {
      const recipeIngredients = recipe.ingredients.map((i) => i.toLowerCase());
      const hasAllIngredients = recipeIngredients.every((ingredient) =>
        normalizedSelected.includes(ingredient)
      );

      const hasAnyIngredient = recipeIngredients.some((ingredient) =>
        normalizedSelected.includes(ingredient)
      );

      if (hasAllIngredients) {
        cookable.push(recipe);
      } else if (hasAnyIngredient) {
        partial.push(recipe);
      }
    });

    return { cookable, partial };
  }, [selectedIngredients]);

  // Generate AI recipe
  const generateAIRecipe = async () => {
    if (selectedIngredients.length === 0) return;

    setIsLoadingAI(true);
    setAiError(null);
    setAiRecipe(null);

    try {
      const response = await fetch("/api/ai-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: selectedIngredients }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recipe");
      }

      const data = await response.json();
      setAiRecipe(data);
    } catch (error) {
      console.error("Error generating AI recipe:", error);
      setAiError("Failed to generate recipe. Please try again.");
    } finally {
      setIsLoadingAI(false);
    }
  };

  // Check if we should show the AI suggestion section
  const showAISuggestion = selectedIngredients.length > 0 && filteredRecipes.cookable.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl">🍳</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                  CookEngine
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Smart Recipe Suggestions
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="text-right">
                <p className="text-lg font-bold text-orange-500">
                  {filteredRecipes.cookable.length}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ready to cook
                </p>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
              <div className="text-right">
                <p className="text-lg font-bold text-slate-700 dark:text-slate-300">
                  {recipes.length}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total recipes
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* Sidebar - Ingredient Selector */}
          <aside className="order-2 lg:order-1">
            <IngredientSelector
              ingredients={allIngredients}
              selectedIngredients={selectedIngredients}
              onSelectionChange={setSelectedIngredients}
            />
          </aside>

          {/* Main content area */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Welcome message when no ingredients selected */}
            {selectedIngredients.length === 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-lg">
                <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🥘</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                  What&apos;s in Your Kitchen?
                </h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Select the ingredients you have from the pantry on the left, and we&apos;ll show
                  you what delicious recipes you can make!
                </p>
              </div>
            )}

            {/* Cookable recipes */}
            {filteredRecipes.cookable.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                    Ready to Cook ({filteredRecipes.cookable.length})
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredRecipes.cookable.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} canCook={true} />
                  ))}
                </div>
              </section>
            )}

            {/* AI Recipe Generation Section */}
            {showAISuggestion && (
              <section className="bg-gradient-to-br from-purple-500/5 to-indigo-500/5 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                      No Exact Matches?
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Let AI create a recipe with your ingredients
                    </p>
                  </div>
                </div>

                {!aiRecipe && !isLoadingAI && (
                  <button
                    onClick={generateAIRecipe}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate AI Recipe
                  </button>
                )}

                {isLoadingAI && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Creating your perfect recipe...
                    </p>
                  </div>
                )}

                {aiError && (
                  <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 text-center">
                    <p className="text-red-600 dark:text-red-400 text-sm mb-3">
                      {aiError}
                    </p>
                    <button
                      onClick={generateAIRecipe}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {aiRecipe && (
                  <AIRecipeCard recipe={aiRecipe} userIngredients={selectedIngredients} />
                )}
              </section>
            )}

            {/* Partial match recipes */}
            {selectedIngredients.length > 0 && filteredRecipes.partial.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-slate-400 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                    Need More Ingredients ({filteredRecipes.partial.length})
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 opacity-75">
                  {filteredRecipes.partial.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} canCook={false} />
                  ))}
                </div>
              </section>
            )}

            {/* All recipes when nothing selected */}
            {selectedIngredients.length === 0 && (
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                    All Recipes
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} canCook={false} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🍳</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                CookEngine
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Smart recipes powered by AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
