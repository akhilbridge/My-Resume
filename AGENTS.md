# AGENTS.md

Guidance for coding agents and contributors working in this repository.

## Goals

- Preserve the premium interactive feel of the desktop hub
- Keep mobile layout stable, readable, and touch-friendly
- Prefer meaningful portfolio content over decorative placeholder copy
- Avoid breaking the local chat assistant

## Core files

- `components/portfolio-hub.tsx`: main interactive scene and popup logic
- `components/chat-assistant.tsx`: chat interface
- `app/api/chat/route.ts`: portfolio chat behavior
- `data/portfolio.ts`: structured content source
- `app/globals.css`: all major styling and responsive behavior

## Editing rules

- Update portfolio copy in `data/portfolio.ts` first when possible
- Keep component structure readable; avoid pushing large hardcoded text blobs deeper into JSX unless the UI is highly local to one card
- Prefer extending existing CSS classes instead of adding one-off inline styles
- Use clear, meaningful labels in the hub cards and orbit nodes
- Preserve the mobile breakpoint behavior below `768px`

## Responsive expectations

Desktop:

- Keep the floating scene concept
- Maintain card overlap/placement intentionally
- Avoid card collisions with the AI core and connector lines

Mobile:

- Do not rely on scene scaling alone
- Cards should stack naturally and stay full-width within the mobile gutter
- Avoid horizontal overflow
- Keep popup overlays usable inside small viewports

## Chat assistant expectations

- The current chat is a local rules-based portfolio assistant
- Do not replace it with a paid third-party API unless explicitly requested
- If new content is added, update `app/api/chat/route.ts` keyword buckets or reply logic as needed

## Verification checklist

Before finishing meaningful UI changes:

1. Run a build:
   `npm.cmd run build`
2. If build fails because of stale `.next` chunks, remove `.next` and rebuild.
3. Check that:
   - the homepage loads
   - the popup overlay still opens
   - the mobile layout does not overflow horizontally
   - the chat route still responds

## Style guidance

- Keep the design dark, atmospheric, and polished
- Favor strong hierarchy and clean spacing over clutter
- Short labels should feel intentional, not generic
- Small UI copy should still be meaningful

## Deployment assumptions

- Best default host: Vercel
- GitHub Pages is not suitable because this app uses a server route
