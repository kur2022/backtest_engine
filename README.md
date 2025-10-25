# backtest-ai-engine

Prototype backtest + AI analyzer for Indian index & stocks. Deployable to Vercel without local installation.

## Deployment (no local install)
1. Create a GitHub repo and push these files.
2. Create a Supabase project for Auth (or Firebase). Note the keys.
3. Connect your GitHub repo to Vercel and set environment variables (see `.env.example`).
4. Deploy.

## Features
- Serverless API routes for:
  - Auth (uses Supabase/Firebase)
  - Backtest endpoints (simulate strategy on historical OHLC CSV data)
  - AI analysis endpoints (pluggable to OpenAI or other LLM)
- Frontend UI (Next.js + Tailwind) with secure login and dashboard

## Notes
- This is a prototype. Replace placeholder AI logic and data connectors with production-grade services before using capital.
