"use client";

import { ComponentPropsWithRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputTextProps extends ComponentPropsWithRef<"input"> {
  label?: string;
}

// eslint-disable-next-line react/display-name
const InputText = forwardRef<HTMLInputElement, InputTextProps>((props, ref) => {
  const { className, label, ...otherProps } = props;
  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">
          {label}
        </label>
      )}
      <input
        className={twMerge(
          "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          className
        )}
        ref={ref}
        {...otherProps}
      />
    </div>
  );
});

export default InputText;
