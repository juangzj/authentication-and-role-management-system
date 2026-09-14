import { useState } from "react";
import type { UserTableProps } from "../../types/users-table";
export const UserTableFilters = ({
  onSearch,
  onRoleChange,
}: Pick<UserTableProps, "onSearch" | "onRoleChange">) => {
  const [search, setSearch] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    onSearch(value);
  };
  return (
    <div className="flex flex-col gap-3 border-b border-gray-200 px-6 py-4 sm:flex-row">
      {" "}
      <input
        type="text"
        value={search}
        placeholder="Search by name..."
        onChange={handleSearchChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 sm:max-w-sm"
      />{" "}
      <select
        defaultValue=""
        onChange={(event) => {
          const role = event.target.value;
          onRoleChange(role === "" ? undefined : (role as "ADMIN" | "USER"));
        }}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
      >
        {" "}
        <option value="">All roles</option> <option value="ADMIN">Admin</option>{" "}
        <option value="USER">User</option>{" "}
      </select>{" "}
    </div>
  );
};
