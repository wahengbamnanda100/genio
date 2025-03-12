import {
  CompanyList,
  ShowroomListType,
  UserFormType,
} from "@/components/user/user.type";
import { UserDetailByID } from "@/services/admin/user/api";
import {
  UserDeails,
  UserDetailPayload,
  UserEmployeeData,
  UserRoleData,
  UserSQData,
} from "@/services/admin/user/api.type";

import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";

export const useUserFormByID = () => {
  // const dispatch = useDispatch();

  const { pathname } = useLocation();
  const { id } = useParams();

  const [editData, setEditData] = useState<UserDeails | null>(null);

  const isView = pathname.split("/").includes("view");
  const isEdit = pathname.split("/").includes("edit");

  const payload: UserDetailPayload = {
    UserID: id || "",
  };

  const { data, isLoading, isFetched } = UserDetailByID(payload, {
    enabled: !!id,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (isFetched) {
      if (data?.Status === "1" && data.Data) {
        setEditData(data.Data[0]);
      } else {
        setEditData(null);
      }
    }
  }, [isFetched, data]);

  const empData: UserEmployeeData = {
    EmployeeCode: editData?.EmpCode || "",
    EmployeeName: editData?.EmpName || "",
    Designation: editData?.Designatiom || "",
    EmpID: editData?.EmpID || "",
  };

  const roleData: UserRoleData = {
    RoleID: editData?.RoleID || "",
    RoleCode: editData?.RoleCode || "",
    RoleName: editData?.RoleName || "",
  };

  const securityQs: UserSQData = {
    QuestionID: "",
    QuestionName: editData?.SecurityQuestion || "",
  };

  const companyList: CompanyList[] =
    (editData?.Companydtls.length !== 0 &&
      editData?.Companydtls.map((company) => {
        const showroomList: ShowroomListType[] =
          (company.Showroomdtls.length !== 0 &&
            company.Showroomdtls.map((showroom) => {
              return {
                id: showroom.ShowroomID,
                cmpId: showroom.CompnayID,
                isDefault: showroom.DefaultShowroom === "1" ? true : false,
                name: showroom.ShowroomName,
                selected: showroom.AllocShowroomId === "" ? false : true,
              };
            })) ||
          [];

        return {
          cmpId: company.CompanyID,
          cmpCode: company.CompanyCode,
          companyName: company.CompanyName,
          address: company.CompanyAddress,
          type: company.CompanyType,
          selected: company.CompanyAllocationID === "" ? false : true,
          default: company.DefaultCompany === "1" ? true : false,
          showroomAllocatin: showroomList,
        };
      })) ||
    [];

  const detailById: UserFormType = {
    EmpCode: empData,
    EmpName: empData,
    id: editData?.UserID || "",
    userId: editData?.UserLoginID || "",
    password: editData?.Password || "",
    confirmPassword: editData?.Password || "",
    pin: editData?.UserPin || "",
    desg: editData?.Designatiom || "",
    roleCode: roleData,
    roleName: roleData,
    securityQestion: securityQs || "",
    answer: editData?.Answer || "",
    defaultLoginModule: editData?.ModuleID || "",
    desc: editData?.Description || "",
    companyList: companyList,
    active: editData?.Status === "True" ? true : false,
  };

  return {
    detailById,
    isLoading,
    isView,
    isEdit,
    id,
  };
};
