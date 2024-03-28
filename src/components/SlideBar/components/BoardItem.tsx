import Link from "next/link";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Item {
  icon: string;
  title: string;
}

interface Props {
  selected?: boolean;
  to: string;
  item: Item;
  isDragging?: boolean;
  active?: boolean;
  onClick?: () => void;
}

const BoardItem = forwardRef<HTMLDivElement, Props>(
  (
    {
      selected = false,
      to,
      item = { icon: "", title: "" },
      isDragging,
      active,
      onClick,
    },
    ref
  ) => {
    const { icon, title } = item;

    return (
      <div
        style={{ textDecoration: "none", color: "inherit" }}
        className={twMerge(
          isDragging ? "!cursor-pointer" : "cursor-grab",
          active ? "bg-gray-100" : ""
        )}
        ref={ref}
        onClick={onClick}
      >
        <Link href={to}>
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
        </Link>
      </div>
    );
  }
);

export default BoardItem;

BoardItem.displayName = "BoardItem";
