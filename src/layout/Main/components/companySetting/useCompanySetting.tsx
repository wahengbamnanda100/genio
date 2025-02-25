import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

// import { useAppProvider } from "../../../../AppProvider";
import { CompanySettigListSearch } from "./CompanySettings.type";

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

  //   const { data, isLoading, isFetched, refetch } = MenuMasterList(searchQuery, {
  //     refetchOnWindowFocus: true,
  //     refetchOnMount: true,
  //   });

  //   useEffect(() => {
  //     refetch();
  //   }, []);

  const handleCreateNew = () => {
    navigate("/demo-layout/admin/transection/company-setting/create");
  };

  //   const onSearch = (data: MenuMasterListSearchType) => {
  //     const backendData: MenuMasterListReqType = {
  //       ...searchQuery,
  //       ...data,
  //       Partnumber: getValueOrDefault(data.Partnumber, "Partnumber", ""),
  //       SupplierPartNumber: getValueOrDefault(
  //         data.SupplierPartNumber,
  //         "Categoryname",
  //         "",
  //       ),
  //       PurchaseDescription: getValueOrDefault(
  //         data.PurchaseDescription,
  //         "Categoryname",
  //         "",
  //       ),
  //       Barcode: getValueOrDefault(data.Barcode, "Categoryname", ""),
  //       CategoryName: getValueOrDefault(data.CategoryName, "Categoryname", ""),
  //       SalesDescription: getValueOrDefault(
  //         data.SalesDescription,
  //         "Categoryname",
  //         "",
  //       ),
  //       Manufacturer: getValueOrDefault(data.Manufacturer, "Categoryname", ""),
  //       SerialNumber: getValueOrDefault(data.SerialNumber, "", "-1"),
  //       EffectInventory: getValueOrDefault(data.EffectInventory, "", "-1"),
  //       NegativeStock: getValueOrDefault(data.NegativeStock, "", "-1"),
  //     };

  //     setSearchQuery(backendData);
  //   };

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

// export const useDeleteMenuMaster = (refetch: () => void) => {
//   const { setNotify } = useAppProvider();
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [deleteID, setDeleteId] = useState<string>("");

//   const { mutateAsync, isPending } = useMutation({
//     mutationKey: ["menu-master-delete"],
//     mutationFn: MenuMssterListDelete,
//     onSuccess: (data) => {
//       if (data.Status === "1") {
//         setNotify({
//           severity: "success",
//           message: data?.Message || "Menu Master Deleted Successfully",
//         });
//         refetch();
//       } else {
//         setNotify({
//           severity: "error",
//           message: data.Message || "Deletion failed",
//         });
//       }
//       setIsModalOpen(false);
//     },
//   });

//   const handleDelete = (id: string) => {
//     setDeleteId(id);
//     setIsModalOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     mutateAsync({ Stm_ID_N: deleteID });
//   };

//   return {
//     isModalOpen,
//     setIsModalOpen,
//     deleteID,
//     setDeleteId,
//     handleDelete,
//     handleConfirmDelete,
//     isPending,
//   };
// };
