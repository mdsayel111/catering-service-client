// import React from 'react'

// export default function Pagination({ totalPages, currentPage, setCurrentPage }) {
//     return (
//         <div className="flex items-center justify-center gap-2 flex-wrap py-5">
//             <button className="px-4 py-2 text-sm">Prev</button>
//             <div className='grid gap-4'
//                 style={{
//                     gridTemplateColumns: `repeat(${totalPages}, 1fr)`,
//                 }}
//             >
//                 {
//                     [...Array(totalPages).keys()].map((page, index) => (
//                         <button
//                             key={index}
//                             onClick={() => setCurrentPage(page + 1)}
//                             className={`${currentPage === page + 1 ? 'bg-black text-white' : 'bg-gray-200 hover:bg-black hover:text-white'} px-4 py-2 text-sm rounded-full aspect-square`}
//                         >
//                             {page + 1}
//                         </button>
//                     ))
//                 }
//             </div>

//             <button className="px-4 py-2 text-sm">Next</button>
//         </div>
//     )
// }

import React, { useEffect, useState } from "react";

export default function Pagination({ totalPages, currentPage, setCurrentPage }) {
  const [visibleCount, setVisibleCount] = useState(5);

  // Adjust visible page count based on screen width
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 640 ? 3 : 5); // 3 for small (<640px), 5 for larger
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine visible range
  const startPage = Math.floor((currentPage - 1) / visibleCount) * visibleCount + 1;
  const endPage = Math.min(startPage + visibleCount - 1, totalPages);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap py-5">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm rounded bg-gray-200 disabled:opacity-50"
      >
        Prev
      </button>

      <div className="flex gap-2">
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const page = startPage + i;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`${
                currentPage === page
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-black hover:text-white"
              }  text-sm rounded-full aspect-square p-2 block w-10`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm rounded bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
