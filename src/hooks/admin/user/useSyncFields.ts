import { UserFormType } from "@/components/user/user.type";
import { UserEmployeeData, UserRoleData } from "@/services/admin/user/api.type";
import { debounce } from "lodash";
import { useCallback, useEffect, useRef } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";

export const useEmpSync = (
  methods: UseFormReturn<UserFormType>,
  focusField: string,
) => {
  const previousValuesRef = useRef<Partial<UserFormType>>({});

  const { control, setValue } = methods;

  const [EmpCodeWatch, EmpNameWatch] = useWatch({
    control,
    name: ["EmpCode", "EmpName"],
  });

  const updateValues = useCallback(
    (selectedKey: keyof UserFormType, selectedValue: UserEmployeeData) => {
      if (!selectedValue || focusField !== selectedKey) return;

      // Update fields only if values have changed
      if (
        selectedKey !== "EmpCode" &&
        previousValuesRef.current.EmpCode !== selectedValue.EmployeeCode
      ) {
        setValue("EmpCode", selectedValue, {
          shouldValidate: true,
        });
      }
      if (
        selectedKey !== "EmpName" &&
        previousValuesRef.current.EmpName !== selectedValue.EmployeeName
      ) {
        setValue("EmpName", selectedValue, {
          shouldValidate: true,
        });
      }

      setValue("desg", selectedValue.Designation);

      // Store previous values for future reference
      previousValuesRef.current = {
        EmpCode: selectedValue.EmployeeCode,
        EmpName: selectedValue.EmployeeName,
      };
    },
    [focusField, setValue],
  );

  const debouncedUpdate = debounce(
    (field: keyof UserFormType, value: UserEmployeeData) =>
      updateValues(field, value),
    300,
  );
  //   [updateValues],
  // );

  const resetFormAndRefs = () => {
    previousValuesRef.current = {};
  };

  useEffect(() => {
    if (EmpCodeWatch && focusField === "EmpCode") {
      debouncedUpdate("EmpCode", EmpCodeWatch as UserEmployeeData);
    }
    if (EmpNameWatch && focusField === "EmpName") {
      debouncedUpdate("EmpName", EmpNameWatch as UserEmployeeData);
    }

    return () => {
      debouncedUpdate.cancel(); // Cancel debounce on unmount
    };
  }, [EmpCodeWatch, EmpNameWatch, debouncedUpdate]);

  return {
    resetFormAndRefs,
  };
};

export const useRoleSync = (
  methods: UseFormReturn<UserFormType>,
  focusField: string,
) => {
  const previousValuesRef = useRef<Partial<UserFormType>>({});

  const { control, setValue } = methods;

  const [RoleCodeWatch, RoleNameWatch] = useWatch({
    control,
    name: ["roleCode", "roleCode"],
  });

  const updateValues = useCallback(
    (selectedKey: keyof UserFormType, selectedValue: UserRoleData) => {
      if (!selectedValue || focusField !== selectedKey) return;

      // Update fields only if values have changed
      if (
        selectedKey !== "roleCode" &&
        previousValuesRef.current.roleCode !== selectedValue.RoleCode
      ) {
        setValue("roleCode", selectedValue, {
          shouldValidate: true,
        });
      }
      if (
        selectedKey !== "roleName" &&
        previousValuesRef.current.roleName !== selectedValue.RoleName
      ) {
        setValue("roleName", selectedValue, {
          shouldValidate: true,
        });
      }

      // Store previous values for future reference
      previousValuesRef.current = {
        roleCode: selectedValue.RoleCode,
        roleName: selectedValue.RoleName,
      };
    },
    [focusField, setValue],
  );

  const debouncedUpdate = debounce(
    (field: keyof UserFormType, value: UserRoleData) =>
      updateValues(field, value),
    300,
  );
  //   [updateValues],
  // );

  const resetFormAndRefs = () => {
    previousValuesRef.current = {};
  };

  useEffect(() => {
    if (RoleCodeWatch && focusField === "roleCode") {
      debouncedUpdate("roleCode", RoleCodeWatch as UserRoleData);
    }
    if (RoleNameWatch && focusField === "roleName") {
      debouncedUpdate("roleName", RoleNameWatch as UserRoleData);
    }

    return () => {
      debouncedUpdate.cancel(); // Cancel debounce on unmount
    };
  }, [RoleCodeWatch, RoleNameWatch, debouncedUpdate]);

  return {
    resetFormAndRefs,
  };
};
