import React, { ReactNode, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

export type AlertColorType =
  | "danger"
  | "neutral"
  | "primary"
  | "success"
  | "warning";
export type AlertVariantType = "outlined" | "plain" | "solid";

interface AlertProps {
  className?: string;
  color?: AlertColorType;
  variant?: AlertVariantType;
  title?: string;
  titleClassName?: string;
  children?: ReactNode;
  fullWidth?: boolean;
  onClose?: () => void;
  timeout?: number | null;
}

const variantSet: { [key in AlertVariantType]: string } = {
  outlined: "bg-transparent border",
  plain: "bg-transparent",
  solid: "",
};

const colorSet: { [key in AlertColorType]: string } = {
  primary: "text-sky-600 border-sky-300  bg-sky-100",
  danger: "text-red-600 border-red-300  bg-red-100",
  neutral: "text-gray-600 border-gray-300  bg-gray-100",
  success: "text-green-600 border-green-300  bg-green-100",
  warning: "text-orange-600 border-orange-300  bg-orange-100",
};

const getAlertColor = (color: AlertColorType): string => {
  return colorSet[color] || colorSet.primary;
};

const getAlertVariant = (color: AlertVariantType): string => {
  return variantSet[color] || variantSet.solid;
};

const Alert = (props: AlertProps) => {
  const {
    children,
    title,
    className,
    color = "primary",
    variant = "solid",
    fullWidth,
    onClose,
    timeout = null,
  } = props;
  const colorStyles = useMemo(() => getAlertColor(color), [color]);
  const variantStyles = useMemo(() => getAlertVariant(variant), [variant]);

  return (
    <div
      className={twMerge(
        `flex p-4 text-sm rounded-lg transition-all ${
          fullWidth ? "w-full" : ""
        } ${colorStyles} ${variantStyles} ${className}`
      )}
      role="alert"
    >
      <svg
        aria-hidden="true"
        className="flex-shrink-0 inline w-5 h-5 mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">Danger</span>

      <div>
        {Boolean(title) && <span className="font-medium">{title}</span>}

        <div>{children}</div>
      </div>

      {Boolean(onClose) && (
        <button
          onClick={onClose}
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 "
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;
