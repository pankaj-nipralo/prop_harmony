/**
 * Type definitions for the Button component
 * This file provides JSDoc type definitions for better IDE support and documentation
 */

/**
 * @typedef {'blue' | 'red' | 'green' | 'yellow' | 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'outline' | 'ghost' | 'link'} ButtonVariant
 * Button style variants - includes color variants (blue, red, green, yellow) and style variants
 */

/**
 * @typedef {'sm' | 'md' | 'lg' | 'icon'} ButtonSize
 * Button size variants
 */

/**
 * @typedef {'left' | 'right'} IconPosition
 * Icon position relative to text
 */

/**
 * @typedef {'button' | 'submit' | 'reset'} ButtonType
 * HTML button types
 */

/**
 * @typedef {Object} ButtonProps
 * @property {Function} [onClick] - Click handler function
 * @property {React.ComponentType} [icon] - Icon component (from lucide-react or custom)
 * @property {string} [text] - Button text content (alternative to children)
 * @property {React.ReactNode} [children] - Button content (alternative to text)
 * @property {ButtonVariant} [variant='primary'] - Button style variant
 * @property {ButtonSize} [size='md'] - Button size
 * @property {boolean} [disabled=false] - Whether the button is disabled
 * @property {boolean} [loading=false] - Whether to show loading state
 * @property {string} [className=''] - Additional CSS classes
 * @property {ButtonType} [type='button'] - Button type for forms
 * @property {boolean} [iconOnly=false] - Whether this is an icon-only button
 * @property {IconPosition} [iconPosition='left'] - Icon position relative to text
 */

// Export types for use in other files
export const ButtonVariants = {
  // Color variants
  BLUE: 'blue',
  RED: 'red',
  GREEN: 'green',
  YELLOW: 'yellow',

  // Style variants
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger',
  SUCCESS: 'success',
  WARNING: 'warning',
  OUTLINE: 'outline',
  GHOST: 'ghost',
  LINK: 'link'
};

export const ButtonSizes = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
  ICON: 'icon'
};

export const IconPositions = {
  LEFT: 'left',
  RIGHT: 'right'
};

export const ButtonTypes = {
  BUTTON: 'button',
  SUBMIT: 'submit',
  RESET: 'reset'
};
