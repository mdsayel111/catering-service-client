import React, { useState, useRef, useCallback, useEffect } from "react";

// Configuration

export default function RangeInput({ onChange, min = 0, max = 5000 }) {
  const PRICE_MIN = min;
  const PRICE_MAX = max;
  const PRICE_STEP = 10;
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const [minTooltipVisible, setMinTooltipVisible] = useState(false);
  const [maxTooltipVisible, setMaxTooltipVisible] = useState(false);
  const [activeThumb, setActiveThumb] = useState(null); // 'min', 'max', or null

  const sliderTrackRef = useRef(null);
  const trackRectRef = useRef(null);

  // Convert value ↔ percentage
  const valueToPercentage = useCallback(
    (value) => ((value - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100,
    []
  );

  const percentageToValue = useCallback((percentage) => {
    const raw = (percentage / 100) * (PRICE_MAX - PRICE_MIN) + PRICE_MIN;
    return Math.round(raw / PRICE_STEP) * PRICE_STEP;
  }, []);

  const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  const handleStart = (e, thumbType) => {
    e.preventDefault();
    if (sliderTrackRef.current) {
      trackRectRef.current = sliderTrackRef.current.getBoundingClientRect();
    }
    setActiveThumb(thumbType);
    if (thumbType === "min") setMinTooltipVisible(true);
    else setMaxTooltipVisible(true);
  };

  // Handle drag move
  useEffect(() => {
    const handleMove = (e) => {
      if (!activeThumb || !trackRectRef.current) return;

      const clientX = getClientX(e);
      let newX = clientX - trackRectRef.current.left;

      // Clamp
      newX = Math.max(0, Math.min(newX, trackRectRef.current.width));
      const newPercent = (newX / trackRectRef.current.width) * 100;
      let newValue = percentageToValue(newPercent);

      if (activeThumb === "min") {
        if (newValue >= maxVal) newValue = maxVal - PRICE_STEP;
        setMinVal(newValue);
      } else {
        if (newValue <= minVal) newValue = minVal + PRICE_STEP;
        setMaxVal(newValue);
      }
    };

    const handleEnd = () => {
      setActiveThumb(null);
      setMinTooltipVisible(false);
      setMaxTooltipVisible(false);
    };

    if (activeThumb) {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleMove, { passive: false });
      document.addEventListener("touchend", handleEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [activeThumb, minVal, maxVal, percentageToValue]);

  // Update parent when values change
  useEffect(() => {
    if (onChange) onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  const minPercent = valueToPercentage(minVal);
  const maxPercent = valueToPercentage(maxVal);

  return (
    <div className="w-[calc(100%-1.5rem)] mx-auto bg-white rounded-lg">
      {/* Slider */}
      <div className="relative w-full h-8 lg:h-12 flex items-center">
        {/* Track */}
        <div
          ref={sliderTrackRef}
          className="absolute w-full h-2 bg-gray-200 rounded-full"
        ></div>

        {/* Active Range */}
        <div
          className="absolute h-2 bg-black rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        ></div>

        {/* Min Thumb */}
        <div
          className="absolute w-6 h-6 bg-white border-2 border-blue-500 rounded-full shadow-md cursor-pointer z-10"
          style={{
            left: `${minPercent}%`,
            transform: "translateX(-50%)",
            touchAction: "none",
          }}
          onMouseDown={(e) => handleStart(e, "min")}
          onTouchStart={(e) => handleStart(e, "min")}
        >
          <div
            className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-sm rounded-md px-2 py-1 shadow-lg transition-opacity duration-200 ${
              minTooltipVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            ${minVal}
          </div>
        </div>

        {/* Max Thumb */}
        <div
          className="absolute w-6 h-6 bg-white border-2 border-blue-500 rounded-full shadow-md cursor-pointer z-10"
          style={{
            left: `${maxPercent}%`,
            transform: "translateX(-50%)",
            touchAction: "none",
          }}
          onMouseDown={(e) => handleStart(e, "max")}
          onTouchStart={(e) => handleStart(e, "max")}
        >
          <div
            className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-sm rounded-md px-2 py-1 shadow-lg transition-opacity duration-200 ${
              maxTooltipVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            ${maxVal}
          </div>
        </div>
      </div>

      {/* Price display */}
      <p className="text-xs mt-2 text-gray-600">
        মূল্য:{" "}
        <span className="font-semibold">
          {minVal} - {maxVal}
        </span>
      </p>
    </div>
  );
}
