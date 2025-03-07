import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { mutateUserSaveApi } from "@/services/admin/user/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppProvider } from "@/AppProvider";
import {
  ComapanyDtlsType,
  ShowroomDtlsType,
  UserSavePayload,
} from "@/services/admin/user/api.type";
import { ShowroomListType, UserFormType } from "@/components/user/user.type";
import { createResolver } from "@/utils/user.resolver";

import { useEmpSync, useRoleSync } from "@/hooks/admin/user/useSyncFields";
import { extractField, filterCompaniesById } from "@/utils/extraction";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import { setSelectCompanyIDs } from "@/store/slices/admin/user/userCompanySelect";

export const useUserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const selectedCompanies = useSelector(
    (state: RootState) => state.userCompanySelect.values,
  );
  const { setNotify } = useAppProvider();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const [empFocus, setEmpFocus] = useState<string>("");
  const [roleFocus, setRoleFocus] = useState<string>("");

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
      defaultLoginModule: "",
      desc: "",
      companyList: [],
      active: true,
    },
    resolver: createResolver(),
  });

  const { resetFormAndRefs: resetRefEmployee } = useEmpSync(method, empFocus);
  const { resetFormAndRefs: resetRefRole } = useRoleSync(method, roleFocus);

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
        method.reset();
        dispatch(setSelectCompanyIDs([]));

        // refetch();
      } else {
        setNotify({
          message: "Something went wrong",
          severity: "error",
        });
      }
    },
  });

  const handleReset = useCallback(() => {
    queryClient.removeQueries({
      queryKey: ["User_company"],
    });
    method.reset();
    resetRefEmployee();
    resetRefRole();
    setReset(true);
  }, [method.reset]);

  const handleSeachList = useCallback(() => {
    navigate("/admin/setup/user");
  }, [navigate]);

  const handleSubmit = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleSave = () => {
    const data = method.getValues();

    const showroomSelectList: ShowroomListType[] = extractField(
      data.companyList,
      "showroomAllocatin",
    );
    const filterSelectedCompanies = filterCompaniesById(
      selectedCompanies || [],
      data.companyList,
    );
    const CompanyDtls: ComapanyDtlsType[] = filterSelectedCompanies.map(
      (company) => {
        return {
          Cmp_ID_N: company.cmpId,
          Sad_Default_N: company.default ? "1" : "0",
        };
      },
    );
    const ShowroomDtls: ShowroomDtlsType[] = showroomSelectList.map(
      (showroom) => {
        return {
          Shm_ID_N: showroom.id,
          Cmp_ID_N: showroom.cmpId,
          Sad_Default_N: showroom.isDefault ? "1" : "0",
        };
      },
    );

    const EmpID =
      typeof data.EmpCode === "object" && data.EmpCode !== null
        ? data.EmpCode.EmpID
        : "";

    const RoleId =
      typeof data.roleCode === "object" && data.roleCode !== null
        ? data.roleCode.RoleID
        : "";

    const SecurityQuestion =
      typeof data.securityQestion === "object" && data.securityQestion !== null
        ? data.securityQestion.QuestionName
        : "";

    const backendData: UserSavePayload = {
      EmpID,
      RoleId,
      UserId: "",
      LoginId: "",
      LoggedUserId:
        JSON.parse(localStorage.getItem("userDetail")!)?.UserId || "",
      Password: data.password,
      Pin: data.pin,
      UserDesc: data.desc,
      Answer: data.answer,
      ModuleId: data.defaultLoginModule,
      SecurityQuestion,
      Status: data.active ? "1" : "0",
      CompanyDtls,
      ShowroomDtls,
    };

    mutateAsync(backendData);
  };

  return {
    method,
    isModalOpen,
    isPending,
    reset,
    setReset,
    setEmpFocus,
    setRoleFocus,
    setIsModalOpen,
    handleSeachList,
    handleReset,
    handleSubmit,
    handleSave,
  };
};
