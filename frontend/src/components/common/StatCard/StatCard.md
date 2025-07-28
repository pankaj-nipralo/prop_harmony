# StatCard Component Documentation

## Overview

The `StatCard` component is a highly customizable, reusable card component designed for displaying statistics, metrics, and key performance indicators (KPIs) throughout your application. It provides multiple variants, sizes, and color themes while maintaining consistency with your design system.

## Features

- ✅ **Multiple Color Variants**: Blue, green, red, yellow, purple, gray
- ✅ **Flexible Sizing**: Small, medium, large
- ✅ **Style Variants**: Default, minimal, bordered, gradient
- ✅ **Trend Indicators**: Up, down, neutral with custom values
- ✅ **Icon Support**: Lucide React icons and custom icons
- ✅ **Currency Display**: Built-in AED currency formatting
- ✅ **Loading States**: Skeleton animation for async data
- ✅ **Interactive**: Click handlers and hover animations
- ✅ **Custom Content**: Override default layout completely
- ✅ **Responsive**: Mobile-friendly design
- ✅ **Accessible**: Proper ARIA attributes

## Installation & Import

```jsx
// Import individual components
import { StatCard, StatGrid } from '@/components/common/StatCard';

// Import from main common index
import { StatCard, StatGrid } from '@/components/common';
```

## StatCard Component

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | The main title/label for the stat |
| `value` | `string \| number` | - | The primary value/number to display |
| `subtitle` | `string` | - | Optional secondary text or description |
| `icon` | `React.ComponentType` | - | Optional icon component (from lucide-react or custom) |
| `color` | `'blue' \| 'green' \| 'red' \| 'yellow' \| 'purple' \| 'gray'` | `'blue'` | Color variant |
| `trend` | `'up' \| 'down' \| 'neutral'` | - | Optional trend indicator |
| `trendValue` | `string \| number` | - | Optional trend percentage or value |
| `className` | `string` | `''` | Additional CSS classes |
| `onClick` | `Function` | - | Optional click handler for interactive cards |
| `loading` | `boolean` | `false` | Whether the card is in loading state |
| `showCurrency` | `boolean` | `false` | Whether to show currency symbol (AED) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Card size |
| `variant` | `'default' \| 'minimal' \| 'bordered' \| 'gradient'` | `'default'` | Card variant |
| `animated` | `boolean` | `true` | Whether to show hover animations |
| `customContent` | `React.ReactNode` | - | Custom content to replace default layout |

### Basic Usage

```jsx
<StatCard 
  title="Total Properties" 
  value={24} 
  subtitle="3 new this month"
  icon={Building2}
  color="blue"
  trend="up"
  trendValue="+12%"
/>
```

## StatGrid Component

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `stats` | `Array` | `[]` | Array of stat objects to display |
| `loading` | `boolean` | `false` | Whether all cards are in loading state |
| `columns` | `number` | `4` | Number of columns in the grid (1-6) |
| `gap` | `'sm' \| 'md' \| 'lg'` | `'md'` | Gap between cards |
| `className` | `string` | `''` | Additional CSS classes |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size for all cards |
| `variant` | `'default' \| 'minimal' \| 'bordered' \| 'gradient'` | `'default'` | Variant for all cards |
| `animated` | `boolean` | `true` | Whether to show animations for all cards |
| `onCardClick` | `Function` | - | Click handler for all cards (receives stat object) |

### Basic Usage

```jsx
const stats = [
  {
    title: 'Total Properties',
    value: 24,
    icon: Building2,
    color: 'blue',
    trend: 'up',
    trendValue: '+12%'
  },
  // ... more stats
];

<StatGrid 
  stats={stats}
  columns={4}
  onCardClick={handleCardClick}
/>
```

## Color Variants

### Blue (Default)
Primary color for main metrics
```jsx
<StatCard color="blue" title="Primary Metric" value="1,234" />
```

### Green
Success metrics, positive indicators
```jsx
<StatCard color="green" title="Success Rate" value="98%" />
```

### Red
Critical alerts, negative indicators
```jsx
<StatCard color="red" title="Critical Issues" value="3" />
```

### Yellow
Revenue, financial data
```jsx
<StatCard color="yellow" title="Revenue" value={125000} showCurrency={true} />
```

### Purple
Special metrics, ratings
```jsx
<StatCard color="purple" title="Rating" value="4.8" />
```

### Gray
Neutral data, secondary metrics
```jsx
<StatCard color="gray" title="Total Views" value="1,456" />
```

## Size Variants

### Small
Compact display for dashboards
```jsx
<StatCard size="sm" title="Compact" value="42" />
```

### Medium (Default)
Standard size for most use cases
```jsx
<StatCard size="md" title="Standard" value="1,234" />
```

### Large
Prominent display for key metrics
```jsx
<StatCard size="lg" title="Important" value="98,765" />
```

## Style Variants

### Default
Standard card with shadow
```jsx
<StatCard variant="default" />
```

### Minimal
Clean design without shadow
```jsx
<StatCard variant="minimal" />
```

### Bordered
Card with colored border
```jsx
<StatCard variant="bordered" />
```

### Gradient
Gradient background with white text
```jsx
<StatCard variant="gradient" />
```

## Advanced Features

### Trend Indicators

```jsx
// Positive trend
<StatCard trend="up" trendValue="+12%" />

// Negative trend
<StatCard trend="down" trendValue="-5%" />

// Neutral trend
<StatCard trend="neutral" trendValue="0%" />
```

### Currency Display

```jsx
<StatCard 
  title="Monthly Revenue"
  value={125000}
  showCurrency={true}
  color="yellow"
/>
```

### Loading State

```jsx
<StatCard loading={true} />
```

### Interactive Cards

```jsx
<StatCard 
  title="Clickable"
  value="Click Me"
  onClick={() => alert('Clicked!')}
/>
```

### Custom Content

```jsx
<StatCard 
  color="blue"
  customContent={
    <div className="p-6">
      <h3>Custom Layout</h3>
      <div>Your custom content here</div>
    </div>
  }
/>
```

## Real-World Examples

### Property Management Dashboard

```jsx
const propertyStats = [
  {
    title: 'Total Properties',
    value: 24,
    subtitle: '3 new this month',
    icon: Building2,
    color: 'blue',
    trend: 'up',
    trendValue: '+12%'
  },
  {
    title: 'Active Tenants',
    value: 18,
    subtitle: '2 pending applications',
    icon: Users,
    color: 'green',
    trend: 'up',
    trendValue: '+5%'
  },
  {
    title: 'Monthly Revenue',
    value: 125000,
    subtitle: 'Last updated today',
    icon: DollarSign,
    color: 'yellow',
    showCurrency: true,
    trend: 'up',
    trendValue: '+8%'
  },
  {
    title: 'Occupancy Rate',
    value: '92%',
    subtitle: 'Above average',
    icon: TrendingUp,
    color: 'purple',
    trend: 'up',
    trendValue: '+3%'
  }
];

<StatGrid stats={propertyStats} columns={4} />
```

### Tenant Dashboard

```jsx
const tenantStats = [
  {
    title: 'Rent Due',
    value: 8500,
    subtitle: 'Due in 5 days',
    icon: Home,
    color: 'red',
    showCurrency: true
  },
  {
    title: 'Lease Expires',
    value: '6 months',
    subtitle: 'Renewal available',
    icon: Calendar,
    color: 'blue'
  },
  {
    title: 'Maintenance Requests',
    value: 2,
    subtitle: '1 pending approval',
    icon: Settings,
    color: 'gray'
  }
];

<StatGrid stats={tenantStats} columns={3} size="lg" />
```

## Best Practices

### 1. Color Usage
- **Blue**: Primary metrics, general data
- **Green**: Success rates, positive trends
- **Red**: Alerts, critical issues, overdue items
- **Yellow**: Financial data, revenue
- **Purple**: Ratings, special metrics
- **Gray**: Secondary or neutral data

### 2. Size Selection
- **Small**: Dense dashboards, sidebar widgets
- **Medium**: Standard dashboard cards
- **Large**: Hero metrics, key performance indicators

### 3. Trend Indicators
- Always include trend direction and value for time-series data
- Use meaningful trend periods (e.g., "vs last month")
- Consider using neutral for stable metrics

### 4. Loading States
- Always provide loading states for async data
- Use consistent loading patterns across your app

### 5. Accessibility
- Ensure sufficient color contrast
- Provide meaningful titles and subtitles
- Test with screen readers

## Integration with Existing Codebase

The StatCard component is designed to work seamlessly with your existing design system:

- Uses the same `Card` components from `@/components/ui/card`
- Follows existing color patterns and spacing
- Compatible with current icon usage (lucide-react)
- Integrates with the `cn` utility for class merging

## Migration from Existing Components

Replace existing stat card implementations:

```jsx
// Before - Custom implementation
<div className="bg-white p-6 rounded-lg shadow">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-600">Total Properties</p>
      <p className="text-2xl font-bold">24</p>
    </div>
    <Building2 className="w-6 h-6 text-blue-600" />
  </div>
</div>

// After - StatCard component
<StatCard 
  title="Total Properties"
  value={24}
  icon={Building2}
  color="blue"
/>
```
