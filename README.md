# SpaceX Launches Portal

A Next.js application for exploring SpaceX mission launches with search functionality.

## Features

- Browse SpaceX launches with infinite scroll
- Search launches by mission or rocket name
- Favorite launches for quick access
- Dark/light theme support
- Responsive design
- Internationalization (English/Portuguese)

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Apollo Client (GraphQL)
- shadcn/ui components
- Vitest for testing
- Playwright for E2E testing
- Storybook 10

## Getting Started

### Prerequisites

- Node.js 18+, recommend 22
- Docker (optional)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

#### Development
```bash
npm run dev
```

#### Production Build
```bash
npm run build
npm start
```

#### Docker
```bash
docker-compose up
```

### Testing

#### Unit Tests
```bash
npm test
```

#### E2E Tests
```bash
npm run storybook
```

#### Linting
```bash
npm run lint
```

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - React components
- `src/lib/` - Utilities and API clients
- `src/i18n/` - Internationalization
- `messages/` - Translation files
