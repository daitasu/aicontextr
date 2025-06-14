# This is a sample document

# Backend Configuration

This document covers configuration management and environment-specific settings for the backend API.

## Configuration Architecture

### Environment-Based Config

We use a hierarchical configuration system:

```
config/
├── default.json       # Base configuration
├── development.json   # Development overrides
├── production.json    # Production overrides
├── test.json         # Test environment
└── custom.json       # Local customizations (git-ignored)
```

### Configuration Loading

```typescript
import config from 'config';

const dbConfig = {
  host: config.get('database.host'),
  port: config.get('database.port'),
  name: config.get('database.name')
};
```

## Environment Variables

### Required Variables

```env
# Application
NODE_ENV=development|production|test
PORT=3000
API_VERSION=v1

# Database
DATABASE_URL=postgresql://user:pass@host:port/db
DATABASE_SSL=true|false

# Authentication
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=24h
BCRYPT_ROUNDS=12

# External Services
REDIS_URL=redis://localhost:6379
EMAIL_SERVICE_API_KEY=your-email-api-key
FILE_STORAGE_BUCKET=your-s3-bucket
```

### Optional Variables

```env
# Logging
LOG_LEVEL=debug|info|warn|error
LOG_FORMAT=json|text

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=http://localhost:3000
CORS_CREDENTIALS=true
```

## Database Configuration

### Connection Settings

```typescript
const dbConfig = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'myapp'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
```

### Connection Pooling

- **Development**: 2-5 connections
- **Production**: 10-20 connections
- **Test**: 1-2 connections

## Security Configuration

### CORS Settings

```typescript
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
```

### Rate Limiting

```typescript
const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
};
```

## Logging Configuration

### Log Levels

- **error**: Error conditions
- **warn**: Warning conditions
- **info**: Informational messages
- **debug**: Debug-level messages

### Log Format

```typescript
const loggerConfig = {
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
};
```

## Monitoring Configuration

### Health Checks

```typescript
const healthConfig = {
  checks: {
    database: () => db.raw('SELECT 1'),
    redis: () => redis.ping(),
    external_api: () => axios.get('/health')
  },
  timeout: 5000
};
```

This configuration setup ensures a robust and scalable backend application.