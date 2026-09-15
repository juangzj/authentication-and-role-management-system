import { UserCreateForm } from "../../../components/form/UserCreateForm";

export function UserCreatePage() {
  return (
    <section className="mx-auto w-full max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create User</h1>

        <p className="mt-1 text-sm text-gray-500">
          Create a new user by providing their personal information and
          password.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <UserCreateForm />
      </div>
    </section>
  );
}
