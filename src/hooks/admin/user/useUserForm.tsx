import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { mutateUserSaveApi } from "@/services/admin/user/api";
import { useMutation } from "@tanstack/react-query";
import { useAppProvider } from "@/AppProvider";
import { UserSavePayload } from "@/services/admin/user/api.type";
import { UserFormType } from "@/components/user/user.type";
import { CompanyDetail } from "@/constants/user.constant";

export const useUserForm = () => {
  const navigate = useNavigate();
  const { setNotify } = useAppProvider();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const method = useForm<UserFormType>({
    defaultValues: {
      EmpCode: "",
      EmpName: "",
      userId: "",
      password: "",
      confirmPassword: "",
      pin: "",
      desg: "",
      roleCode: "",
      roleName: "",
      securityQestion: "",
      desc: "",
      companyList: CompanyDetail,
      active: true,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["User save"],
    mutationFn: mutateUserSaveApi,
    onSuccess: (data) => {
      if (data.Status === "1") {
        setIsModalOpen(false);
        setNotify({
          message: data.Message,
          severity: "success",
        });
        // refetch();
      } else {
        setNotify({
          message: "Something went wrong",
          severity: "error",
        });
      }
    },
  });

  const handleReset = () => {
    method.reset();
  };

  const handleSeachList = () => {
    navigate("/admin/setup/user");
  };

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const data = method.getValues();

    console.log("form submit", data);
    const backendData: UserSavePayload = {
      EmpID: data.EmpCode,
      RoleId: data.roleCode,
      UserId: "",
      LoginId: "",
      LoggedUserId: "",
      Password: "",
      Pin: "",
      UserDesc: "",
      Answer: "",
      ModuleId: "",
      SecurityQuestion: "",
      Status: "",
      CompanyDtls: [],
      ShowroomDtls: [],
    };

    mutateAsync(backendData);
  };

  return {
    method,
    isModalOpen,
    isPending,
    setIsModalOpen,
    handleSeachList,
    handleReset,
    handleSubmit,
    handleSave,
  };
};
