import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold leading-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand text-white shadow-btn hover:bg-brand-dark hover:-translate-y-0.5",
        outline: "border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-white",
        soft: "bg-brand-soft text-brand-dark hover:bg-brand/15",
        ghost: "text-ink hover:opacity-60",
        link: "text-ink underline underline-offset-4 decoration-[1.5px] hover:opacity-60 px-0",
        invert: "bg-white text-ink hover:bg-white/90",
      },
      size: {
        default: "h-12 px-7 text-[0.97rem]",
        lg: "h-14 px-9 text-[1.05rem]",
        sm: "h-10 px-5 text-sm",
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
    return <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
