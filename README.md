This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app@14`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

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

You can start editing the page by modifying [`app/page.tsx`](app/page.tsx). The page auto-updates as you edit the file.

## Project Structure

- **`app/`**: Contains the front-end and server-side components, including global styles (`globals.css`), layouts (`layout.tsx`), and error pages (`not-found.tsx`).
- **`components/`**: Houses reusable UI components and libraries.
- **`config/`**: Contains configuration files such as [`keys.tsx`](config/keys.tsx).
- **`hooks/`**: Custom React hooks for shared logic.
- **`lib/`**: Utility functions and libraries.
- **`services/`**: API service integrations.
- **`utils/`**: Helper functions for the project.
- **`public/`**: Static assets like images and fonts.
- **`.next/`**: Build output and cache (ignored in version control).

## Scripts

Here are some useful scripts defined in the [`package.json`](package.json):

- `preview`: Builds the application for production and Starts the production server.
- `dev`: Starts the development server.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to check for code quality issues.

## Environment Variables

Environment variables are managed using `.env` files. Make sure to create a `.env` file based on the `.env.example` file provided in the project.
