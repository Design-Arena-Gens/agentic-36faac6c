# Agentic Sales Studio

Craft persuasive customer outreach with a configurable AI-inspired sales agent. Personalize voice, channel mix, and psychological levers to sell your products, programs, and courses with conversion-focused messaging.

## Features
- Dynamic customer psychology configurator (stage, archetype, pain points, outcomes)
- Curated agent personas using proven sales frameworks and influence levers
- Multi-channel copy (email, SMS, direct message) with instant clipboard export
- Automated follow-up sequences tuned by cadence intensity
- Built with Next.js App Router, Tailwind CSS, Headless UI, and Framer Motion

## Getting Started
1. Install dependencies and build:
   ```bash
   npm install
   npm run dev
   ```
2. Visit `http://localhost:3000` to iterate in development.
3. Generate a production build:
   ```bash
   npm run build
   npm run start
   ```

## Deployment
Ready for Vercel with zero extra config. After building locally, deploy with:
```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-36faac6c
```

## Project Structure
```
app/                  # Next.js App Router routes
components/           # UI and orchestration components
lib/                  # Message composition logic and domain templates
public/               # Static assets (optional)
tailwind.config.ts    # Tailwind theme customization
```

## Customization Ideas
- Add real LLM backends (OpenAI, Anthropic) for generative variations
- Persist saved playbooks with Supabase or Prisma
- Plug in CRM webhooks to auto-send generated sequences
- Extend channel support (LinkedIn voice notes, webinar follow-ups, etc.)

---
Built for founders and teams who want automated closing power without losing the human touch.
