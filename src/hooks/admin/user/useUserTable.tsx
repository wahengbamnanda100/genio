import { CompanyList, UserFormType } from "@/components/user/user.type";
import { GetUserCompanyList } from "@/services/admin/user/api";
import {
  UserCompanyListData,
  UserCompanyListPayload,
} from "@/services/admin/user/api.type";
import { RootState } from "@/store";
import { setResetToggle } from "@/store/slices/admin/user/companyrestSlice";
import { setSelectCompanyIDs } from "@/store/slices/admin/user/userCompanySelect";
// import { queryCache } from "@/utils/utils";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

// export const useUserTable = (reset: boolean) => {
//   const dispatch = useDispatch();
//   const [companyDetail, setCompanyDetail] = useState<CompanyList[]>([]);
//   const [selection, setSelection] = useState<string[]>([]);
//   const [selectionFull, setSelectionFull] = useState<CompanyList[]>([]);
//   const { setValue, watch } = useFormContext<UserFormType>();
//   const [totalCount, setTotalCount] = useState<string>("0");

//   const [searchQuery, setSearchQuery] = useState<UserCompanyListPayload>({
//     Page: "1",
//     Rows: "10",
//     CompanyID: "",
//   });

//   const { data, isLoading, isFetched } = GetUserCompanyList(searchQuery, {
//     enabled: true,
//   });

//   useEffect(() => {
//     console.log("reset", reset);
//     if (isFetched) {
//       if (data?.Status === "1") {
//         !!data.Data && setCompanyDetail([]);
//         const temp: CompanyList[] = data.Data.map(
//           (cmp: UserCompanyListData) => {
//             return {
//               cmpId: cmp.CompanyID,
//               cmpCode: cmp.CompanyCode,
//               companyName: cmp.CompanyName,
//               address: cmp.CompanyAddress,
//               type: cmp.CompanyType,
//               default: false,
//               selected: false,
//               showroomAllocatin: [],
//             };
//           },
//         );
//         setTotalCount(data.OverallCount || "0");
//         setCompanyDetail(temp);
//       } else {
//         setCompanyDetail([]);
//       }
//     }
//   }, [isFetched, data, reset]);

//   useEffect(() => {
//     setValue("companyList", companyDetail);
//   }, [companyDetail, setValue]);

//   useEffect(() => {}, [reset]);

//   const companyList = watch("companyList");

//   const handleSelectionChange = (selectedIds: string[]) => {
//     // const updatedCompanyList = companyList.map((company: CompanyList) => ({
//     //   ...company,
//     //   default: selectedIds.includes(company.cmpId) ? company.default : false,
//     //   selected: selectedIds.includes(company.cmpId) ? true : false,
//     // }));

//     const updatedCompanyList = companyList.map((company: CompanyList) => {
//       const isSelected = selectedIds.includes(company.cmpId);
//       return {
//         ...company,
//         selected: isSelected,
//         default: isSelected && selectedIds[0] === company.cmpId, // only the first selected gets default true
//       };
//     });
//     setSelection(selectedIds);
//     setSelectionFull(updatedCompanyList);
//     console.log("updatedCompanyList", updatedCompanyList, selectedIds);
//     dispatch(setSelectCompanyIDs(selectedIds));
//   };

//   const handleDefaultSelection = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     row: CompanyList,
//   ) => {
//     if (!event.target.checked) {
//       return;
//     }

//     const isChecked = event.target.checked;

//     const updatedCompanyList = companyDetail.map((company: CompanyList) => ({
//       ...company,
//       default:
//         company.cmpId === row.cmpId ? isChecked : !isChecked && company.default,
//     }));

//     setValue("companyList", updatedCompanyList);
//   };

//   return {
//     isLoading,
//     selection,
//     selectionFull,
//     companyList,
//     totalCount,
//     searchQuery,
//     setSearchQuery,
//     handleSelectionChange,
//     handleDefaultSelection,
//   };
// };

export const useUserTable = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const selectedIds = useSelector(
  //   (state: RootState) => state.userCompanySelect.values,
  // );
  const resetToggle = useSelector(
    (state: RootState) => state.userCompanyReset.reset,
  );
  const [companyDetail, setCompanyDetail] = useState<CompanyList[]>([]);
  const [selection, setSelection] = useState<string[]>([]);
  const [selectionFull, setSelectionFull] = useState<CompanyList[]>([]);
  const { setValue, watch } = useFormContext<UserFormType>();
  const [totalCount, setTotalCount] = useState<string>("0");

  const [searchQuery, setSearchQuery] = useState<UserCompanyListPayload>({
    Page: "1",
    Rows: "10",
    CompanyID: "",
  });

  const { data, isLoading, isFetched, refetch } = GetUserCompanyList(
    searchQuery,
    {
      enabled: !id ? true : false,
    },
  );

  const companyListWatch = watch("companyList");

  useEffect(() => {
    console.log("selectd cmp", companyListWatch);
    const selectedCompany = companyListWatch.filter(
      (company: CompanyList) => company.selected,
    );
    setSelection(selectedCompany.map((company: CompanyList) => company.cmpId));
  }, [id, companyListWatch]);

  useEffect(() => {
    console.log("testinfdsfads", isFetched);
    if (isFetched) {
      if (data?.Status === "1") {
        !!data.Data && setCompanyDetail([]);
        const temp: CompanyList[] = data.Data.map(
          (cmp: UserCompanyListData) => {
            return {
              cmpId: cmp.CompanyID,
              cmpCode: cmp.CompanyCode,
              companyName: cmp.CompanyName,
              address: cmp.CompanyAddress,
              type: cmp.CompanyType,
              default: false,
              selected: false,
              showroomAllocatin: [],
            };
          },
        );
        setTotalCount(data.OverallCount || "0");
        setCompanyDetail(temp);
        console.log("set data in temp");
      } else {
        setCompanyDetail([]);
      }
      dispatch(setResetToggle(false));
    }
  }, [isFetched, data, resetToggle]);

  useEffect(() => {
    if (!id) {
      setValue("companyList", companyDetail);
    }
  }, [companyDetail, setValue, id]);

  useEffect(() => {
    if (resetToggle) {
      console.log({ resetToggle });
      setSelection([]);
      setSelectionFull([]);
      dispatch(setSelectCompanyIDs([]));
      refetch();
    }
  }, [resetToggle, setValue]);

  const companyList = watch("companyList");

  const handleSelectionChange = (selectedIds: string[]) => {
    // If no items are selected, return an empty list
    if (selectedIds.length === 0) {
      const updatedCompanyList = companyList.map((company: CompanyList) => ({
        ...company,
        selected: false,
        default: false,
      }));
      setSelection([]);
      setSelectionFull([]);
      setValue("companyList", updatedCompanyList);
      dispatch(setSelectCompanyIDs([]));
      return;
    }

    // Find if any currently selected company has default set to true
    const currentDefaultId = companyList.find(
      (company: CompanyList) => company.selected && company.default,
    )?.cmpId;

    // Determine which company should be default
    let defaultId: string;

    if (currentDefaultId && selectedIds.includes(currentDefaultId)) {
      // Keep the current default if it's still selected
      defaultId = currentDefaultId;
    } else {
      // Otherwise, set the first selected company as default
      defaultId = selectedIds[0];
    }

    const updatedCompanyList = companyList.map((company: CompanyList) => {
      const isSelected = selectedIds.includes(company.cmpId);
      return {
        ...company,
        selected: isSelected,
        default: isSelected && company.cmpId === defaultId,
      };
    });

    setSelection(selectedIds);
    setSelectionFull(updatedCompanyList.filter((company) => company.selected));
    setValue("companyList", updatedCompanyList);
    console.log("updatedCompanyList", updatedCompanyList, selectedIds);
    dispatch(setSelectCompanyIDs(selectedIds));
  };

  const handleDefaultSelection = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: CompanyList,
  ) => {
    if (!event.target.checked) {
      return; // Don't allow unchecking the default without selecting another
    }

    // Set the clicked row as default and unset all others
    const updatedCompanyList = companyList.map((company: CompanyList) => ({
      ...company,
      default: company.cmpId === row.cmpId,
    }));

    setValue("companyList", updatedCompanyList);
  };

  return {
    isLoading,
    selection,
    selectionFull,
    companyList,
    totalCount,
    searchQuery,
    setSearchQuery,
    handleSelectionChange,
    handleDefaultSelection,
  };
};
