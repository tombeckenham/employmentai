# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Core Application

EmploymentAI is a Next.js 14 application that provides AI-powered analysis of employment documents. Users upload contracts, offer letters, and other employment documents to receive detailed analysis including risk assessment, fairness evaluation, and highlighted concerns.

## Development Commands

```bash
# Development
pnpm dev                    # Start development server on localhost:3000
pnpm build                  # Build for production
pnpm start                  # Start production server
pnpm lint                   # Run ESLint
pnpm lint:fix               # Fix ESLint issues
pnpm type-check             # Run TypeScript checks
pnpm format:write           # Format code with Prettier
pnpm format:check           # Check code formatting

# Database
pnpm seed                   # Initialize database with users table

# Testing webhooks locally
ngrok http 3000             # Create public URL for webhook testing
```

## Architecture Overview

### Database Schema
The application uses Vercel Postgres with these core relationships:
- `users` ← `documents` (user uploads)
- `documents` → `document_reports` (AI analysis results)
- `document_reports` → `employers`, `employees` (extracted entities)
- `document_reports` → `highlights`, `sections` (analysis details)

Key insight: The `document_reports` table stores both the full contract text and the analysis prompt used, enabling consistency in analysis and debugging.

### AI Processing Pipeline
1. **Upload**: Files stored in Vercel Blob, metadata in Postgres
2. **Background Processing**: QStash triggers `/api/generate-report` webhook
3. **Document Analysis**: LangChain extracts text, OpenAI analyzes structure
4. **Entity Extraction**: Identifies employers, employees, salary, dates
5. **Section Analysis**: Evaluates contract fairness with risk levels
6. **Report Storage**: Structured results saved to database

### Authentication Flow
Uses NextAuth.js v5 with custom credentials provider. Password hashing with SHA-256 and salt. All document access is user-scoped through session validation.

### Background Jobs
QStash-based async processing for:
- Document report generation (`/api/generate-report`)
- Thumbnail creation (`/api/create-thumbnail`)
- Progress tracking and status updates

## Code Conventions

- **Server Components**: Preferred over client components, use dash-case naming
- **File Organization**: 
  - Server actions in `app/actions/`
  - API routes in `app/api/`
  - Reusable components in `components/`
  - Pages in `app/` directory
- **TypeScript**: All code must be TypeScript
- **JSX**: Always escape apostrophes (ESLint requirement)
- **Tailwind**: Use latest commands for opacity
- **Environment**: Configured in Vercel, use environment variables

## Key Business Logic

### Document Types Supported
Employment contracts, offer letters, termination letters, performance reviews, pay slips, and other employment documents.

### Analysis Output Structure
Each document generates:
- **Document metadata**: Type, employer, employee, role, salary
- **Highlights**: Positive and negative aspects extracted
- **Section analysis**: Detailed evaluation with risk levels (Low/Medium/High)
- **Recommendations**: AI-generated advice for each section

### Chat Context
The chat feature (`/api/chat`) uses document analysis results as context, allowing users to ask specific questions about their uploaded contracts.

## External Services

- **OpenAI**: GPT-4o-mini for analysis, embeddings for search
- **Vercel**: Postgres (database), Blob (file storage), KV (sessions)
- **Upstash**: QStash (background jobs), Redis (caching)
- **Google Places API**: Location data for salary calculator
- **Intercom**: Customer support (optional)

## Database Migration Context

Currently uses `@vercel/postgres` with direct SQL template literals. The `lib/db.ts` file exports the `sql` function used throughout the application. All database operations use parameterized queries for security.

## Development Workflow

1. Use Vercel CLI for environment variable management: `vercel env pull`
2. Run `pnpm seed` after environment setup to create database tables
3. Use ngrok for webhook testing during development
4. Environment variables are managed through Vercel dashboard, not local files