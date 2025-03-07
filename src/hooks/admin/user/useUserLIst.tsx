import { useAppProvider } from "@/AppProvider";
import { userListSearchType } from "@/components/user/user.type";
import { SearchUserList } from "@/services/admin/user/api";
import {
  SearchUserListPayloadType,
  SearchUserListResponseType,
} from "@/services/admin/user/api.type";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

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

  const { data, isLoading, isFetched } = SearchUserList(searchQuery, {
    enabled: true,
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

  const handleSearch = (data: userListSearchType) => {
    console.log("search click", data);
  };

  const handleCreateNew = () => {
    navigate("/admin/setup/user/create");
  };

  return {
    method,
    expanded,
    isLoading,
    tableData,
    searchQuery,
    setSearchQuery,
    setExpanded,
    isModalOpen,
    setIsModalOpen,
    deleteID,
    setDeleteId,
    handleSearch,
    handleCreateNew,
  };
};
