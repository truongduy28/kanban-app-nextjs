import NotSupportScreen from "@/components/Screens/NotSupportScreen";
import useDeviceWidth from "@/hooks/useDeviceWidth";
import React from "react";
const SupportProvider = ({ children }: { children: React.ReactNode }) => {
  const { isSmallScreen } = useDeviceWidth();

  return isSmallScreen ? <NotSupportScreen /> : children;
};

export default SupportProvider;
