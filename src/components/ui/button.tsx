import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl shadow-[3px_3px_0px_black] transition-transform duration-300 ease-in-out transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        shadowHidden:
          "bg-medium text-primary-foreground shadow-outline active:shadow-none active:translate-x-[-3px] active:translate-y-[-3px]",
        default:
          "bg-blue text-white active:shadow-none active:translate-x-[3px] active:translate-y-[3px]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:shadow-none active:translate-x-[3px] active:translate-y-[3px]",
        outline:
          "border border-input bg-dove shadow-sm hover:bg-accent hover:text-accent-foreground active:shadow-none active:translate-x-[3px] active:translate-y-[3px]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:shadow-none active:translate-x-[3px] active:translate-y-[3px]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground active:shadow-none active:translate-x-[3px] active:translate-y-[3px]",
        link: "text-primary underline-offset-4 hover:underline active:shadow-none active:translate-x-[3px] active:translate-y-[3px]",
        none:
          "bg-slate-300 text-black hover:bg-slate-300/90 shadow-none rounded-sm",
      },
      size: {
        default: "h-[58px] w-auto md:min-w-1/5 px-5 py-4 text-md",
        sm: "h-8 rounded-2xl px-3 text-xs",
        lg: "h-10 rounded-2xl px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
