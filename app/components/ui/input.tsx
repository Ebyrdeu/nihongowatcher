import React from "react";
import {cn} from "@/lib";
import {Slot} from "@radix-ui/react-slot";
import {cva, type VariantProps} from "class-variance-authority";

const inputVariants = cva(
    "hidden",
    {
        variants: {
            variant: {
                offset: "placeholder-white/70 font-bold text-xl text-white w-[100px] outline-0 border-0  controls block bg-transparent",
            },
        },
    });
type InputElement = React.ElementRef<"input">

interface VideoInputProps extends React.ComponentPropsWithoutRef<"input">, VariantProps<typeof inputVariants> {
    asChild?: boolean;
}

const Input = React.forwardRef<InputElement, VideoInputProps>(
    ({className, variant, type, accept, asChild, ...props}, ref) => {
        const Comp = asChild ? Slot : "input";
        return (
            <Comp
                className={cn(inputVariants({variant, className}))}
                type={!type ? "file" : type}
                accept={accept}
                ref={ref}
                {...props}
            />
        );
    },
);

// Display name for the Input component
Input.displayName = "Input";

export {Input};
