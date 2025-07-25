import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Enhanced Button component that extends the base UI Button with additional features
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Click handler function
 * @param {React.ComponentType} props.icon - Icon component (from lucide-react or custom)
 * @param {string} props.text - Button text content (alternative to children)
 * @param {React.ReactNode} props.children - Button content (alternative to text)
 * @param {string} props.variant - Button style variant ('primary', 'secondary', 'danger', 'outline', 'ghost', 'link')
 * @param {string} props.size - Button size ('sm', 'md', 'lg', 'icon')
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {boolean} props.loading - Whether to show loading state
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.type - Button type ('button', 'submit', 'reset')
 * @param {boolean} props.iconOnly - Whether this is an icon-only button
 * @param {string} props.iconPosition - Icon position ('left', 'right')
 * @param {Object} props.rest - Additional props passed to the underlying button
 */

const Button = ({
  onClick,
  icon: Icon,
  text,
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  iconOnly = false,
  iconPosition = 'left',
  ...rest
}) => {
  // Map custom variants to UI button variants and add custom colors
  const getVariantClasses = (customVariant) => {
    switch (customVariant) {
      case 'blue':
      case 'primary':
        return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm';
      case 'red':
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm';
      case 'green':
      case 'success':
        return 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm';
      case 'yellow':
      case 'warning':
        return 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500 shadow-sm';
      case 'secondary':
        return 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-sm';
      case 'outline':
        return 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500 shadow-sm';
      case 'ghost':
        return 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500';
      case 'link':
        return 'text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline';
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm';
    }
  };

  // Map custom sizes to UI button sizes
  const getSize = (customSize) => {
    switch (customSize) {
      case 'sm':
        return 'sm';
      case 'md':
        return 'default';
      case 'lg':
        return 'lg';
      case 'icon':
        return 'icon';
      default:
        return 'default';
    }
  };

  // Determine if this should be treated as icon-only
  const isIconOnly = iconOnly || (Icon && !text && !children);
  
  // Get the appropriate size for icon-only buttons
  const buttonSize = isIconOnly ? 'icon' : getSize(size);
  
  // Content to display (text prop takes precedence over children)
  const content = text || children;

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="w-4 h-4 border-2 border-current rounded-full border-t-transparent animate-spin" />
  );

  // Icon size based on button size
  const getIconSize = (buttonSize) => {
    switch (buttonSize) {
      case 'sm':
        return 14;
      case 'default':
        return 16;
      case 'lg':
        return 18;
      case 'icon':
        return 16;
      default:
        return 16;
    }
  };

  const iconSize = getIconSize(buttonSize);

  // Render icon with proper positioning
  const renderIcon = () => {
    if (loading) {
      return <LoadingSpinner />;
    }
    
    if (Icon) {
      return <Icon size={iconSize} className="shrink-0" />;
    }
    
    return null;
  };

  // Handle click events (prevent if loading or disabled)
  const handleClick = (e) => {
    if (loading || disabled) {
      e.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2',

        // Size styles
        buttonSize === 'sm' && 'h-8 px-3 text-xs',
        buttonSize === 'default' && 'h-9 px-4 py-2',
        buttonSize === 'lg' && 'h-10 px-6 text-base',
        buttonSize === 'icon' && 'h-9 w-9 p-0',

        // Variant styles
        getVariantClasses(variant),

        // Loading state styles
        loading && 'cursor-wait',

        // Custom className
        className
      )}
      {...rest}
    >
      {/* Icon-only button content */}
      {isIconOnly ? (
        renderIcon()
      ) : (
        /* Button with text and optional icon */
        <>
          {Icon && iconPosition === 'left' && renderIcon()}
          {content && (
            <span className={cn(
              'truncate',
              loading && 'opacity-70'
            )}>
              {content}
            </span>
          )}
          {Icon && iconPosition === 'right' && renderIcon()}
        </>
      )}
    </button>
  );
};

// Export the component
export default Button;

// Named export for convenience
export { Button };
