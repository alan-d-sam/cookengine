/**
 * Static recipe data for the Recipe Book application.
 * Each recipe includes ingredients, steps, and metadata.
 */

export interface Recipe {
    id: string;
    name: string;
    description: string;
    image: string;
    ingredients: string[];
    steps: string[];
    cookTime: string;
    difficulty: "Easy" | "Medium" | "Hard";
    category: "Breakfast" | "Lunch" | "Dinner" | "Dessert" | "Snack";
}

export const recipes: Recipe[] = [
    {
        id: "1",
        name: "Classic Pancakes",
        description: "Fluffy golden pancakes perfect for a weekend breakfast",
        image: "/images/pancakes.jpg",
        ingredients: ["flour", "eggs", "milk", "butter", "sugar", "baking powder"],
        steps: [
            "Mix flour, sugar, and baking powder in a large bowl",
            "Whisk eggs and milk together in a separate bowl",
            "Combine wet and dry ingredients until just mixed",
            "Melt butter in a pan over medium heat",
            "Pour batter and cook until bubbles form, then flip",
            "Serve warm with your favorite toppings",
        ],
        cookTime: "20 min",
        difficulty: "Easy",
        category: "Breakfast",
    },
    {
        id: "2",
        name: "Chicken Stir Fry",
        description: "Quick and healthy Asian-inspired stir fry",
        image: "/images/stir-fry.jpg",
        ingredients: [
            "chicken breast",
            "soy sauce",
            "garlic",
            "bell pepper",
            "broccoli",
            "vegetable oil",
            "ginger",
        ],
        steps: [
            "Slice chicken into thin strips",
            "Mince garlic and ginger",
            "Chop vegetables into bite-sized pieces",
            "Heat oil in a wok over high heat",
            "Cook chicken until golden, set aside",
            "Stir fry vegetables for 3-4 minutes",
            "Return chicken, add soy sauce, and toss to combine",
        ],
        cookTime: "25 min",
        difficulty: "Medium",
        category: "Dinner",
    },
    {
        id: "3",
        name: "Caprese Salad",
        description: "Fresh Italian salad with tomatoes and mozzarella",
        image: "/images/caprese.jpg",
        ingredients: [
            "tomatoes",
            "mozzarella",
            "basil",
            "olive oil",
            "balsamic vinegar",
            "salt",
        ],
        steps: [
            "Slice tomatoes and mozzarella into even rounds",
            "Arrange alternately on a serving plate",
            "Tuck fresh basil leaves between slices",
            "Drizzle with olive oil and balsamic vinegar",
            "Season with salt to taste",
            "Serve immediately at room temperature",
        ],
        cookTime: "10 min",
        difficulty: "Easy",
        category: "Lunch",
    },
    {
        id: "4",
        name: "Chocolate Chip Cookies",
        description: "Crispy edges, chewy centers - the perfect cookie",
        image: "/images/cookies.jpg",
        ingredients: [
            "flour",
            "butter",
            "sugar",
            "brown sugar",
            "eggs",
            "vanilla extract",
            "chocolate chips",
            "baking soda",
        ],
        steps: [
            "Cream butter with both sugars until fluffy",
            "Beat in eggs and vanilla extract",
            "Mix flour and baking soda, add to wet ingredients",
            "Fold in chocolate chips",
            "Scoop dough onto baking sheets",
            "Bake at 375°F for 10-12 minutes",
            "Cool on pan for 5 minutes before serving",
        ],
        cookTime: "30 min",
        difficulty: "Easy",
        category: "Dessert",
    },
    {
        id: "5",
        name: "Grilled Cheese Sandwich",
        description: "The ultimate comfort food with melty cheese",
        image: "/images/grilled-cheese.jpg",
        ingredients: ["bread", "butter", "cheddar cheese"],
        steps: [
            "Butter one side of each bread slice",
            "Place cheese between bread, butter side out",
            "Heat pan over medium-low heat",
            "Cook sandwich 3-4 minutes per side",
            "Press gently with spatula for even browning",
            "Slice in half and serve hot",
        ],
        cookTime: "10 min",
        difficulty: "Easy",
        category: "Lunch",
    },
    {
        id: "6",
        name: "Spaghetti Carbonara",
        description: "Creamy Italian pasta with bacon and parmesan",
        image: "/images/carbonara.jpg",
        ingredients: [
            "spaghetti",
            "bacon",
            "eggs",
            "parmesan cheese",
            "garlic",
            "black pepper",
        ],
        steps: [
            "Cook spaghetti in salted boiling water",
            "Fry bacon until crispy, add minced garlic",
            "Whisk eggs with grated parmesan and pepper",
            "Drain pasta, reserving some cooking water",
            "Toss hot pasta with bacon off heat",
            "Quickly mix in egg mixture, stirring continuously",
            "Add pasta water if needed for silky sauce",
        ],
        cookTime: "25 min",
        difficulty: "Medium",
        category: "Dinner",
    },
    {
        id: "7",
        name: "Avocado Toast",
        description: "Trendy breakfast with creamy avocado on crispy bread",
        image: "/images/avocado-toast.jpg",
        ingredients: [
            "bread",
            "avocado",
            "lemon juice",
            "salt",
            "red pepper flakes",
        ],
        steps: [
            "Toast bread until golden and crispy",
            "Cut avocado in half and remove pit",
            "Scoop flesh into a bowl and mash",
            "Add lemon juice and salt, mix well",
            "Spread avocado on toast",
            "Sprinkle with red pepper flakes",
        ],
        cookTime: "5 min",
        difficulty: "Easy",
        category: "Breakfast",
    },
    {
        id: "8",
        name: "Beef Tacos",
        description: "Mexican-style tacos with seasoned ground beef",
        image: "/images/tacos.jpg",
        ingredients: [
            "ground beef",
            "taco shells",
            "onion",
            "garlic",
            "cumin",
            "chili powder",
            "lettuce",
            "tomatoes",
            "cheese",
        ],
        steps: [
            "Dice onion and mince garlic",
            "Brown ground beef in a skillet",
            "Add onion, garlic, cumin, and chili powder",
            "Cook until onion is soft and beef is seasoned",
            "Warm taco shells according to package",
            "Fill shells with beef mixture",
            "Top with lettuce, tomatoes, and cheese",
        ],
        cookTime: "20 min",
        difficulty: "Easy",
        category: "Dinner",
    },
];

/**
 * Get all unique ingredients from the recipe collection
 */
export function getAllIngredients(): string[] {
    const ingredientSet = new Set<string>();
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            ingredientSet.add(ingredient.toLowerCase());
        });
    });
    return Array.from(ingredientSet).sort();
}

/**
 * Get a recipe by its ID
 */
export function getRecipeById(id: string): Recipe | undefined {
    return recipes.find((recipe) => recipe.id === id);
}
