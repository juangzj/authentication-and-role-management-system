import { useState } from "react";
import { useNotification } from "../../../../notifications/use-notification.context";
import type { CreateUserDto } from "../../domain/dtos/create-user.dto";
import { UserBasicFields } from "../fields/user/UserBasciFields";
import { PasswordFields } from "../fields/user/PasswordFields";
import { Button } from "../../../../components/button/Button";
import { createUser } from "../../user.api";
import axios from "axios";

const initialFormData: CreateUserDto = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
export function UserCreateForm() {
  const { showSuccess, showError } = useNotification();
  const [formData, setFormData] = useState<CreateUserDto>(initialFormData);
  const [isLoading, setIsloading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsloading(true);
    try {
      await createUser(formData);
      showSuccess("User created succesfully");
      setFormData(initialFormData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          showError("This email is already registered.");
        } else {
          showError("Something went wrong. Please try again.");
        }
      } else {
        showError("Something went wrong. Please try again.");
      }
    } finally {
      setIsloading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {" "}
      <UserBasicFields
        firstName={formData.firstName}
        lastName={formData.lastName}
        email={formData.email}
        isLoading={isLoading}
        onChange={handleChange}
      />{" "}
      <PasswordFields
        password={formData.password}
        showConfirmPassword={false}
        isLoading={isLoading}
        onChange={handleChange}
      />{" "}
      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full"
        disabled={isLoading}
      >
        {" "}
        {isLoading ? "Creating account..." : "Create User"}{" "}
      </Button>{" "}
    </form>
  );
}
