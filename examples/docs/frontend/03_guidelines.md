# This is a sample document

# Frontend Development Guidelines

This document establishes coding standards and best practices for frontend development.

## Coding Standards

### TypeScript Guidelines

1. **Always use explicit types** for function parameters and return values
2. **Prefer interfaces over types** for object definitions
3. **Use strict mode** with `"strict": true` in tsconfig.json
4. **Avoid `any` type** - use `unknown` or proper types instead

```typescript
// Good
interface UserProps {
  id: string;
  name: string;
  email: string;
}

const UserCard: React.FC<UserProps> = ({ id, name, email }) => {
  return <div>{name}</div>;
};

// Avoid
const UserCard = (props: any) => {
  return <div>{props.name}</div>;
};
```

### React Best Practices

1. **Use functional components** with hooks
2. **Follow the Rules of Hooks** - only call at top level
3. **Memoize expensive calculations** with `useMemo`
4. **Extract custom hooks** for reusable logic

### CSS and Styling

1. **Use Tailwind CSS** for styling
2. **Follow mobile-first** responsive design
3. **Use semantic class names** when custom CSS is needed
4. **Prefer CSS modules** over global styles

```typescript
// Good - Tailwind classes
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Click me
</button>

// Good - CSS modules for complex styles
<div className={styles.complexComponent}>
  Custom styled content
</div>
```

## File Naming Conventions

- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with "use" prefix (`useUserData.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

## Testing Guidelines

### Unit Testing

- Use **React Testing Library** for component tests
- Test **behavior, not implementation**
- Write **descriptive test names**

```typescript
test('displays user name when user data is provided', () => {
  const user = { id: '1', name: 'John Doe', email: 'john@example.com' };
  render(<UserCard {...user} />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

### Integration Testing

- Test **user workflows** end-to-end
- Use **data-testid** attributes for reliable element selection
- Mock **external dependencies** appropriately

## Performance Guidelines

1. **Lazy load routes** and heavy components
2. **Optimize images** with proper formats and sizes
3. **Monitor bundle size** with webpack-bundle-analyzer
4. **Use React DevTools Profiler** to identify performance bottlenecks

These guidelines ensure consistent, maintainable, and performant frontend code.