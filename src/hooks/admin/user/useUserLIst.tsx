import { userListSearchType } from "@/components/user/user.type";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export const useUserList = () => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteID, setDeleteId] = useState<string>("");

  const method = useForm<userListSearchType>({
    defaultValues: {
      UserId: "",
      EmployeeCode: "",
      EmployeeName: "",
      CompanyName: "",
      RoleName: "",
      DefaultLogin: "",
      Status: "",
      UserType: "",
    },
  });

  const handleSearch = (data: userListSearchType) => {
    console.log("search click", data);
  };

  const handleCreateNew = () => {
    navigate("/admin/setup/user/create");
  };

  return {
    method,
    expanded,
    setExpanded,
    isModalOpen,
    setIsModalOpen,
    deleteID,
    setDeleteId,
    handleSearch,
    handleCreateNew,
  };
};
