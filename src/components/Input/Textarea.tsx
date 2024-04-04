"use client";

import React, { FC, forwardRef, TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  placeholder?: string;
}

const Textarea: FC<TextareaProps> = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ name, onChange, className, placeholder, ...props }, ref) => {
  return (
    <textarea
      {...props}
      name={name}
      rows={4}
      cols={4}
      ref={ref}
      onChange={onChange}
      placeholder={placeholder}
      className={twMerge(className)}
    />
  );
});

export default Textarea;

Textarea.displayName = "Textarea";
