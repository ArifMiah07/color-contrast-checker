# Deployment Guide for Next.js Contrast Checker Application

This guide provides instructions for deploying your Next.js contrast checker application to production environments.

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git (for version control)

## Project Setup

1. Create a new Next.js project:

```bash
npx create-next-app@latest contrast-checker
cd contrast-checker
```

2. Install dependencies:

```bash
npm install lucide-react
```

3. Copy all the provided files to their respective directories:
   - Components in `src/components/`
   - Utility functions in `src/utils/`
   - Configuration files in the root directory

## Local Development

To run the application locally:

```bash
npm run dev
```

This will start the development server at `http://localhost:3000`.

## Building for Production

To create an optimized production build:

```bash
npm run build
```

To test the production build locally:

```bash
npm run start
```

## Deployment Options

### 1. Vercel (Recommended)

The easiest way to deploy your Next.js application is with [Vercel](https://vercel.com), the platform from the creators of Next.js.

1. Create a Vercel account if you don't have one
2. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```
3. Deploy by running:
   ```bash
   vercel
   ```

For automatic deployments:
- Connect your GitHub repository to Vercel
- Configure auto-deployment settings

### 2. Netlify

1. Create a `netlify.toml` file in the root directory:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Deploy:
   ```bash
   netlify deploy
   ```

### 3. AWS Amplify

1. Create a new app in AWS Amplify Console
2. Connect to your repository
3. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `.next`

### 4. Docker

Create a `Dockerfile` in your project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
```

Build and run the Docker container:

```bash
docker build -t contrast-checker .
docker run -p 3000:3000 contrast-checker
```

## Performance Optimization Tips

1. **Image Optimization**: Use Next.js Image component for optimized images
2. **Code Splitting**: Already handled by Next.js
3. **Caching Strategy**: Implement cache headers:
   ```js
   // In next.config.js
   module.exports = {
     async headers() {
       return [
         {
           source: '/(.*)',
           headers: [
             {
               key: 'Cache-Control',
               value: 'public, max-age=3600, s-maxage=86400',
             },
           ],
         },
       ]
     },
   }
   ```

4. **Analytics**: Add Google Analytics or other tracking services
   ```html
   <!-- In src/app/layout.js -->
   <Script
     strategy="afterInteractive"
     src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
   />
   <Script
     id="gtag-init"
     strategy="afterInteractive"
     dangerouslySetInnerHTML={{
       __html: `
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
       `,
     }}
   />
   ```

## SEO Optimization

The application already includes basic SEO through Next.js metadata API. To further enhance SEO:

1. Add structured data (JSON-LD) for rich results:
   ```js
   // In src/app/page.js
   export const metadata = {
     // existing metadata
   };
   
   export default function Home() {
     return (
       <>
         <script
           type="application/ld+json"
           dangerouslySetInnerHTML={{
             __html: JSON.stringify({
               "@context": "https://schema.org",
               "@type": "WebApplication",
               "name": "Advanced Nested Contrast Checker",
               "description": "Professional tool for checking color contrast in nested UI layers according to WCAG 2.1 guidelines.",
               "applicationCategory": "DesignTool",
               "operatingSystem": "Any",
               "offers": {
                 "@type": "Offer",
                 "price": "0",
                 "priceCurrency": "USD"
               }
             })
           }}
         />
         {/* rest of the component */}
       </>
     );
   }
   ```

2. Create a `robots.txt` file in the public directory:
   ```txt
   User-agent: *
   Allow: /
   ```

3. Create a sitemap by adding `src/app/sitemap.js`:
   ```js
   export default function sitemap() {
     const baseUrl = 'https://yourwebsite.com';
     
     return [
       {
         url: baseUrl,
         lastModified: new Date(),
         changeFrequency: 'monthly',
         priority: 1,
       },
     ];
   }
   ```

## Security Considerations

1. Add CSP headers for enhanced security:
   ```js
   // In next.config.js
   const ContentSecurityPolicy = `
     default-src 'self';
     script-src 'self' 'unsafe-eval' 'unsafe-inline';
     style-src 'self' 'unsafe-inline';
     img-src 'self' data:;
     font-src 'self';
   `;
   
   module.exports = {
     async headers() {
       return [
         {
           source: '/(.*)',
           headers: [
             {
               key: 'Content-Security-Policy',
               value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
             },
             {
               key: 'X-XSS-Protection',
               value: '1; mode=block',
             },
             {
               key: 'X-Frame-Options',
               value: 'DENY',
             },
             {
               key: 'X-Content-Type-Options',
               value: 'nosniff',
             },
           ],
         },
       ];
     },
   }
   ```

## Maintenance Considerations

1. Set up monitoring with services like:
   - Sentry for error tracking
   - New Relic or Datadog for performance monitoring

2. Regular Updates:
   - Keep dependencies updated
   - Stay current with Next.js versions
   
3. Implement automated testing:
   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
   ```

## Conclusion

Your Next.js Contrast Checker application is now ready for deployment. Choose the deployment platform that best fits your needs, and follow the SEO and security recommendations to ensure optimal performance and visibility.