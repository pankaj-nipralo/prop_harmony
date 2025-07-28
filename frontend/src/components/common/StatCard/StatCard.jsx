import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import DirhamSvg from '@/assets/Dirham';

/**
 * Enhanced Reusable StatCard Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The main title/label for the stat
 * @param {string|number} props.value - The primary value/number to display
 * @param {string} props.subtitle - Optional secondary text or description
 * @param {React.ComponentType} props.icon - Optional icon component (from lucide-react or custom)
 * @param {string} props.color - Color variant ('blue', 'green', 'red', 'yellow', 'purple', 'gray')
 * @param {string} props.trend - Optional trend indicator ('up', 'down', 'neutral')
 * @param {string|number} props.trendValue - Optional trend percentage or value
 * @param {string} props.className - Additional CSS classes for customization
 * @param {Function} props.onClick - Optional click handler for interactive cards
 * @param {boolean} props.loading - Whether the card is in loading state
 * @param {boolean} props.showCurrency - Whether to show currency symbol (AED)
 * @param {string} props.size - Card size ('sm', 'md', 'lg')
 * @param {string} props.variant - Card variant ('default', 'minimal', 'bordered', 'gradient')
 * @param {boolean} props.animated - Whether to show hover animations
 * @param {React.ReactNode} props.customContent - Custom content to replace default layout
 */
const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'blue',
  trend,
  trendValue,
  className = '',
  onClick,
  loading = false,
  showCurrency = false,
  size = 'md',
  variant = 'default',
  animated = true,
  customContent,
  ...props
}) => {
  // Color variants with comprehensive theming
  const colorVariants = {
    blue: {
      icon: 'text-blue-600',
      iconBg: 'bg-blue-100',
      value: 'text-blue-600',
      gradient: 'from-blue-500 to-blue-600',
      border: 'border-blue-200',
      hover: 'hover:border-blue-300'
    },
    green: {
      icon: 'text-green-600',
      iconBg: 'bg-green-100',
      value: 'text-green-600',
      gradient: 'from-green-500 to-green-600',
      border: 'border-green-200',
      hover: 'hover:border-green-300'
    },
    red: {
      icon: 'text-red-600',
      iconBg: 'bg-red-100',
      value: 'text-red-600',
      gradient: 'from-red-500 to-red-600',
      border: 'border-red-200',
      hover: 'hover:border-red-300'
    },
    yellow: {
      icon: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
      value: 'text-yellow-600',
      gradient: 'from-yellow-500 to-yellow-600',
      border: 'border-yellow-200',
      hover: 'hover:border-yellow-300'
    },
    purple: {
      icon: 'text-purple-600',
      iconBg: 'bg-purple-100',
      value: 'text-purple-600',
      gradient: 'from-purple-500 to-purple-600',
      border: 'border-purple-200',
      hover: 'hover:border-purple-300'
    },
    gray: {
      icon: 'text-gray-600',
      iconBg: 'bg-gray-100',
      value: 'text-gray-600',
      gradient: 'from-gray-500 to-gray-600',
      border: 'border-gray-200',
      hover: 'hover:border-gray-300'
    }
  };

  // Size variants
  const sizeVariants = {
    sm: {
      card: 'p-4',
      header: 'pb-2',
      title: 'text-xs',
      value: 'text-lg',
      icon: 'w-4 h-4',
      iconContainer: 'p-1.5'
    },
    md: {
      card: 'p-6',
      header: 'pb-3',
      title: 'text-sm',
      value: 'text-2xl',
      icon: 'w-5 h-5',
      iconContainer: 'p-2'
    },
    lg: {
      card: 'p-8',
      header: 'pb-4',
      title: 'text-base',
      value: 'text-3xl',
      icon: 'w-6 h-6',
      iconContainer: 'p-3'
    }
  };

  const colors = colorVariants[color] || colorVariants.blue;
  const sizes = sizeVariants[size] || sizeVariants.md;

  // Trend icon based on trend direction
  const getTrendIcon = () => {
    if (!trend) return null;
    
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-3 h-3 text-red-500" />;
      default:
        return <Minus className="w-3 h-3 text-gray-500" />;
    }
  };

  // Format value for display
  const formatValue = (val) => {
    if (loading) return '---';
    if (typeof val === 'number') {
      return val.toLocaleString();
    }
    return val;
  };

  // Get variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'minimal':
        return 'bg-white border-0 shadow-none';
      case 'bordered':
        return `bg-white border-2 ${colors.border} ${colors.hover}`;
      case 'gradient':
        return `bg-gradient-to-br ${colors.gradient} text-white border-0`;
      default:
        return 'bg-white border-0 shadow-sm';
    }
  };

  // Loading state
  if (loading) {
    return (
      <Card className={cn(
        "transition-all duration-300 animate-pulse",
        getVariantClasses(),
        sizes.card,
        className
      )}>
        <CardHeader className={cn("flex flex-row items-center justify-between", sizes.header)}>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className={cn("rounded-lg", colors.iconBg, sizes.iconContainer)}>
            <div className={cn("bg-gray-200 rounded", sizes.icon)}></div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className={cn("h-8 bg-gray-200 rounded w-16 mb-2", sizes.value)}></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </CardContent>
      </Card>
    );
  }

  // Custom content override
  if (customContent) {
    return (
      <Card 
        className={cn(
          "transition-all duration-300",
          getVariantClasses(),
          animated && "hover:shadow-lg hover:scale-105",
          onClick && "cursor-pointer",
          sizes.card,
          className
        )}
        onClick={onClick}
        {...props}
      >
        {customContent}
      </Card>
    );
  }

  return (
    <Card 
      className={cn(
        "transition-all duration-300",
        getVariantClasses(),
        animated && "hover:shadow-lg hover:scale-105",
        onClick && "cursor-pointer",
        variant === 'gradient' ? 'text-white' : '',
        className
      )}
      onClick={onClick}
      {...props}
    >
      <CardHeader className={cn("flex flex-row items-center justify-between", sizes.header)}>
        <CardTitle className={cn(
          "font-medium",
          sizes.title,
          variant === 'gradient' ? 'text-white/90' : 'text-gray-600'
        )}>
          {title}
        </CardTitle>
        {Icon && (
          <div className={cn(
            "rounded-lg",
            variant === 'gradient' ? 'bg-white/20' : colors.iconBg,
            sizes.iconContainer
          )}>
            <Icon className={cn(
              sizes.icon,
              variant === 'gradient' ? 'text-white' : colors.icon
            )} />
          </div>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-baseline gap-2">
          <div className={cn(
            "font-bold flex items-center gap-1",
            sizes.value,
            variant === 'gradient' ? 'text-white' : 'text-gray-900'
          )}>
            {showCurrency && (
              <DirhamSvg 
                size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} 
                className="inline-block !m-0 align-middle" 
                color1={variant === 'gradient' ? '#ffffff' : '#374151'} 
              />
            )}
            {formatValue(value)}
          </div>
          
          {trend && trendValue && (
            <div className="flex items-center gap-1">
              {getTrendIcon()}
              <span className={cn(
                "text-xs font-medium",
                trend === 'up' ? 'text-green-500' : 
                trend === 'down' ? 'text-red-500' : 'text-gray-500',
                variant === 'gradient' && 'text-white/80'
              )}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        
        {subtitle && (
          <p className={cn(
            "mt-1 text-xs",
            variant === 'gradient' ? 'text-white/70' : 'text-gray-500'
          )}>
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
