import { NextRequest, NextResponse } from "next/server";

/**
 * AI Recipe Generation API Route
 * 
 * Accepts selected ingredients and generates a recipe using an LLM.
 * The AI may add up to 2 common ingredients to complete the recipe.
 * 
 * POST /api/ai-recipe
 * Body: { ingredients: string[] }
 * Response: { name: string, ingredients: string[], steps: string[] }
 */

// Type for the expected request body
interface RecipeRequest {
    ingredients: string[];
}

// Type for the AI-generated recipe response
interface AIRecipe {
    name: string;
    ingredients: string[];
    steps: string[];
}

/**
 * Generate a recipe prompt for the LLM
 */
function generatePrompt(ingredients: string[]): string {
    return `You are a helpful cooking assistant. Create ONE simple and delicious recipe using the following ingredients: ${ingredients.join(", ")}.

You may add up to 2 common pantry items (like salt, pepper, oil, water) if needed.

Respond with ONLY a valid JSON object in this exact format, no additional text:
{
  "name": "Recipe Name",
  "ingredients": ["ingredient 1", "ingredient 2", ...],
  "steps": ["Step 1 description", "Step 2 description", ...]
}

Requirements:
- Recipe name should be descriptive and appetizing
- Include 4-8 ingredients total
- Include 4-7 clear, concise cooking steps
- Steps should be actionable and easy to follow
- Use the provided ingredients as the main components`;
}

/**
 * Validate the AI response matches expected format
 */
function validateRecipe(data: unknown): data is AIRecipe {
    if (typeof data !== "object" || data === null) return false;

    const recipe = data as Record<string, unknown>;

    return (
        typeof recipe.name === "string" &&
        recipe.name.length > 0 &&
        Array.isArray(recipe.ingredients) &&
        recipe.ingredients.every((i) => typeof i === "string") &&
        recipe.ingredients.length > 0 &&
        Array.isArray(recipe.steps) &&
        recipe.steps.every((s) => typeof s === "string") &&
        recipe.steps.length > 0
    );
}

/**
 * Mock AI response for development/demo purposes
 * Replace this with actual LLM API call in production
 */
async function generateMockRecipe(ingredients: string[]): Promise<AIRecipe> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate a simple recipe based on ingredients
    const mainIngredient = ingredients[0] || "vegetables";

    const recipes: Record<string, AIRecipe> = {
        default: {
            name: `Savory ${mainIngredient.charAt(0).toUpperCase() + mainIngredient.slice(1)} Medley`,
            ingredients: [
                ...ingredients.slice(0, 4),
                "olive oil",
                "salt",
            ],
            steps: [
                `Prepare all ${ingredients.slice(0, 3).join(", ")} by washing and cutting into bite-sized pieces`,
                "Heat olive oil in a large pan over medium-high heat",
                `Add the ${mainIngredient} and cook for 3-4 minutes until slightly softened`,
                "Add remaining ingredients and cook for another 5-7 minutes",
                "Season with salt to taste",
                "Serve hot and enjoy your homemade creation!",
            ],
        },
        eggs: {
            name: "Fluffy Scrambled Eggs Delight",
            ingredients: [...ingredients, "butter", "salt"],
            steps: [
                "Crack eggs into a bowl and whisk until well combined",
                "Melt butter in a non-stick pan over medium-low heat",
                "Pour in the egg mixture and let it sit for 30 seconds",
                "Gently push eggs from edges to center, creating soft curds",
                "Remove from heat when eggs are slightly underdone",
                "Season with salt and serve immediately",
            ],
        },
        chicken: {
            name: "Pan-Seared Chicken with Herbs",
            ingredients: [...ingredients, "olive oil", "salt"],
            steps: [
                "Pat chicken dry and season generously with salt",
                "Heat olive oil in a skillet over medium-high heat",
                "Place chicken in pan and cook without moving for 5-6 minutes",
                "Flip and cook for another 4-5 minutes until golden",
                "Let rest for 3 minutes before slicing",
                "Garnish with available herbs and serve",
            ],
        },
        pasta: {
            name: "Quick Pantry Pasta",
            ingredients: [...ingredients, "olive oil", "garlic"],
            steps: [
                "Cook pasta according to package directions, reserve 1 cup pasta water",
                "Sauté minced garlic in olive oil until fragrant",
                "Add your vegetables and cook until tender",
                "Toss drained pasta with the sauce",
                "Add pasta water as needed to create a silky consistency",
                "Serve hot with your favorite toppings",
            ],
        },
    };

    // Select recipe based on ingredients
    const lowerIngredients = ingredients.map((i) => i.toLowerCase());

    if (lowerIngredients.some((i) => i.includes("egg"))) {
        return recipes.eggs;
    } else if (lowerIngredients.some((i) => i.includes("chicken"))) {
        return recipes.chicken;
    } else if (lowerIngredients.some((i) => i.includes("pasta") || i.includes("spaghetti"))) {
        return recipes.pasta;
    }

    return recipes.default;
}

/**
 * Call actual LLM API (OpenAI, Anthropic, or Google AI)
 * Uncomment and configure based on your preferred provider
 */
// async function callLLMApi(prompt: string): Promise<AIRecipe> {
//   // Example with OpenAI
//   const response = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//     }),
//   });
//
//   const data = await response.json();
//   const content = data.choices[0].message.content;
//   return JSON.parse(content);
// }

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body: RecipeRequest = await request.json();

        // Validate ingredients array
        if (!body.ingredients || !Array.isArray(body.ingredients) || body.ingredients.length === 0) {
            return NextResponse.json(
                { error: "Please provide at least one ingredient" },
                { status: 400 }
            );
        }

        // Filter and clean ingredients
        const cleanedIngredients = body.ingredients
            .map((i) => String(i).trim().toLowerCase())
            .filter((i) => i.length > 0)
            .slice(0, 10); // Limit to 10 ingredients

        if (cleanedIngredients.length === 0) {
            return NextResponse.json(
                { error: "No valid ingredients provided" },
                { status: 400 }
            );
        }

        // Generate the prompt (useful for actual LLM integration)
        const _prompt = generatePrompt(cleanedIngredients);

        // For demo: Use mock recipe generation
        // For production: Replace with actual LLM API call
        // const recipe = await callLLMApi(prompt);
        const recipe = await generateMockRecipe(cleanedIngredients);

        // Validate response format
        if (!validateRecipe(recipe)) {
            return NextResponse.json(
                { error: "Failed to generate valid recipe" },
                { status: 500 }
            );
        }

        return NextResponse.json(recipe);
    } catch (error) {
        console.error("AI Recipe generation error:", error);
        return NextResponse.json(
            { error: "Failed to generate recipe. Please try again." },
            { status: 500 }
        );
    }
}
