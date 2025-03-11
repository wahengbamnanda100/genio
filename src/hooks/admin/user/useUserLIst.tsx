import { useAppProvider } from "@/AppProvider";
import { userListSearchType } from "@/components/user/user.type";
import { mutateUserDelete, SearchUserList } from "@/services/admin/user/api";
import {
  SearchListType,
  SearchUserListPayloadType,
  SearchUserListResponseType,
} from "@/services/admin/user/api.type";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { queryCache } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";

export const useUserList = () => {
  const navigate = useNavigate();
  const { setNotify } = useAppProvider();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteID, setDeleteId] = useState<string>("");
  const [tableData, setTableData] = useState<SearchUserListResponseType | null>(
    null,
  );

  const [searchQuery, setSearchQuery] = useState<SearchUserListPayloadType>({
    Rows: "10",
    Page: "1",
    CompanyID: "",
    EmployeeName: "",
    EmployeezCode: "",
    LoginID: "",
    LogStatus: "",
    ModuleID: "",
    RoleName: "",
    Status: "",
  });

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

  const { data, isLoading, isFetched, refetch } = SearchUserList(searchQuery, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (isFetched) {
      if (data?.Status === "1" && data.Data) {
        setTableData(data);
        setNotify({
          severity: "success",
          message: "User list retrive successfully",
        });
      } else {
        setTableData(null);
        setNotify({
          severity: "error",
          message: "User list retrive failed or empty data",
        });
      }
    }
  }, [isFetched, data]);

  const handleSearch = async (data: userListSearchType) => {
    const searchData: SearchUserListPayloadType = {
      ...searchQuery,
      CompanyID: data?.CompanyName?.CompanyID || "",
      EmployeeName: data?.EmployeeName?.EmpName || "",
      EmployeezCode: data?.EmployeeCode?.EmpCode || "",
      LoginID: data?.UserId?.UserID || "",
      RoleName: data?.RoleName?.RoleName || "",
      LogStatus: data.UserType,
      ModuleID: data.DefaultLogin,
      Status: data.Status,
    };
    queryCache.clear();
    await setSearchQuery(searchData);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["menu-master-delete"],
    mutationFn: mutateUserDelete,
    onSuccess: (data) => {
      if (data.Status === "1") {
        setNotify({
          severity: "success",
          message: data?.Message || "User Deleted Successfully",
        });
        refetch();
      } else if (data.Status === "-2") {
        setNotify({
          severity: "info",
          message: data.Message || "Deletion failed",
        });
      } else {
        setNotify({
          severity: "error",
          message: data.Message || "Deletion failed",
        });
      }
      setIsModalOpen(false);
    },
  });

  const handleCreateNew = () => {
    navigate("/admin/setup/user/create");
  };

  const handleDelete = (rowData: SearchListType) => {
    setDeleteId(rowData.EmpID);
    setIsModalOpen(true);
  };

  const handleConfirmeDelete = () => {
    mutateAsync({
      EmpID: deleteID,
    });
    // setIsModalOpen(false);
  };
  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (rowData: SearchListType) => {
    console.log("edit clicked", rowData);
    const id = rowData.UserID;
    navigate(`edit/${id}`);
  };

  return {
    method,
    expanded,
    isLoading,
    isPending,
    tableData,
    searchQuery,
    setSearchQuery,
    setExpanded,
    isModalOpen,
    setIsModalOpen,
    handleDelete,
    handleSearch,
    handleCreateNew,
    handleEdit,
    handleCancelDelete,
    handleConfirmeDelete,
  };
};
