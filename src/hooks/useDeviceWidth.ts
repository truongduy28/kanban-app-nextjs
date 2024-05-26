import { useEffect, useState } from "react";

const SMALL_SCREEN_WIDTH = 992;

const useDeviceWidth = () => {
  const [width, setWidth] = useState<number | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean | null>(null);

  useEffect(() => {
    // Ensure this code only runs on the client
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWidth(window.innerWidth);
        setIsSmallScreen(window.innerWidth <= SMALL_SCREEN_WIDTH);
      };

      // Set initial values
      handleResize();

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return { width, isSmallScreen };
};

export default useDeviceWidth;
