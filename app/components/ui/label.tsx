import React from "react";
import {cn} from "@/lib";
import * as LabelPrimitive from "@radix-ui/react-label";
import {cva, type VariantProps} from "class-variance-authority";

const labelVariants = cva(
    "cursor-pointer text-neutral-content text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    {
        variants: {
            variant: {
                upload: "text-3xl flex flex-col items-center justify-center w-screen h-screen border-2 border-neutral-content hover:border-secondary transition duration-350 ease-in-out border-dashed trasnisition  cursor-pointer",
            },
        },
    });

type LabelElement = React.ElementRef<typeof LabelPrimitive.Root>;

interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
    leftSection?: React.ReactNode;
}

const Label = React.forwardRef<LabelElement, LabelProps>(
    ({className, variant, leftSection, children, ...props}, ref) => {
        return <LabelPrimitive.Root
            className={cn(labelVariants({variant, className}))}
            ref={ref}
            {...props}>
            {leftSection && leftSection}
            {children}
        </LabelPrimitive.Root>;
    },
);

Label.displayName = LabelPrimitive.Root.displayName;

export {Label};
