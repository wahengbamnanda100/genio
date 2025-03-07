/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldProps } from "@/common/Form-component";
import PasswordStrength from "@/common/UI-component/PasswordStrength";
import {
  GetUserEmployeeList,
  GetUserModules,
  GetUserRoleList,
  GetUserSecurityQuesions,
} from "@/services/admin/user/api";
import {
  UserEmployeeListPayloadType,
  UserListType,
} from "@/services/admin/user/api.type";
import { getDropDownValues } from "@/utils/utils";
import { Dispatch, SetStateAction } from "react";

const getDefaultModule = () => {
  const requestBody: UserListType = {
    Page: "",
    Rows: "",
  };

  const { data, isFetched } = GetUserModules(requestBody);
  const dropdownValues =
    isFetched && data?.Data?.length
      ? getDropDownValues(data?.Data, "ModuleName", "ModuleID")
      : [];

  return dropdownValues;
};

const Search: UserEmployeeListPayloadType = {
  Rows: "10",
  Page: "1",
  SearchText: "",
};

export const UserFields = (
  userIdDisabled: boolean,
  setFocusField: Dispatch<SetStateAction<string>>,
): FieldProps[] => [
  {
    fieldType: "autoComplete",
    name: "EmpCode",
    label: "Employee Code",
    size: "medium",
    onFocus: (name) => {
      setFocusField(name);
    },
    searchApi: (keyStroke) =>
      GetUserEmployeeList(
        {
          ...Search,
          SearchText: keyStroke,
        },
        {
          enabled: keyStroke !== "" ? true : false,
        },
      ),
    optionKey: "EmployeeCode",
    getOptionLabel: (option) => (option ? `${option.EmployeeCode}` : ""),
    options: (searchData) => searchData?.Data ?? [],
    hasErrorMessage: true,
    xs: 4,
  },
  {
    fieldType: "autoComplete",
    name: "EmpName",
    label: "Employee Name",
    size: "medium",
    onFocus: (name) => {
      setFocusField(name);
    },
    searchApi: (keyStroke) =>
      GetUserEmployeeList(
        {
          ...Search,
          SearchText: keyStroke,
        },
        {
          enabled: keyStroke !== "" ? true : false,
        },
      ),
    optionKey: "EmployeeName",
    getOptionLabel: (option) => (option ? `${option.EmployeeName}` : ""),
    options: (searchData) => searchData?.Data ?? [],
    hasErrorMessage: true,
    xs: 8,
  },
  {
    fieldType: "text",
    name: "userId",
    label: "User Id",
    size: "medium",
    hasErrorMessage: true,
    rules: {
      required: "Password is required",
    },
    disabled: userIdDisabled,
    xs: 12,
  },
  {
    fieldType: "text",
    name: "password",
    label: "Password",
    size: "medium",
    helperText: <PasswordStrength name={"password"} />,
    InputProps: {
      type: "password",
      autoComplete: "new-password",
    },
    rules: {
      required: "Password is required",
    },
    hasErrorMessage: true,
    xs: 12,
  },
  {
    fieldType: "text",
    name: "confirmPassword",
    label: "Confirm Password",
    size: "medium",
    InputProps: {
      type: "password",
      autoComplete: "new-password",
    },
    rules: {
      required: "Password is required",
    },
    hasErrorMessage: true,
    xs: 12,
  },
  {
    fieldType: "text",
    name: "pin",
    label: "Pin",
    size: "medium",
    xs: 12,
  },
];

export const UserFields2 = (
  designationDIsabled: boolean,
  setFocusField: Dispatch<SetStateAction<string>>,
): FieldProps[] => [
  {
    fieldType: "text",
    name: "desg",
    label: "Designation",
    size: "medium",
    disabled: designationDIsabled,
    xs: 12,
  },
  {
    fieldType: "autoComplete",
    name: "roleCode",
    label: "Role Code",
    size: "medium",
    onFocus: (name) => {
      setFocusField(name);
    },
    searchApi: (keyStroke) =>
      GetUserRoleList(
        {
          ...Search,
          SearchText: keyStroke,
        },
        {
          enabled: keyStroke !== "" ? true : false,
        },
      ),
    optionKey: "RoleCode",
    getOptionLabel: (option) => (option ? `${option.RoleCode}` : ""),
    options: (searchData) => searchData?.Data ?? [],
    hasErrorMessage: true,
    xs: 4,
  },
  {
    fieldType: "autoComplete",
    name: "roleName",
    label: "Role Name",
    size: "medium",
    onFocus: (name) => {
      setFocusField(name);
    },
    searchApi: (keyStroke) =>
      GetUserRoleList(
        {
          ...Search,
          SearchText: keyStroke,
        },
        {
          enabled: keyStroke !== "" ? true : false,
        },
      ),
    optionKey: "RoleName",
    getOptionLabel: (option) => (option ? `${option.RoleName}` : ""),
    options: (searchData) => searchData?.Data ?? [],
    hasErrorMessage: true,
    rules: {
      required: "Role Name is required",
    },
    xs: 8,
  },
  {
    fieldType: "autoComplete",
    name: "securityQestion",
    label: "Security Qestion",
    size: "medium",
    searchApi: (keyStroke) =>
      GetUserSecurityQuesions(
        {
          Rows: "10",
          Page: "1",
        },
        {
          enabled: keyStroke !== "" ? true : false,
        },
      ),
    optionKey: "QuestionName",
    getOptionLabel: (option) => (option ? `${option.QuestionName}` : ""),
    options: (searchData) => searchData?.Data ?? [],
    hasErrorMessage: true,
    rules: {
      required: "Qusetion is required",
    },
    xs: 12,
  },
  {
    fieldType: "text",
    name: "answer",
    label: "Answer",
    size: "medium",
    hasErrorMessage: true,
    rules: {
      required: "Answer is required",
    },
    xs: 12,
  },
  {
    fieldType: "select",
    name: "defaultLoginModule",
    label: "Default Login Module",
    options: getDefaultModule(),
    size: "medium",
    hasErrorMessage: true,
    rules: {
      required: "Default Module is required",
    },
    xs: 12,
  },
];

export const DescriptonField = (): FieldProps => ({
  fieldType: "text",
  name: "desc",
  multiline: true,
  rows: 3,
  label: "Description",
  size: "medium",
  xs: 12,
});

export const ActiveCheckbox = (): FieldProps => ({
  fieldType: "checkbox",
  name: "active",
  labelPlacement: "end",
  checkBoxs: [{ name: "active", label: "Active" }],
  size: "medium",
  xs: 12,
});

export const UserSearchField = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "UserId",
    label: "User Id",
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "text",
    name: "EmployeeCode",
    label: "Employee Code",
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "text",
    name: "EmployeeName",
    label: "Employee Name",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "RoleName",
    label: "Role Name",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "select",
    name: "DefaultLogin",
    label: "Default Login",
    options: [],
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "text",
    name: "CompanyName",
    label: "Company Name",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "select",
    name: "Status",
    label: "Status",
    size: "medium",
    options: [],
    xs: 2,
  },
  {
    fieldType: "select",
    name: "UserType",
    label: "User Type",
    size: "medium",
    options: [],
    xs: 2,
  },
];
