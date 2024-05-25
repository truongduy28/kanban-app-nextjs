import { useEffect, useState } from "react";

const useDeviceWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isSmallScreen, setIsSmaillScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setIsSmaillScreen(window.innerWidth <= 992);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width, isSmallScreen };
};

export default useDeviceWidth;
