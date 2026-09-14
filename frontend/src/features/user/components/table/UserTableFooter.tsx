import type { UserTableFooterProps } from "../../types/users-table";

export const UserTableFooter = ({
  currentPage,
  totalPages,
  total,
  onPageChange,
}: UserTableFooterProps) => {
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
      <p className="text-sm text-gray-500">
        Page {currentPage} of {totalPages} · {total} users
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={!hasPreviousPage}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <button
          type="button"
          disabled={!hasNextPage}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};
