/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryCache } from "@tanstack/react-query";
import { PosMenuFormSchema } from "../common/Component-types/posMenu.type";

export function getDropDownValues<T>(
  data: T[],
  label: keyof T,
  value: keyof T,
): { label: T[keyof T]; value: T[keyof T] }[] {
  return data.map((item) => ({
    label: item[label],
    value: item[value],
  }));
}

export const posMenuFields = (): PosMenuFormSchema => {
  return {
    // carddetail
    cardNumber: "",
    familyId: "",
    idNumbar: "",
    dailyLimit: "",
    name: "",
    gardeLimit: "",

    // discountAmount
    discount: 0,
    total: 0,
    discountAmount: 0,

    // netAmount
    netAmount: 0,

    // paidAmountSchema
    cashAmount: 0,
    totalPaid: 0,
    balance: 0,

    // availableBalance
    availableBalance: 0,
    balanceAmount: 0,
    paidAmount: 0,

    // scanComponent
    invoiceDate: new Date(),
    invoiceNumber: "",

    // scanUnit
    cmpName: "",
    showroom: "",
    salesPersonCode: "",
    salesPersonName: "",

    // currency exchange
    currency: [],
    rate: 0,
    exchangePaidAmount: 0,
    exchangeAmount: 0,

    // card type
    allowCard: false,
    cardType: [],
    cardTypeNumber: "",
    cardAmount: 0,

    // other fields
    CardID: "",
  };
};

// Utility function to return the object excluding fieldsToExclude
export const generateResetValues = (
  fieldsToExclude: Array<keyof PosMenuFormSchema>,
): Partial<PosMenuFormSchema> => {
  const allFields = posMenuFields();

  // Generate a new object excluding the fields to be excluded
  const resetValues = Object.keys(allFields).reduce((acc, field) => {
    if (!fieldsToExclude.includes(field as keyof PosMenuFormSchema)) {
      acc[field as keyof PosMenuFormSchema] =
        allFields[field as keyof PosMenuFormSchema];
    }
    return acc;
  }, {} as Partial<PosMenuFormSchema>);

  return resetValues;
};

export const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error);
  },
  onSuccess: (data) => {
    console.log(data);
  },
});

export function anyOneIsTrue(...params: boolean[]): boolean {
  return params.includes(true);
}

export const arrayToStringWithDot = (arr: string[]): string => {
  if (!Array.isArray(arr) || arr.length === 0) return "";
  return arr.join(",");
};

export const getValueOrDefault = (
  field: any,
  key: string,
  defaultValue: string = "",
) => {
  if (field === "") return defaultValue;
  return key ? field[key] || field : field;
};

export const transformSetToObjects = (
  arr: Set<string>,
  defaultCmpId: string,
) => {
  if (arr.size === 0) {
    return [
      {
        Cmp_ID_N: defaultCmpId,
        CheckboxSelect: "true",
      },
    ];
  }

  return Array.from(arr).map((cmpId) => ({
    Cmp_ID_N: cmpId,
    CheckboxSelect: "true",
  }));
};

export function convertStringArray(
  input: string | string[],
  mode: "toString" | "toArray",
): string | string[] {
  if (mode === "toString") {
    // Convert array of strings to comma-separated string
    return Array.isArray(input) ? input.join(",") : input;
  } else if (mode === "toArray") {
    // Convert comma-separated string to array of strings
    return typeof input === "string"
      ? input.split(",").map((s) => s.trim())
      : input;
  } else {
    throw new Error("Invalid mode. Use 'toString' or 'toArray'.");
  }
}

export const lsUserId =
  JSON.parse(localStorage.getItem("userDetail")!)?.UserId || "";

export const lsUserImg =
  JSON.parse(localStorage.getItem("userDetail")!)?.EmpImage || "";

export const lsUserName =
  JSON.parse(localStorage.getItem("userDetail")!)?.EmpName || "";

export const lsCmpName =
  JSON.parse(localStorage.getItem("userDetail")!)?.CmpName || "";

export const lsCmpImg =
  JSON.parse(localStorage.getItem("userDetail")!)?.CmpLogo || "";

export const lsUserCode =
  JSON.parse(localStorage.getItem("userDetail")!)?.EmpCode || "";
