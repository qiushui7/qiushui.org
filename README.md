# qiushui.org

Personal blog website built with Next.js 15 and React 19.

## Tech Stack

- **Next.js 15.3.4** with App Router
- **React 19** with React Compiler
- **TypeScript 5**
- **Tailwind CSS 4**
- **Framer Motion** for animations
- **MDX** for blog posts
- **Drizzle ORM** with PostgreSQL
- **pnpm** for package management

## Getting Started

First, install pnpm if you haven't already:

```bash
npm install -g pnpm
```

Then install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the result.

## Available Scripts

```bash
pnpm dev          # Start development server (with Turbopack)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm clean        # Clean cache files
pnpm type-check   # TypeScript type checking
pnpm db:gen       # Generate Drizzle migrations
pnpm db:mig       # Run Drizzle migrations
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
