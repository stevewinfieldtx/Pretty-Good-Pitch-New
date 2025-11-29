<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/14PP-Wria4xCo_zJQRiQPLbqFumamv2y0

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel

This project is configured for a static Vite deployment on Vercel (see `vercel.json`).

1. Install the Vercel CLI if you haven't already: `npm install -g vercel`
2. Log in and link the project: `vercel login` then `vercel link`
3. Ensure your `GEMINI_API_KEY` is added to the Vercel project environment variables.
4. Deploy the optimized build: `vercel --prod`

The app uses a hash-based router, so no additional Vercel rewrites are required.
