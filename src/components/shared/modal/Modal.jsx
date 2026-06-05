import { cn } from "@/utils/cn";
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, children, title, containerClassName }) => {
  // If the modal is not open, return null to avoid rendering anything
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[3px] transition-opacity duration-300"
      onClick={onClose} // Close on backdrop click
    >
      {/* Modal Content Container */}
      <div
        className={cn(
          "bg-white rounded-xl shadow-2xl w-full max-w-xl mx-4 transition-all duration-300 transform scale-100 opacity-100 max-h-[70vh] overflow-y-auto",
          containerClassName
        )}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the content
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center py-3 px-5 border-gray-200 dark:border-gray-700 sticky top-0 bg-white">
          <h3
            id="modal-title"
            className="text-xl font-bold text-black flex items-center"
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-black hover:text-red-500  transition duration-150 p-1 rounded-full"
            aria-label="Close modal"
          >
            <IoMdClose className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className={cn("p-6")}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
