import { UserEditOwnDataForm } from "../../components/form/UserEditOwnDataForm";
import { useEditProfile } from "../../hooks";

export function EditProfilePage() {
  const { user, isLoading, handleSubmit } = useEditProfile();

  if (!user) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-gray-500">Unable to load your profile.</p>
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update your personal information.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <UserEditOwnDataForm
          user={user}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}
