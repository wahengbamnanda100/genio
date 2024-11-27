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
