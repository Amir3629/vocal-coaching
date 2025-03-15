import React from 'react';
import { cn } from '../../../lib/utils';

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ 
  open, 
  onOpenChange, 
  children 
}) => {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={() => onOpenChange?.(false)}
          />
          <div className="z-50 p-4">{children}</div>
        </div>
      )}
    </>
  );
};

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const DialogContent: React.FC<DialogContentProps> = ({ 
  className, 
  children,
  ...props 
}) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 max-w-lg w-full max-h-[85vh] overflow-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ 
  className, 
  children,
  ...props 
}) => {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

export const DialogTitle: React.FC<DialogTitleProps> = ({ 
  className, 
  children,
  ...props 
}) => {
  return (
    <h2
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    >
      {children}
    </h2>
  );
};

interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

export const DialogDescription: React.FC<DialogDescriptionProps> = ({ 
  className, 
  children,
  ...props 
}) => {
  return (
    <p
      className={cn('text-sm text-gray-500 dark:text-gray-400', className)}
      {...props}
    >
      {children}
    </p>
  );
};

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const DialogFooter: React.FC<DialogFooterProps> = ({ 
  className, 
  children,
  ...props 
}) => {
  return (
    <div
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
      {...props}
    >
      {children}
    </div>
  );
}; 