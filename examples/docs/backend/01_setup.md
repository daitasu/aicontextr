# This is a sample document

# Backend Setup Guide

This document provides instructions for setting up the backend development environment.

## Prerequisites

Before starting backend development, ensure you have:
- **Node.js 18+** - Latest LTS version recommended
- **npm or pnpm** - Package manager
- **Docker** - For database and services
- **Git** - Version control

## Project Structure

```
backend/
├── src/
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Express middleware
│   ├── models/        # Data models
│   ├── routes/        # API route definitions
│   ├── services/      # Business logic
│   └── utils/         # Helper functions
├── tests/             # Test files
├── config/            # Configuration files
└── docker/            # Docker configurations
```

## Environment Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your-secret-key
REDIS_URL=redis://localhost:6379
```

### 3. Database Setup

Start the database with Docker:

```bash
docker-compose up -d postgres redis
```

Run database migrations:

```bash
npm run db:migrate
npm run db:seed
```

## Development Workflow

### Starting the Server

```bash
# Development with hot reload
npm run dev

# Production build
npm run build
npm start
```

### Running Tests

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# Test coverage
npm run test:coverage
```

## API Documentation

- **Swagger UI**: `http://localhost:3000/api-docs`
- **Health Check**: `http://localhost:3000/health`
- **API Base URL**: `http://localhost:3000/api/v1`

Your backend development environment is now ready!