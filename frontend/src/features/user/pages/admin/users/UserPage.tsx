import { useEffect, useState } from "react";
import { UserTable } from "../../../components/table/UserTable";
import { findAll } from "../../../user.api";
import type { User } from "../../../domain/entities/user.entity";
import type {
  UserListQuery,
  UserListResponse,
} from "../../../types/pagination";
export const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<UserListResponse["meta"] | null>(
    null,
  );
  const [filters, setFilters] = useState<UserListQuery>({ page: 1, limit: 10 });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const response = await findAll(filters);
        setUsers(response.data);
        setPagination(response.meta);
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, [filters]);
  const handlePageChange = (page: number) => {
    setFilters((current) => ({ ...current, page }));
  };
  const handleSearch = (name: string) => {
    setFilters((current) => ({ ...current, name: name || undefined, page: 1 }));
  };
  const handleRoleChange = (role: UserListQuery["role"]) => {
    setFilters((current) => ({ ...current, role, page: 1 }));
  };
  return (
    <div className="relative">
      {" "}
      {isLoading && (
        <div className="absolute right-6 top-6 z-10 text-sm text-gray-500">
          {" "}
          Loading...{" "}
        </div>
      )}{" "}
      <UserTable
        users={users}
        pagination={pagination}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onRoleChange={handleRoleChange}
      />{" "}
    </div>
  );
};
