/**
 * Glassmorphism card wrapper component with hover effects.
 */
import { forwardRef } from 'react';

const Card = forwardRef(function Card(
  {
    children,
    className = '',
    hover = false,
    padding = 'p-6',
    as: Component = 'div',
    ...props
  },
  ref
) {
  const hoverClasses = hover
    ? 'hover:bg-white/10 hover:border-white/20 hover:shadow-lg cursor-pointer'
    : '';

  return (
    <Component
      ref={ref}
      className={`glass-card ${padding} ${hoverClasses} transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
});

export default Card;
