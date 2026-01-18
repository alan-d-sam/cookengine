This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Vibe Coding

Vibe coding is a mindset-driven approach to development where creativity, flow, and intuition matter as much as syntax and structure. Instead of overthinking perfect architectures upfront, vibe coding focuses on building quickly, experimenting freely, and letting ideas evolve naturally through code. It’s about shipping features, tweaking logic, and refining design based on feel, feedback, and curiosity. Whether prototyping, hacking, or polishing side projects, vibe coding turns coding from a rigid process into an expressive, enjoyable craft.

# CookEngine

CookEngine is an AI-powered cooking assistant that generates recipes based on ingredients the user owns. It supports ingredient-based filtering and AI-generated recipe suggestions when no exact match exists.

# Features

🧺 Ingredient-Based Recipe Matching
Select ingredients you own and discover recipes you can cook right now.

✅ Full & Partial Matches
Cook Now: Recipes that use only your selected ingredients
Almost There: Recipes missing one or two ingredients

🤖 AI Recipe Generation
When no suitable recipes exist, PantryPal generates a custom recipe using AI based on your available ingredients.

📖 Detailed Recipe Pages
Step-by-step instructions with ingredient lists and images.

⚡ Fast & Modern UI
Built with Next.js App Router for smooth navigation and performance.

🔒 Secure AI Integration
AI logic runs server-side via API routes to keep keys safe.

# How It Works

* User selects the ingredients they have
* The app filters static recipes using ingredient-matching logic
* If no suitable recipe is found, AI generates a new recipe
* The recipe is displayed with clear instructions and ingredients

# Tech Stack

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
