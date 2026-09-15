import type { User } from "../../domain/entities/user.entity";
import type { UserListQuery, UserListResponse } from "../pagination";

export interface UserTableProps {
  users: User[];
  pagination: UserListResponse["meta"] | null;
  onPageChange: (page: number) => void;
  onSearch: (name: string) => void;
  onRoleChange: (role: UserListQuery["role"]) => void;
}
