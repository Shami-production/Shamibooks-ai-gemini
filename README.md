# Shamibooks AI Mode — Gemini Backend

This is a tiny backend that lets your Shamibooks website's AI Mode talk to
Google Gemini, without exposing your API key in the browser.

## 1. Get a Gemini API key
Go to https://aistudio.google.com/app/apikey, sign in, and click "Create API key".

## 2. Deploy this project on Vercel (free)
1. Go to https://vercel.com and sign up (GitHub login is easiest).
2. Click "Add New -> Project" and import this repository.
3. Before deploying, add an Environment Variable:
   - Name: GEMINI_KEY
   - Value: (paste your key from step 1)
4. Click Deploy.

## 3. Connect it to your website
1. Copy your Vercel URL + "/api/ai" (e.g. https://your-project.vercel.app/api/ai)
2. On your Shamibooks site, type 2026AMP@ in the Help Center chatroom to open Admin Dashboard.
3. Go to AI Mode Settings, paste the URL into "AI API endpoint", leave the API key blank.
4. Save. Test it from AI Mode on your site.
