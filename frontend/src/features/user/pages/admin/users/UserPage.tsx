import { UserTable } from "../../../components/table/UserTable";
import { useUsers } from "../../../hooks/useUsers";

export const UserPage = () => {
  const {
    users,
    pagination,
    isLoading,
    handlePageChange,
    handleSearch,
    handleRoleChange,
  } = useUsers();

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute right-6 top-6 z-10 text-sm text-gray-500">
          Loading...
        </div>
      )}
      <UserTable
        users={users}
        pagination={pagination}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onRoleChange={handleRoleChange}
      />
    </div>
  );
};
