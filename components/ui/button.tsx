import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold leading-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-ink text-paper border border-ink hover:bg-[#2c2a22] hover:-translate-y-px",
        outline: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
        ghost: "text-ink hover:opacity-60",
        link: "text-ink underline underline-offset-4 decoration-[1.5px] hover:opacity-60 px-0",
        invert: "bg-paper text-ink border border-paper hover:bg-white",
      },
      size: {
        default: "h-11 px-5 text-[0.95rem]",
        lg: "h-[3.35rem] px-7 text-[1.02rem]",
        sm: "h-9 px-4 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
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
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
