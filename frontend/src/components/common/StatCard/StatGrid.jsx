import React from 'react';
import { cn } from '@/lib/utils';
import StatCard from './StatCard';

/**
 * StatGrid Component for displaying multiple stat cards in a responsive grid
 * 
 * @param {Object} props - Component props
 * @param {Array} props.stats - Array of stat objects to display
 * @param {boolean} props.loading - Whether all cards are in loading state
 * @param {number} props.columns - Number of columns in the grid (1-6)
 * @param {string} props.gap - Gap between cards ('sm', 'md', 'lg')
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.size - Size for all cards ('sm', 'md', 'lg')
 * @param {string} props.variant - Variant for all cards ('default', 'minimal', 'bordered', 'gradient')
 * @param {boolean} props.animated - Whether to show animations for all cards
 * @param {Function} props.onCardClick - Click handler for all cards (receives stat object)
 */
const StatGrid = ({ 
  stats = [], 
  loading = false, 
  columns = 4,
  gap = 'md',
  className = '',
  size = 'md',
  variant = 'default',
  animated = true,
  onCardClick,
  ...props
}) => {
  // Grid column classes
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  };

  // Gap classes
  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-6',
    lg: 'gap-8'
  };

  // Handle card click
  const handleCardClick = (stat) => {
    if (onCardClick) {
      onCardClick(stat);
    } else if (stat.onClick) {
      stat.onClick(stat);
    }
  };

  return (
    <div 
      className={cn(
        "grid",
        gridCols[columns] || gridCols[4],
        gapClasses[gap] || gapClasses.md,
        className
      )}
      {...props}
    >
      {stats.map((stat, index) => (
        <StatCard
          key={stat.key || stat.id || index}
          loading={loading}
          size={size}
          variant={variant}
          animated={animated}
          onClick={() => handleCardClick(stat)}
          {...stat}
        />
      ))}
    </div>
  );
};

export default StatGrid;
