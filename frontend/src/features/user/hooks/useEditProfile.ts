import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../../context/use-auth";
import { useNotification } from "../../../notifications/use-notification.context";
import { updateOwnUserData } from "../../user/user.api";

import type { UpdateOwnUserDto } from "../../user/domain/dtos";

export const useEditProfile = () => {
  const { user, refreshUser } = useAuth();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: UpdateOwnUserDto) => {
    setIsLoading(true);

    try {
      await updateOwnUserData(data);
      await refreshUser();
      showSuccess("Profile updated successfully.");
      navigate("/profile");
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message ?? "Unable to update your profile.")
        : "Unable to update your profile.";
      showError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    handleSubmit,
  };
};
