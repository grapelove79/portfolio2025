import { useCallback } from "react";

const useScrollBlock = () => {
  const isScrollBlocked = useCallback(() => {
    return (
      document.body.classList.contains("stop-scroll--loading") ||
      document.body.classList.contains("stop-scroll--menu")
    );
  }, []);

  return isScrollBlocked;
};

export default useScrollBlock;
