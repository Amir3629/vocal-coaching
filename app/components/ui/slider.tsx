import React from 'react';
import { cn } from '../../../lib/utils';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, min = 0, max = 100, step = 1, value, defaultValue, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(Number(e.target.value));
    };

    return (
      <div className={cn('relative flex w-full touch-none select-none items-center', className)}>
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className={cn(
            'w-full h-2 appearance-none bg-gray-200 rounded-full overflow-hidden cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            'dark:bg-gray-700'
          )}
          {...props}
        />
      </div>
    );
  }
); 