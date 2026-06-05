import React, { useEffect, useRef, useState } from "react";

export default function OutsideClickCloseWrapper({
  setIsOpen,
  className,
  children,
}) {
  const navRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      event.stopPropagation();
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={navRef} className={className}>
        {children}
      </div>
    </>
  );
}
