import { IoCloseOutline } from "react-icons/io5";

const Drawer = ({
  isOpen,
  onClose,
  side = "left",
  width = "w-64 md:w-72",
  children,
  title,
}) => {

  // Determine position and translation classes based on the 'side' prop
  const positionClasses = side === "right" ? "right-0" : "left-0";

  // Determine the transformation needed for open/closed states
  // If 'left', closed is '-translate-x-full'. If 'right', closed is 'translate-x-full'.
  const closedTransform =
    side === "right" ? "translate-x-full" : "-translate-x-full";
  const openTransform = "translate-x-0"; // Same for both sides when open

  // CSS classes for the drawer panel's state
  const drawerClasses = `
        fixed top-0 h-full bg-white shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${positionClasses} 
        ${width} 
        ${isOpen ? openTransform : closedTransform}
    `;

  // CSS classes for the backdrop/overlay
  const backdropClasses = `
        fixed inset-0 bg-black z-40
        transition-opacity duration-300 ease-in-out
        ${
          isOpen
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
    `;

  return (
    <>
      {/* Backdrop/Overlay */}
      <div
        className={backdropClasses}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Drawer Panel */}
      <div
        className={drawerClasses}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        <div className="flex flex-col h-full"
        onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header/Close Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-extrabold text-indigo-700">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-2 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
            >
              <IoCloseOutline className="w-8 h-8" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
