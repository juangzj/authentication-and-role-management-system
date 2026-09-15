import { UserEditForm } from "../../../components/form/UserEditForm";
import { useUserEdit } from "../../../hooks";

export function UserEditPage() {
  const { user, isLoading, isSubmitting, handleSubmit, handleCancel } =
    useUserEdit();

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-gray-500">Loading user...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-gray-500">Unable to load the user.</p>
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit User</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update this user's personal information, role, and password.
        </p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <UserEditForm
          user={user}
          isLoading={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </section>
  );
}
