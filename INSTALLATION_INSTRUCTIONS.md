# Installation Instructions

You need to install the following dependencies to fix the compilation errors:

## 1. Install styled-components and its types

```bash
npm install styled-components @types/styled-components
```

## 2. Install lucide-react for icons

```bash
npm install lucide-react
```

## 3. After installation

Once you've installed these dependencies, you can revert the temporary changes in:
- src/components/Menu.tsx
- src/components/Cart.tsx
- src/components/PaymentModal.tsx

## 4. Fixing TypeScript errors

After installing the dependencies, most of the TypeScript errors will be resolved. The remaining errors related to binding elements can be fixed by properly typing the styled components.

## 5. Fixing the App.tsx navigation error

In App.tsx, update the handleNavigate function to properly handle the page type:

```typescript
const handleNavigate = (page: string) => {
  setCurrentPage(page as Page);
};
```

And pass this function to the Home component instead of setCurrentPage directly. 