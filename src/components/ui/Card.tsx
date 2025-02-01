import React from 'react';
import { cn } from '../../utils/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'default' | 'bordered' | 'hover' | 'flat';
  padded?: boolean;
  hoverable?: boolean;
  width?: string;
  fullHeight?: boolean;
  shadow?: boolean;
  border?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant = 'default',
    padded = true,
    hoverable = false,
    width,
    fullHeight = false,
    shadow = true,
    border = true,
    children,
    ...props
  }, ref) => {
    const variants = {
      default: 'bg-white',
      bordered: 'bg-white border-2 border-gray-200',
      hover: 'bg-white hover:bg-gray-50 transition-colors duration-200',
      flat: 'bg-gray-50'
    };

    const baseClasses = cn(
      'rounded-lg overflow-hidden',
      variants[variant],
      padded && 'p-4',
      hoverable && 'transform transition-transform hover:-translate-y-1 hover:shadow-lg',
      shadow && 'shadow-md',
      border && 'border border-gray-200',
      fullHeight && 'h-full',
      width,
      className
    );

    return (
      <div
        ref={ref}
        className={baseClasses}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Fixed CardHeader Component with correct type extension
type CardHeaderProps = {
  headerTitle?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>;

export const CardHeader = ({
  className,
  headerTitle,
  subtitle,
  action,
  children,
  ...props
}: CardHeaderProps) => {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    >
      {(headerTitle || action) && (
        <div className="flex items-center justify-between gap-4">
          {headerTitle && (
            <h3 className="font-semibold leading-none tracking-tight">
              {headerTitle}
            </h3>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      {subtitle && (
        <p className="text-sm text-gray-500">{subtitle}</p>
      )}
      {children}
    </div>
  );
};

// Card Content Component
type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export const CardContent = ({
  className,
  children,
  ...props
}: CardContentProps) => {
  return (
    <div className={cn('py-2', className)} {...props}>
      {children}
    </div>
  );
};

// Card Footer Component
type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const CardFooter = ({
  className,
  children,
  ...props
}: CardFooterProps) => {
  return (
    <div
      className={cn('flex items-center pt-4', className)}
      {...props}
    >
      {children}
    </div>
  );
};