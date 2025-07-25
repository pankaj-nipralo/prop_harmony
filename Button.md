# Button Component Documentation

## Overview

The `Button` component is a reusable, enhanced button that extends the base UI Button with additional features like icons, loading states, and flexible styling options. It follows the existing design system patterns and provides a consistent interface for all button interactions throughout the application.

## Features

- ✅ **Multiple Variants**: Primary, secondary, danger, outline, ghost, link
- ✅ **Flexible Sizing**: Small, medium, large, and icon-only sizes
- ✅ **Icon Support**: Left/right positioned icons or icon-only buttons
- ✅ **Loading States**: Built-in loading spinner with disabled interaction
- ✅ **Accessibility**: Proper ARIA attributes and keyboard navigation
- ✅ **TypeScript Ready**: Full prop type definitions (when TS is enabled)
- ✅ **Customizable**: Accepts custom CSS classes and additional props

## Installation & Import

```jsx
// Import from common components
import Button from '@/components/common/Button';

// Or from the index file
import { Button } from '@/components/common';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `Function` | - | Click handler function |
| `icon` | `React.ComponentType` | - | Icon component (from lucide-react or custom) |
| `text` | `string` | - | Button text content (alternative to children) |
| `children` | `React.ReactNode` | - | Button content (alternative to text) |
| `variant` | `'blue' \| 'red' \| 'green' \| 'yellow' \| 'primary' \| 'secondary' \| 'danger' \| 'outline' \| 'ghost' \| 'link'` | `'primary'` | Button color/style variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean` | `false` | Whether to show loading state |
| `className` | `string` | `''` | Additional CSS classes |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type for forms |
| `iconOnly` | `boolean` | `false` | Whether this is an icon-only button |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon position relative to text |

## Usage Examples

### Basic Button

```jsx
<Button 
  onClick={handleClick} 
  text="Click Me" 
  variant="primary" 
/>
```

### Button with Icon

```jsx
<Button 
  onClick={handleSave} 
  icon={Save} 
  text="Save Changes" 
  variant="primary" 
/>
```

### Icon-Only Button

```jsx
<Button 
  onClick={handleSettings} 
  icon={Settings} 
  iconOnly 
  variant="outline" 
/>
```

### Loading State

```jsx
<Button 
  onClick={handleSubmit}
  text="Submit"
  loading={isSubmitting}
  variant="primary"
/>
```

### Form Submit Button

```jsx
<Button 
  type="submit"
  text="Submit Form"
  variant="primary"
  disabled={!isFormValid}
/>
```

### Custom Styling

```jsx
<Button 
  text="Custom Button"
  className="shadow-lg rounded-full"
  variant="secondary"
/>
```

## Color Variants

### Blue
Bright blue button for primary actions
```jsx
<Button variant="blue" text="Blue Button" />
```

### Red
Red button for destructive or important actions
```jsx
<Button variant="red" text="Red Button" />
```

### Green
Green button for success or positive actions
```jsx
<Button variant="green" text="Green Button" />
```

### Yellow
Yellow button for warnings or attention-grabbing actions
```jsx
<Button variant="yellow" text="Yellow Button" />
```

## Style Variants

### Primary
Default blue button for primary actions
```jsx
<Button variant="primary" text="Primary Action" />
```

### Secondary
Gray button for secondary actions
```jsx
<Button variant="secondary" text="Secondary Action" />
```

### Danger
Red button for destructive actions
```jsx
<Button variant="danger" text="Delete Item" />
```

### Outline
Outlined button with transparent background
```jsx
<Button variant="outline" text="Outline Button" />
```

### Ghost
Minimal button with no background
```jsx
<Button variant="ghost" text="Ghost Button" />
```

### Link
Text-only button that looks like a link
```jsx
<Button variant="link" text="Link Button" />
```

## Sizes

### Small
```jsx
<Button size="sm" text="Small Button" />
```

### Medium (Default)
```jsx
<Button size="md" text="Medium Button" />
```

### Large
```jsx
<Button size="lg" text="Large Button" />
```

### Icon Only
```jsx
<Button size="icon" icon={Settings} iconOnly />
```

## Best Practices

### 1. Use Appropriate Variants
- **Primary**: Main actions (Save, Submit, Continue)
- **Secondary**: Secondary actions (Cancel, Back)
- **Danger**: Destructive actions (Delete, Remove)
- **Outline**: Alternative actions
- **Ghost**: Subtle actions
- **Link**: Navigation or inline actions

### 2. Icon Guidelines
- Use icons that clearly represent the action
- Keep icon-only buttons for common actions (Settings, Close, etc.)
- Position icons logically (Save icon on left, Arrow icons on appropriate sides)

### 3. Loading States
- Always use loading state for async operations
- Disable interaction during loading
- Provide clear feedback to users

### 4. Accessibility
- Use descriptive text for screen readers
- Ensure proper contrast ratios
- Test keyboard navigation

## Integration with Existing Codebase

The Button component is designed to work seamlessly with your existing design system:

- Extends the base `@/components/ui/button` component
- Uses the same `cn` utility for class merging
- Follows existing color and spacing patterns
- Compatible with current icon usage (lucide-react)

## Migration from Existing Buttons

Replace existing button implementations:

```jsx
// Before
<button 
  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
  onClick={handleSave}
>
  <Save size={16} />
  Save Changes
</button>

// After
<Button 
  onClick={handleSave}
  icon={Save}
  text="Save Changes"
  variant="primary"
/>
```

## Testing

The component includes proper event handling and state management for testing:

```jsx
// Test click events
fireEvent.click(screen.getByText('Save Changes'));

// Test loading state
expect(screen.getByText('Saving...')).toBeInTheDocument();

// Test disabled state
expect(screen.getByRole('button')).toBeDisabled();
```
