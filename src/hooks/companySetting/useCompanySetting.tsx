import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

// import { useAppProvider } from "../../../../AppProvider";
import { CompanySettigListSearch } from "../../components/companySetting/CompanySettings.type";

export const useCompanySettingList = () => {
  const navigate = useNavigate();
  //   const { setNotify } = useAppProvider();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteID, setDeleteId] = useState<string>("");
  //   const [searchQuery, setSearchQuery] =
  //     useState<MenuMasterListReqType>(menuSearchQuery);

  const method = useForm<CompanySettigListSearch>({
    defaultValues: {
      Code: "",
      Name: "",
      Year: "",
    },
  });

  const handleCreateNew = () => {
    navigate("/admin/transection/company-setting/create");
  };

  return {
    method,
    // searchQuery,
    // setSearchQuery,
    expanded,
    setExpanded,
    // isLoading,
    // isFetched,
    // data,
    // refetch,
    handleCreateNew,
    // onSearch,
    isModalOpen,
    setIsModalOpen,
    deleteID,
    setDeleteId,
  };
};
