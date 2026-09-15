import { Route } from "react-router-dom";
import { ProfilePage } from "../pages/profile/ProfilePage";
import { EditProfilePage } from "../pages/profile/EditProfilePage";
import { UserPage } from "../pages/admin/users/UserPage";
import { UserEditPage } from "../pages/admin/users/UserEditPage";
import { UserCreatePage } from "../pages/admin/users/UserCreatePage";

export const userRoutes = (
  <>
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/profile/edit" element={<EditProfilePage />} />
    <Route path="/users" element={<UserPage />} />
    <Route path="/users/edit/:id" element={<UserEditPage />} />
    // TODO : Find a aunthentication and role patter to handle the routes
    <Route path="/users/create" element={<UserCreatePage />} />
  </>
);
