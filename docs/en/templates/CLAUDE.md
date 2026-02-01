# Project: [PROJECT NAME]

## Overview
[2-3 sentences describing the project]

## Tech Stack
- Language: [e.g., TypeScript 5.3]
- Framework: [e.g., Next.js 14]
- Database: [e.g., PostgreSQL + Prisma]
- Testing: [e.g., Jest + React Testing Library]

## Key Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run test` - Run tests
- `npm run lint` - Run linter

## Project Structure
```
src/
├── app/          # Next.js app router
├── components/   # React components
├── lib/          # Utilities and helpers
├── hooks/        # Custom React hooks
└── types/        # TypeScript types
```

## Coding Standards
- Use functional components with hooks
- Prefer named exports over default exports
- One component per file
- Tests go in `__tests__/` directories

## Important Patterns
- State management: [describe pattern]
- API calls: [describe pattern]
- Error handling: [describe pattern]

## DO NOT
- Modify files in `node_modules/`
- Commit to main directly
- Skip tests for new features

## Subagent Rules
- Always use Opus for subagents
- Announce before spawning subagents
- Summarize subagent results concisely

## Context Management
- Warn when context exceeds 60%
- Include "Context: X%" in responses when >50%
- Never auto-compact without asking
