# StayPulse

StayPulse is a subscription health monitoring platform with AI-powered churn prediction.

## Overview

StayPulse helps businesses track, analyze, and optimize their subscription-based services by providing actionable insights into customer behavior and subscription health. The platform monitors subscriptions in real-time, identifies at-risk customers, and provides tools to reduce churn.

## Technology Stack

### Backend (NestJS)

- **Framework**: NestJS - A progressive Node.js framework for building server-side applications
- **Database**: PostgreSQL with TypeORM for object-relational mapping
- **API Documentation**: Swagger/OpenAPI
- **Queue System**: Bull for handling background jobs
- **Configuration**: Environment-based configuration with `@nestjs/config`

### Frontend (Next.js)

- **Framework**: Next.js 15 - React framework with server-side rendering
- **UI Components**: Custom components with Tailwind CSS
- **Charting**: Recharts for data visualization
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with class-variance-authority and clsx

### DevOps

- **Containerization**: Docker with docker-compose for development environment
- **Package Management**: pnpm with workspaces for monorepo management
- **TypeScript**: Used throughout the project for type safety

## Features

- **Subscription Monitoring**: Track all active subscriptions and their status
- **Churn Prediction**: AI-powered risk assessment to identify at-risk subscribers
- **Dashboard Analytics**: Visual representation of subscription health metrics
- **Risk Factor Analysis**: Detailed breakdown of common churn reasons

## Architecture

The project is structured as a monorepo with two main applications:

1. **API** (`/apps/api`): NestJS backend service that provides:

   - RESTful API endpoints for subscription data
   - Database connectivity and ORM operations
   - Business logic for subscription monitoring

2. **Web** (`/apps/web`): Next.js frontend application that provides:
   - Dashboard for visualizing subscription metrics
   - User interface for monitoring subscription health
   - Charts and visualization of subscription trends

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Docker and docker-compose (for local development with PostgreSQL)

### Setup

1. Clone the repository

```bash
git clone https://github.com/yourusername/stay-pulse.git
cd stay-pulse
```

2. Install dependencies

```bash
pnpm install
```

3. Start the development environment

```bash
docker-compose up -d  # Start PostgreSQL
pnpm dev             # Start the API development server
```

4. In a separate terminal, start the web application

```bash
cd apps/web
pnpm dev
```

5. Access the application:
   - Frontend: http://localhost:3000
   - API: http://localhost:3001
   - API documentation: http://localhost:3001/api
