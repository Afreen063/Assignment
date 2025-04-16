"use client";

import React from "react";

interface PaginationProps {
  totalItems: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (count: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  limit,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / limit);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onItemsPerPageChange(Number(e.target.value));
    onPageChange(1); // reset to first page on per-page change
  };

  return (
    <div className="flex justify-between items-center mt-6 mx-4">
      <div>
        <label className="mr-2 font-medium">Items per page:</label>
        <select
          value={limit}
          onChange={handleChange}
          className="border px-2 py-1 rounded"
        >
          {[4, 6, 8, 10, 12].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-1 rounded border ${
                currentPage === pageNum
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
