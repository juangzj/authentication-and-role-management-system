import { useEffect, useState } from "react";
import { findAll } from "../user.api";
import type { User } from "../domain/entities";
import type { UserListQuery, UserListResponse } from "../types/pagination";

export const useUsers = (
  initialQuery: UserListQuery = { page: 1, limit: 10 },
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<UserListResponse["meta"] | null>(
    null,
  );
  const [filters, setFilters] = useState<UserListQuery>(initialQuery);
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

  return {
    users,
    pagination,
    isLoading,
    handlePageChange,
    handleSearch,
    handleRoleChange,
  };
};
