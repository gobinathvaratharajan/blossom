import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
}

const buttonVariants = cva(
  'inline-block cursor-pointer border-0 rounded-full font-bold leading-none font-sans',
  {
    variants: {
      intent: {
        primary: 'bg-blossom-500 text-white',
        secondary: 'bg-transparent text-gray-800 shadow-inner',
      },
      size: {
        small: 'px-3 py-2 text-xs',
        medium: 'px-4 py-2 text-sm',
        large: 'px-5 py-3 text-base',
      },
    },
    defaultVariants: {
      intent: 'secondary',
      size: 'medium',
    },
  }
);

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  className,
  ...props
}: ButtonProps & VariantProps<typeof buttonVariants>) => {
  const intent = primary ? 'primary' : 'secondary';

  const merged = twMerge(
    clsx(buttonVariants({ intent, size }), className)
  );

  return (
    <button
      type="button"
      className={merged}
      style={backgroundColor ? { backgroundColor } : undefined}
      {...props}
    >
      {label}
    </button>
  );
};
