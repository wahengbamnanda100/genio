import { useCallback, useEffect, useState } from "react";
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
import { setResetToggle } from "@/store/slices/admin/user/companyrestSlice";

export const useUserForm = (detailData: UserFormType, id?: string) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { setNotify } = useAppProvider();
  const selectedCompanies = useSelector(
    (state: RootState) => state.userCompanySelect.values,
  );
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
      answer: "",
      defaultLoginModule: "",
      desc: "",
      companyList: [],
      active: true,
    },
    resolver: createResolver(),
  });

  useEffect(() => {
    if (id && detailData) {
      console.log({ detailData });

      method.setValue("EmpCode", detailData.EmpCode);
      method.setValue("EmpName", detailData.EmpName);
      method.setValue("userId", detailData.userId);
      // method.setValue("password", detailData.password);
      // method.setValue("confirmPassword", detailData.password);
      method.setValue("pin", detailData.pin);
      method.setValue("defaultLoginModule", detailData.defaultLoginModule);
      method.setValue("desg", detailData.desg);
      method.setValue("roleCode", detailData.roleCode);
      method.setValue("roleName", detailData.roleName);
      method.setValue("securityQestion", detailData.securityQestion);
      method.setValue("answer", detailData.answer);
      method.setValue("desc", detailData.desc);
      method.setValue("active", detailData.active);
      method.setValue("companyList", detailData.companyList);
    }
  }, [detailData, id, method]);

  const userTitle = (id && detailData && detailData.userId) || "---";

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
        dispatch(setResetToggle(true));
        dispatch(setSelectCompanyIDs([]));

        // refetch();
      } else if (data.Status === "-2") {
        setNotify({
          message: data.Message,
          severity: "error",
        });
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
    dispatch(setResetToggle(true));
  }, [method.reset]);

  const handleSeachList = useCallback(() => {
    navigate("/admin/setup/user");
  }, [navigate]);

  const handleSubmit = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleSave = useCallback(() => {
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

    console.log("user id", detailData.id, id);

    const backendData: UserSavePayload = {
      EmpID,
      RoleId,
      UserId: id || "",
      LoginId: data.userId,
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
  }, []);

  return {
    method,
    isModalOpen,
    isPending,
    reset,
    userTitle,
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
