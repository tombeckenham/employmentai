<a href="https://chat.vercel.ai/">
  <img alt="Next.js 14 and App Router-ready AI chatbot." src="https://chat.vercel.ai/opengraph-image.png">
  <h1 align="center">Next.js AI Chatbot</h1>
</a>

<p align="center">
  An open-source AI chatbot app template built with Next.js, the Vercel AI SDK, OpenAI, and Vercel KV.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a> ·
  <a href="#authors"><strong>Authors</strong></a>
</p>
<br/>

## Features

- [Next.js](https://nextjs.org) App Router
- React Server Components (RSCs), Suspense, and Server Actions
- [Vercel AI SDK](https://sdk.vercel.ai/docs) for streaming chat UI
- Support for OpenAI (default), Anthropic, Cohere, Hugging Face, or custom AI chat models and/or LangChain
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - [Radix UI](https://radix-ui.com) for headless component primitives
  - Icons from [Phosphor Icons](https://phosphoricons.com)
- Chat History, rate limiting, and session storage with [Vercel KV](https://vercel.com/storage/kv)
- [NextAuth.js](https://github.com/nextauthjs/next-auth) for authentication

## Model Providers

This template ships with OpenAI `gpt-3.5-turbo` as the default. However, thanks to the [Vercel AI SDK](https://sdk.vercel.ai/docs), you can switch LLM providers to [Anthropic](https://anthropic.com), [Cohere](https://cohere.com/), [Hugging Face](https://huggingface.co), or using [LangChain](https://js.langchain.com) with just a few lines of code.

## Deploy Your Own

You can deploy your own version of the EmploymentAI Chatbot to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?demo-title=EmploymentAI+Chatbot&demo-description=An+AI-powered+employment+chatbot+with+advanced+features&project-name=employmentai-chatbot&repository-name=employmentai-chatbot&from=templates&skippable-integrations=1&env=AUTH_SECRET%2COPENAI_API_KEY%2CKV_URL%2CKV_REST_API_URL%2CKV_REST_API_TOKEN%2CBLOB_READ_WRITE_TOKEN%2CQSTASH_TOKEN%2CGOOGLE_PLACES_API_KEY&envDescription=Required+environment+variables+for+EmploymentAI&envLink=https%3A%2F%2Fgithub.com%2Ftombeckenham%2Femploymentai%2Fblob%2Fmain%2F.env.example&teamCreateStatus=hidden&stores=[{"type":"kv"},{"type":"blob"}])

### Required Vercel Integrations

When deploying, make sure to set up:

1. **Vercel KV** - For chat history and session storage
2. **Vercel Blob** - For file uploads and storage
3. **Upstash QStash** - For background job processing (external service)

### Post-Deployment Setup

After deployment, you'll need to:

1. Configure your **OpenAI API key** in the Vercel dashboard
2. Set up **Upstash QStash** for background jobs:
   - Create account at [console.upstash.com](https://console.upstash.com/)
   - Get QStash token and add to environment variables
3. Enable **Google Places API** for location features:
   - Create project in [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Places API and create credentials
4. Configure webhooks by updating `WEBHOOK_URL` to your Vercel deployment URL

## Creating a KV Database Instance

Follow the steps outlined in the [quick start guide](https://vercel.com/docs/storage/vercel-kv/quickstart#create-a-kv-database) provided by Vercel. This guide will assist you in creating and configuring your KV database instance on Vercel, enabling your application to interact with it.

Remember to update your environment variables (`KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`) in the `.env` file with the appropriate credentials provided during the KV database setup.

## Environment Variables

This application requires several environment variables to function properly. Copy `.env.example` to `.env.local` and configure the following:

### Required Environment Variables

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `AUTH_SECRET` | Secret key for NextAuth.js authentication | Generate with `openssl rand -base64 32` or [generate-secret.vercel.app](https://generate-secret.vercel.app/32) |
| `OPENAI_API_KEY` | OpenAI API key for GPT models | [OpenAI Platform](https://platform.openai.com/account/api-keys) |
| `KV_URL` | Vercel KV database URL | [Vercel KV Dashboard](https://vercel.com/docs/storage/vercel-kv/quickstart) |
| `KV_REST_API_URL` | Vercel KV REST API endpoint | Vercel KV Dashboard |
| `KV_REST_API_TOKEN` | Vercel KV REST API token | Vercel KV Dashboard |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token | [Vercel Blob Dashboard](https://vercel.com/docs/storage/vercel-blob) |
| `QSTASH_TOKEN` | Upstash QStash token for background jobs | [Upstash Console](https://console.upstash.com/qstash) |
| `GOOGLE_PLACES_API_KEY` | Google Places API for location data | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) |

### Optional Environment Variables

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_INTERCOM_APP_ID` | Intercom customer support | [Intercom](https://www.intercom.com/) |
| `WEBHOOK_URL` | Custom webhook URL | Auto-generated if not set |

### Auto-managed by Vercel
These variables are automatically set by Vercel and should not be configured manually:
- `VERCEL_ENV`, `VERCEL_URL`, `VERCEL_PROJECT_PRODUCTION_URL`, `NODE_ENV`

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run the application. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables) for this, but a `.env.local` file is all that is necessary.

> **Important**: Never commit your `.env.local` file as it contains secrets that could compromise your accounts.

### Setup Steps

1. **Install Vercel CLI**: `npm i -g vercel`
2. **Link local instance**: `vercel link`
3. **Download environment variables**: `vercel env pull`

Alternatively, copy `.env.example` to `.env.local` and configure manually:

```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

### Install and run

```bash
pnpm install
pnpm seed
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Run ngrok

```bash
ngrok http 3000
```

This will give you a public URL that you can use to test your webhook. Add the domain of your webhook url to your developer environment variables.

e.g.

```
WEBHOOK_URL="9725-60-242-118-130.ngrok-free.app"
```

## Authors

This library is created by [Vercel](https://vercel.com) and [Next.js](https://nextjs.org) team members, with contributions from:

- Jared Palmer ([@jaredpalmer](https://twitter.com/jaredpalmer)) - [Vercel](https://vercel.com)
- Shu Ding ([@shuding\_](https://twitter.com/shuding_)) - [Vercel](https://vercel.com)
- shadcn ([@shadcn](https://twitter.com/shadcn)) - [Vercel](https://vercel.com)
