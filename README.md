# Careerweb

Interactive career website for Akhil M Nair, built with Next.js App Router.

## What this project is

This site is a portfolio-style AI hub with:

- A desktop interactive scene with floating cards
- A mobile-friendly stacked layout
- Resume-backed content for experience, skills, projects, and contact
- A portfolio chat assistant with optional Gemini integration and local fallback

## Tech stack

- Next.js 15
- React 19
- TypeScript
- CSS via `app/globals.css`

## Project structure

```text
app/
  api/chat/route.ts     Chat endpoint
  globals.css           Global styles and responsive layout
  layout.tsx            App shell
  page.tsx              Home page entry

components/
  chat-assistant.tsx    Reusable chat UI
  portfolio-hub.tsx     Main interactive scene
  section-heading.tsx   Shared section heading component

data/
  portfolio.ts          Portfolio content and assistant knowledge
```

## Local development

From `C:\Users\akhil.m\Documents\Careerweb`:

```powershell
$env:APPDATA='C:\Users\akhil.m\Documents\Careerweb\.appdata'
$env:npm_config_cache='C:\Users\akhil.m\Documents\Careerweb\.npm-cache'
npm.cmd install
npm.cmd run dev
```

Open [http://localhost:3000](http://localhost:3000).

To enable real Gemini responses, copy `.env.example` to `.env.local` and set:

```powershell
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash-lite
```

## Production build

```powershell
$env:APPDATA='C:\Users\akhil.m\Documents\Careerweb\.appdata'
$env:npm_config_cache='C:\Users\akhil.m\Documents\Careerweb\.npm-cache'
npm.cmd run build
npm.cmd run start
```

## Deployment

Recommended free host: Vercel.

Why:

- This is a Next.js app
- It includes an API route at `/api/chat`
- Vercel handles Next.js deployment with minimal configuration

## Content updates

Most portfolio text can be updated in:

- `data/portfolio.ts`

Use that file for:

- Personal summary
- Skills
- Experience
- Projects
- Contact details
- Quick prompts

## Chat assistant

- UI: `components/chat-assistant.tsx`
- Logic: `app/api/chat/route.ts`

Behavior:

- If `GEMINI_API_KEY` is set, the chat calls Gemini using portfolio-aware instructions
- If no key is set, it falls back to the local rules-based portfolio assistant

## Responsive behavior

- Desktop keeps the interactive scene layout
- Mobile switches to a stacked card layout below `768px`
- Popup overlays remain usable on both desktop and mobile

## Troubleshooting

If a build fails with a missing `.next` chunk file, clear the build output and rebuild:

```powershell
Remove-Item -LiteralPath .\.next -Recurse -Force
$env:APPDATA='C:\Users\akhil.m\Documents\Careerweb\.appdata'
$env:npm_config_cache='C:\Users\akhil.m\Documents\Careerweb\.npm-cache'
npm.cmd run build
```

## Notes

- The design is intentionally scene-based on desktop, not a standard linear landing page
- Mobile layout is intentionally simplified for readability and stability
