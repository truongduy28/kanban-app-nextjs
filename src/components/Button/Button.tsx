import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import Loading from "../Loading/Loading";

interface Props {
  title: string;
  className?: string;
  color?: "primary" | "secondary" | "danger" | "light";
  type?: "submit" | "button";
  onClick?: () => void;
  isLoading?: boolean;
}
const Button: React.FC<Props> = ({
  title,
  className,
  color = "primary",
  type = "button",
  onClick,
  isLoading = false,
}) => {
  const colors: string = useMemo(() => {
    switch (color) {
      case "primary":
        return "bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 hover:bg-primary-700 ";
      case "secondary":
        return "bg-secondary-600 hover:bg-secondary-700";
      case "danger":
        return "bg-[#df4759] hover:bg-";
      case "light":
        return "bg-[#d9e2ef] hover:bg-gray-200 text-gray-700";
      default:
        return "w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800";
    }
  }, [color]);
  return (
    <button
      type={type}
      className={twMerge(
        "w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
        colors,
        className
      )}
      onClick={onClick}
    >
      {isLoading ? <Loading size="xs" /> : title}
    </button>
  );
};

export default Button;
