import { useState } from "react";

interface UseDialog {
  isShowing: boolean;
  toggle: () => void;
}

export const useDialog = (): UseDialog => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const toggle = () => setIsShowing(!isShowing);

  return {
    isShowing,
    toggle,
  };
};
