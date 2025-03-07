import {
  CompanyList,
  ShowroomListType,
  UserFormType,
} from "@/components/user/user.type";
import {
  GetUserCompanyList,
  GetUserShowroomList,
} from "@/services/admin/user/api";
import {
  UserCompanyListData,
  UserCompanyListPayload,
  UserShowroomListPayload,
} from "@/services/admin/user/api.type";
import { setSelectCompanyIDs } from "@/store/slices/admin/user/userCompanySelect";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";

export const useUserTable = (reset: boolean) => {
  const dispatch = useDispatch();
  const [companyDetail, setCompanyDetail] = useState<CompanyList[]>([]);
  const [selection, setSelection] = useState<string[]>([]);
  const [selectionFull, setSelectionFull] = useState<CompanyList[]>([]);
  const { setValue, watch } = useFormContext<UserFormType>();

  const payload: UserCompanyListPayload = {
    Rows: "",
    Page: "",
    CompanyID: "",
  };

  const { data, isLoading, isFetched } = GetUserCompanyList(payload, {
    enabled: true,
  });

  useEffect(() => {
    console.log("reset", reset);
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

        setCompanyDetail(temp);
      } else {
        setCompanyDetail([]);
      }
    }
  }, [isFetched, data, reset]);

  useEffect(() => {
    setValue("companyList", companyDetail);
  }, [companyDetail, setValue]);

  useEffect(() => {}, [reset]);

  const companyList = watch("companyList");

  const handleSelectionChange = (selectedIds: string[]) => {
    const updatedCompanyList = companyList.map((company: CompanyList) => ({
      ...company,
      default: selectedIds.includes(company.cmpId) ? company.default : false,
      selected: selectedIds.includes(company.cmpId) ? true : false,
    }));
    setSelection(selectedIds);
    setSelectionFull(updatedCompanyList);
    console.log("updatedCompanyList", updatedCompanyList, selectedIds);
    dispatch(setSelectCompanyIDs(selectedIds));
  };

  const handleDefaultSelection = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: CompanyList,
  ) => {
    if (!event.target.checked) {
      return;
    }

    const isChecked = event.target.checked;

    const updatedCompanyList = companyDetail.map((company: CompanyList) => ({
      ...company,
      default:
        company.cmpId === row.cmpId ? isChecked : !isChecked && company.default,
    }));

    setValue("companyList", updatedCompanyList);
  };

  return {
    isLoading,
    selection,
    selectionFull,
    companyList,
    handleSelectionChange,
    handleDefaultSelection,
  };
};

export const useUserShowroomAllocation = () => {
  const [cmpId, setCmpid] = useState<string | null>(null);
  const [showrooms, setShowrooms] = useState<ShowroomListType[]>([]);
  const [selection, setSelection] = useState<string[]>([]);
  const [selectionFull, setSelectionFull] = useState<ShowroomListType[]>([]);
  const [openAllocate, setOpenAllocate] = useState<boolean>(false);

  const { setValue, getValues } = useFormContext<UserFormType>();

  const payload: UserShowroomListPayload = {
    Page: "",
    Rows: "",
    CompanyID: cmpId || "",
  };

  const { data, isLoading, isFetched } = GetUserShowroomList(payload, {
    enabled: !!cmpId,
    staleTime: 5 * 60 * 1000,
  });
  useEffect(() => {
    if (!isFetched || !data) return;

    if (data.Status === "1" && data.Data) {
      const transformedShowrooms: ShowroomListType[] = data.Data.map(
        (showroom) => ({
          id: showroom.ShowroomID,
          name: showroom.ShowroomName,
          cmpId: showroom.CompnayID,
          isDefault: showroom.Default === "1",
          selected: false,
        }),
      );
      setShowrooms(transformedShowrooms);
    } else {
      setShowrooms([]);
    }
  }, [isFetched, data]);

  const handleAllocation = useCallback((id: string) => {
    setOpenAllocate(true);
    setCmpid(id);
  }, []);

  const handleSelectChange = useCallback(
    (ids: string[]) => {
      const updatedShowroomList = showrooms.filter(
        (showroom: ShowroomListType) => ids.includes(showroom.id),
      );
      setSelection(ids);
      setSelectionFull(updatedShowroomList);
    },
    [showrooms],
  );

  const handleDefaultChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, row: ShowroomListType) => {
      // Update showrooms with the new default setting:
      setShowrooms((prevShowrooms) => {
        const updatedShowrooms = prevShowrooms.map((item) => ({
          ...item,
          isDefault: item.id === row.id ? event.target.checked : false,
        }));

        const filetrShowroom = updatedShowrooms.filter((showroom) =>
          selection.includes(showroom.id),
        );

        setSelectionFull(filetrShowroom);

        return updatedShowrooms;
      });
    },
    [showrooms, selection],
  );
  const handleSelect = useCallback(() => {
    const companyIndex = getValues("companyList").findIndex(
      (company) => company.cmpId === cmpId,
    );

    setValue(`companyList.${companyIndex}.showroomAllocatin`, selectionFull);

    handleCancel();
  }, [selectionFull]);

  const handleCancel = useCallback(() => {
    setOpenAllocate(false);
    setSelection([]);
    setSelectionFull([]);
  }, []);

  const memoizedShowrooms = useMemo(() => showrooms, [showrooms]);

  return {
    showrooms: memoizedShowrooms,
    openAllocate,
    isLoading,
    selection,
    selectionFull,
    setOpenAllocate,
    handleAllocation,
    handleSelectChange,
    handleDefaultChange,
    handleSelect,
    handleCancel,
  };
};
