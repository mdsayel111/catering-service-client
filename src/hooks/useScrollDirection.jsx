import { use, useEffect, useRef, useState } from "react";

export default function useScrollLock(threshold = 10) {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);

  const lockScroll = () => {
    window.scrollTo({
      top: lastScrollY.current,
      behavior: "auto", // no animation
    });
  };

  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (currentScrollY <= threshold) {
        setScrollDirection("down");
        lastScrollY.current = currentScrollY;
        return;
      }

      if (Math.abs(currentScrollY - lastScrollY.current) < threshold) return;

      const direction = currentScrollY > lastScrollY.current ? "down" : "up";
      if (direction !== scrollDirection) {
        setScrollDirection(direction);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [threshold, scrollDirection]);

  return { scrollDirection, scrollY, lockScroll };
}
