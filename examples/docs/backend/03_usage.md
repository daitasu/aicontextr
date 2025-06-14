# This is a sample document

# Backend API Usage Guide

This document provides examples and guidelines for using the backend API effectively.

## API Endpoints

### Authentication

#### POST /api/v1/auth/login
Login with email and password.

```typescript
// Request
{
  "email": "user@example.com",
  "password": "securepassword"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST /api/v1/auth/register
Register a new user account.

```typescript
// Request
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "securepassword"
}

// Response
{
  "message": "User created successfully",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### User Management

#### GET /api/v1/users/profile
Get current user profile.

```typescript
// Headers
Authorization: Bearer <token>

// Response
{
  "id": "123",
  "name": "John Doe",
  "email": "user@example.com",
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z"
}
```

#### PUT /api/v1/users/profile
Update user profile.

```typescript
// Headers
Authorization: Bearer <token>

// Request
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}

// Response
{
  "message": "Profile updated successfully",
  "user": {
    "id": "123",
    "name": "John Smith",
    "email": "johnsmith@example.com"
  }
}
```

## Error Handling

### Error Response Format

```typescript
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### HTTP Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **422**: Validation Error
- **500**: Internal Server Error

## Request/Response Examples

### Creating a Resource

```bash
curl -X POST http://localhost:3000/api/v1/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Sample Post",
    "content": "This is a sample post content.",
    "tags": ["sample", "demo"]
  }'
```

### Pagination

```typescript
// Request
GET /api/v1/posts?page=1&limit=10&sort=createdAt&order=desc

// Response
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Filtering and Search

```typescript
// Request
GET /api/v1/posts?search=tutorial&category=tech&status=published

// Response
{
  "data": [
    {
      "id": "1",
      "title": "React Tutorial",
      "category": "tech",
      "status": "published"
    }
  ],
  "filters": {
    "search": "tutorial",
    "category": "tech",
    "status": "published"
  }
}
```

## Best Practices

### Request Headers

Always include appropriate headers:
```typescript
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>",
  "Accept": "application/json",
  "User-Agent": "YourApp/1.0"
}
```

### Error Handling in Client

```typescript
try {
  const response = await fetch('/api/v1/users/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const user = await response.json();
  return user;
} catch (error) {
  console.error('API Error:', error.message);
  throw error;
}
```

### Rate Limiting

Be aware of rate limits:
- **100 requests per 15 minutes** per IP
- **1000 requests per hour** per authenticated user
- Use exponential backoff for retries

This guide covers the essential patterns for backend API usage.