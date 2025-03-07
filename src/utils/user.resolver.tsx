import { UserFormType } from "@/components/user/user.type";
import { FieldErrors } from "react-hook-form";

export const createResolver = () => {
  return (
    values: UserFormType,
  ): { values: UserFormType; errors: FieldErrors } => {
    const errors: FieldErrors = {};

    // Validate Employee Code
    if (values.EmpCode === "") {
      errors.EmpCode = {
        type: "required",
        message: "Employee Code is required",
      };
    }

    // Validate Employee Name
    if (values.EmpName === "") {
      errors.EmpName = {
        type: "required",
        message: "Employee Name is required",
      };
    }

    // Validate Role Code
    if (values.roleCode === "") {
      errors.roleCode = {
        type: "required",
        message: "Role Code is required",
      };
    }

    if (values.userId === "") {
      errors.userId = {
        type: "required",
        message: "User Id is required",
      };
    }

    if (values.roleName === "") {
      errors.roleName = {
        type: "required",
        message: "Role Name is required",
      };
    }

    if (values.password === "") {
      errors.password = {
        type: "required",
        message: "Password is required",
      };
    }

    if (values.confirmPassword === "") {
      errors.confirmPassword = {
        type: "required",
        message: "Confirm Password is required",
      };
    }

    // Validate Password
    if (values.password) {
      if (values.password.length < 6) {
        errors.password = {
          type: "minLength",
          message: "Password must be at least 6 characters",
        };
      }

      // Password complexity check (optional)
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
      if (!passwordRegex.test(values.password)) {
        errors.password = {
          type: "pattern",
          message:
            "Password must include letters, numbers, and special characters",
        };
      }
    }

    // Validate Confirm Password
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = {
        type: "validate",
        message: "Passwords do not match",
      };
    }

    // Optional: Additional field validations
    if (values.pin && values.pin.length < 4) {
      errors.pin = {
        type: "minLength",
        message: "PIN must be at least 4 characters",
      };
    }

    return {
      values,
      errors,
    };
  };
};
