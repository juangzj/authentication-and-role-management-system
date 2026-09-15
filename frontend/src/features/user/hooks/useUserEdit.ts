import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useNotification } from "../../../notifications/use-notification.context";
import { getUserById, updateUser } from "../../user/user.api";
import type { User } from "../domain/entities";
import type { UpdateUserDto } from "../domain/dtos";

export const useUserEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) {
      showError("Invalid user ID.");
      navigate("/users");
      return;
    }

    const loadUser = async () => {
      try {
        const response = await getUserById(id);
        setUser(response.data);
      } catch (error) {
        const message = axios.isAxiosError(error)
          ? (error.response?.data?.message ?? "Unable to load the user.")
          : "Unable to load the user.";
        showError(message);
        navigate("/users");
      } finally {
        setIsLoading(false);
      }
    };

    void loadUser();
  }, [id, navigate, showError]);

  const handleSubmit = async (data: UpdateUserDto) => {
    if (!id) {
      showError("Invalid user ID.");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateUser(id, data);
      showSuccess("User updated successfully.");
      navigate("/users");
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message ?? "Unable to update the user.")
        : "Unable to update the user.";
      showError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/users");
  };

  return {
    user,
    isLoading,
    isSubmitting,
    handleSubmit,
    handleCancel,
  };
};
