// src/components/MainContent.jsx
import React from 'react';
import KBCard from './KBCard';
import Dropdown from './Dropdown';
import { Plus, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, File as FileIcon } from 'lucide-react';

export default function MainContent({
  knowledgeBases,
  totalRows = 0,
  currentPage = 1,
  totalPages = 1,
  rowsPerPage = 10,
  searchQuery = '',
  onSearchChange,
  onCreateClick,
  onEditClick,
  onDeleteClick,
  onTogglePin,
  onRowsPerPageChange,
  onPageChange,
}) {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const hasSearch = searchQuery.trim().length > 0;

  return (
    <main className="flex-1 min-h-0 overflow-hidden bg-white">
      <div className="h-full min-h-0 px-3 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-4 flex flex-col">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 whitespace-nowrap">
            Knowledge Base
          </h1>

          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="h-8 sm:h-9 w-28 sm:w-40 md:w-44 lg:w-56 pl-9 pr-3 bg-white border border-gray-200 rounded-lg text-[11px] sm:text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
              />
            </div>

            <button
              type="button"
              onClick={onCreateClick}
              className="h-8 sm:h-9 w-9 sm:w-auto px-0 sm:px-3 lg:px-4 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white text-[11px] sm:text-sm font-medium flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 shadow-sm transition whitespace-nowrap"
              aria-label="Create New"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Create New</span>
            </button>
          </div>
        </div>

        {/* SCROLL AREA (CARDS) */}
        <div className="flex-1 min-h-0 overflow-auto content-scroll">
          <div className="min-h-full bg-white border border-gray-100 rounded-xl p-2 flex flex-col">
            {knowledgeBases.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {knowledgeBases.map((kb) => (
                  <KBCard
                    key={kb.id}
                    kb={kb}
                    onEdit={() => onEditClick?.(kb)}
                    onDelete={() => onDeleteClick?.(kb)}
                    onTogglePin={() => onTogglePin?.(kb)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="mb-4 text-gray-300">
                  <FileIcon size={72} strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-gray-700">
                  {hasSearch ? 'No matching knowledge bases' : 'No knowledge bases'}
                </h3>
                <p className="mt-1 text-xs text-gray-500 max-w-xs">
                  {hasSearch
                    ? `No knowledge bases found for "${searchQuery.trim()}". Try a different name or clear your search.`
                    : 'Create a knowledge base to start organizing your documents and get quick answers.'}
                </p>
                {hasSearch && (
                  <div className="mt-5 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => onSearchChange?.('')}
                      className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* FOOTER (PAGINATION) */}
        <div className="mt-auto pt-4 sm:pt-6 pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[10px] sm:text-xs text-gray-500">
          <span className="font-medium text-gray-600 whitespace-nowrap">{totalRows} rows</span>

          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 sm:gap-4">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="font-medium text-gray-600">Rows per page</span>
              <Dropdown
                value={rowsPerPage}
                onChange={(v) => onRowsPerPageChange?.(Number(v))}
                placement="top"
                widthClassName="w-28"
                buttonClassName="h-7 sm:h-8 px-2 border border-gray-200 rounded-md bg-white text-[10px] sm:text-xs text-gray-700 hover:bg-gray-50 transition"
                menuClassName="border-white/10"
                options={[
                  { value: 10, label: '10' },
                  { value: 20, label: '20' },
                  { value: 50, label: '50' },
                ]}
              />
            </div>

            <span className="font-medium text-gray-600 whitespace-nowrap">page {currentPage} of {totalPages}</span>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => onPageChange?.(1)}
                disabled={!canGoPrev}
                className={`hidden sm:inline-flex items-center justify-center h-8 w-8 border border-gray-200 rounded-md ${canGoPrev ? 'text-gray-600 hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed'}`}
              >
                <ChevronsLeft size={16} className="mx-auto" />
              </button>
              <button
                type="button"
                onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
                disabled={!canGoPrev}
                className={`inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 border border-gray-200 rounded-md ${canGoPrev ? 'text-gray-600 hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed'}`}
              >
                <ChevronLeft size={14} className="mx-auto sm:hidden" />
                <ChevronLeft size={16} className="mx-auto hidden sm:block" />
              </button>
              <button
                type="button"
                onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
                disabled={!canGoNext}
                className={`inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 border border-gray-200 rounded-md ${canGoNext ? 'text-gray-600 hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed'}`}
              >
                <ChevronRight size={14} className="mx-auto sm:hidden" />
                <ChevronRight size={16} className="mx-auto hidden sm:block" />
              </button>
              <button
                type="button"
                onClick={() => onPageChange?.(totalPages)}
                disabled={!canGoNext}
                className={`hidden sm:inline-flex items-center justify-center h-8 w-8 border border-gray-200 rounded-md ${canGoNext ? 'text-gray-600 hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed'}`}
              >
                <ChevronsRight size={16} className="mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
