import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Item {
  icon: string;
  title: string;
}

interface Props {
  selected?: boolean;
  to: string;
  onClick?: () => void;
  item: Item;
  isDragging?: boolean;
}

const BoardItem = forwardRef<HTMLDivElement, Props>(
  (
    {
      selected = false,
      to,
      onClick,
      item = { icon: "", title: "" },
      isDragging,
    },
    ref
  ) => {
    const { icon, title } = item;

    const handleClick = () => {
      if (onClick) {
        onClick();
      }
    };

    return (
      <div
        onClick={handleClick}
        style={{ textDecoration: "none", color: "inherit" }}
        className={twMerge(
          "pl-5",
          isDragging ? "!cursor-pointer" : "cursor-grab"
        )}
        ref={ref}
      >
        <div
          style={{
            padding: "8px 16px",
            backgroundColor: selected ? "#f0f0f0" : "transparent",
            cursor: "pointer",
          }}
        >
          <p className="font-semibold white-space-nowrap text-ellipsis">
            {icon} {title}
          </p>
        </div>
      </div>
    );
  }
);

export default BoardItem;

BoardItem.displayName = "BoardItem";
