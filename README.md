# Next.js Sanity Boilerplate

A clean, ready-to-use Next.js application with Sanity CMS integration.

## Features

- ⚡ Next.js 14 with App Router
- 🎨 Sanity CMS integration
- 📝 TypeScript support
- 🎯 Clean, minimal setup
- 🚀 Ready for production

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 3. Set up Sanity Project

1. Go to [sanity.io](https://sanity.io) and create a new project
2. Copy your project ID and dataset name
3. Update the environment variables with your project details

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Run Sanity Studio

```bash
npm run sanity
```

Open [http://localhost:3333](http://localhost:3333) to access Sanity Studio.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── studio/            # Sanity Studio
├── lib/                   # Utility functions
│   ├── sanity.ts          # Sanity client
│   └── sanity.config.ts   # Sanity configuration
└── schemas/               # Sanity schemas
    ├── index.ts           # Schema exports
    └── post.ts            # Example post schema
```

## Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run sanity` - Start Sanity Studio
- `npm run sanity:build` - Build Sanity Studio
- `npm run sanity:deploy` - Deploy Sanity Studio

## Adding New Schemas

1. Create a new schema file in `src/schemas/`
2. Export the schema from `src/schemas/index.ts`
3. The schema will automatically be available in Sanity Studio

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js applications.

## License

MIT# zynva-web
