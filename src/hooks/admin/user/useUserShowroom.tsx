import { useAppProvider } from "@/AppProvider";
import { ShowroomListType, UserFormType } from "@/components/user/user.type";
import { GetUserShowroomList } from "@/services/admin/user/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

export const useUserShowroomAllocation = () => {
  const [cmpId, setCmpid] = useState<string | null>(null);
  const { setNotify } = useAppProvider();
  const [showrooms, setShowrooms] = useState<ShowroomListType[]>([]);
  const [selection, setSelection] = useState<string[]>([]);
  const [selectionFull, setSelectionFull] = useState<ShowroomListType[]>([]);
  const [openAllocate, setOpenAllocate] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<string>("0");

  const [searchQuery, setSearchQuery] = useState({
    Page: "1",
    Rows: "10",
  });

  const { setValue, getValues } = useFormContext<UserFormType>();

  const { data, isLoading, isFetched } = GetUserShowroomList(
    { ...searchQuery, CompanyID: cmpId || "" },
    {
      enabled: !!cmpId,
      staleTime: 5 * 60 * 1000,
    },
  );
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
      setTotalCount(data?.OverallCount || "0");
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
    if (!selectionFull.some((showroom) => showroom.isDefault)) {
      setNotify({
        severity: "warning",
        message: "Select a default showroom ",
      });
      return;
    } else {
      const companyIndex = getValues("companyList").findIndex(
        (company) => company.cmpId === cmpId,
      );

      setValue(`companyList.${companyIndex}.showroomAllocatin`, selectionFull);

      handleCancel();
    }
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
    totalCount,
    searchQuery,
    setSearchQuery,
    setOpenAllocate,
    handleAllocation,
    handleSelectChange,
    handleDefaultChange,
    handleSelect,
    handleCancel,
  };
};
