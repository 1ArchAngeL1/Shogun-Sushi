This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Product photography

Menu photos are served as pre-compressed WebP. The originals (2880px PNGs, ~4.5 MB
each) live in `assets-src/` — git-ignored, and not deployed, because `next/image`
would otherwise have to decode a full-size PNG on the first request for every
width it serves.

After dropping new photos into `assets-src/product-photos/`, run:

```bash
npm run optimize:images
```

That writes the web-facing `.webp` files into `public/სუში გლოვოსთვის/`, regenerates
the inline blur placeholders in `src/lib/productImageBlur.ts`, and repoints any
matching paths in the menu store. Commit the `.webp` files and the blur module.

Images uploaded through the admin panel are compressed the same way on the way in,
so nothing else needs doing for those.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
