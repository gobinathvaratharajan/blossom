import * as React from "react";
import styles from "./button.module.scss";

type Intent = "primary" | "secondary" | "outline" | "ghost";
type Size = "small" | "medium" | "large" | "icon";

const intentClasses: Record<Intent, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  outline: styles.outline,
  ghost: styles.ghost,
};

const sizeClasses: Record<Size, string> = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
  icon: styles.icon,
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: Intent;
  size?: Size;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      intent = "primary",
      size = "medium",
      fullWidth = false,
      leftIcon,
      rightIcon,
      loading = false,
      children,
      disabled,
      type = "button",
      ...props
    }: ButtonProps,
    ref,
  ) => {
    const isDisabled = disabled || loading;

    const className = [
      styles.button,
      intentClasses[intent],
      sizeClasses[size],
      fullWidth ? styles.fullWidth : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={className}
        type={type}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <span className={styles.spinner} aria-hidden="true">
            ⏳
          </span>
        ) : (
          <>
            {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
            {children}
            {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  },
);

ButtonComponent.displayName = "Button";

export const Button = React.memo(ButtonComponent);
