import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { UserFormType } from "../../components/user/user.type";

export const useUserForm = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const method = useForm<UserFormType>({
    defaultValues: {},
  });

  const handleSeachList = () => {
    navigate("/admin/setup/user");
  };

  return { method, isModalOpen, setIsModalOpen, handleSeachList };
};
