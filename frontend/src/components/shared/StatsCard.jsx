// Reusable stats card component
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import DirhamSvg from '@/assets/Dirham';

const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  color = 'blue',
  loading = false,
  className,
  showCurrency = false,
  ...props
}) => {
  // Color variants
  const colorVariants = {
    blue: {
      icon: 'text-blue-600',
      iconBg: 'bg-blue-100/50',
      trend: 'text-blue-600'
    },
    green: {
      icon: 'text-green-600',
      iconBg: 'bg-green-100/50',
      trend: 'text-green-600'
    },
    yellow: {
      icon: 'text-yellow-600',
      iconBg: 'bg-yellow-100/50',
      trend: 'text-yellow-600'
    },
    red: {
      icon: 'text-red-600',
      iconBg: 'bg-red-100/50',
      trend: 'text-red-600'
    },
    purple: {
      icon: 'text-purple-600',
      iconBg: 'bg-purple-100/50',
      trend: 'text-purple-600'
    }
  };

  const colors = colorVariants[color] || colorVariants.blue;

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

  if (loading) {
    return (
      <Card className={cn(
        "transition-all duration-300 bg-white border-0 shadow-lg animate-pulse",
        className
      )}>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className={cn("p-2 rounded-lg", colors.iconBg)}>
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={cn(
        "transition-all duration-300 bg-white border-0 shadow-lg hover:shadow-xl hover:border-blue-500/20 cursor-pointer",
        className
      )}
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        {Icon && (
          <div className={cn("p-2 rounded-lg", colors.iconBg)}>
            <Icon className={cn("w-5 h-5", colors.icon)} />
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold text-gray-800 flex items-center gap-1">
            {showCurrency && (
              <DirhamSvg 
                size={20} 
                className="inline-block !m-0 align-middle" 
                color1="#374151" 
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
                trend === 'down' ? 'text-red-500' : 'text-gray-500'
              )}>
                {trendValue}%
              </span>
            </div>
          )}
        </div>
        
        {subtitle && (
          <p className="mt-1 text-xs text-gray-500">
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

// Stats grid component for displaying multiple stats cards
export const StatsGrid = ({ 
  stats = [], 
  loading = false, 
  columns = 4,
  className 
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  };

  return (
    <div className={cn(
      "grid gap-5",
      gridCols[columns] || gridCols[4],
      className
    )}>
      {stats.map((stat, index) => (
        <StatsCard
          key={stat.key || index}
          loading={loading}
          {...stat}
        />
      ))}
    </div>
  );
};

export default StatsCard;
