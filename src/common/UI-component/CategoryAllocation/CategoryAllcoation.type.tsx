/* eslint-disable @typescript-eslint/no-explicit-any */
import { AllocationShowroomReqType } from "../../../services/aoi.type";
import {
  AllocationCategoryList,
  AllocationShowroomList,
} from "../../../services/CategoryAllocation";
import { getDropDownValues } from "../../../utils/utils";
import { FieldProps } from "../../Form-component";
import CategoryCard from "../CategoryCard";

export type CategoryItem = {
  categoryCode: any;
  categoryName: any;
};

export type CategoryAllocationType = {
  showroomName: string;
  categoryList: CategoryItem[] | null;
};

export type ShowroomListType = {
  showroomName: string;
  showroomCode: string;
};

const getAllShowrromList = () => {
  const reqData: AllocationShowroomReqType = null;
  const { data, isFetched } = AllocationShowroomList(reqData);

  const dropdownValues =
    isFetched && data?.Data?.length
      ? getDropDownValues(data?.Data, "ShowroomCode", "ShowroomID")
      : [];

  return dropdownValues;
};

export const ShowroomListField = (): FieldProps => ({
  fieldType: "select",
  label: "Showroom",
  name: "showroomName",
  options: getAllShowrromList(),
  size: "medium",
  hasErrorMessage: true,
  rules: {
    required: "Showroom is required",
  },
  xs: 10,
});

export const CategoryListFields = (
  index: number,
  handleChanges: (name: string, value: any) => void,
): FieldProps[] => [
  {
    fieldType: "autoComplete",
    name: `categoryList.${index}.categoryCode`,
    size: "medium",
    // variant: "standard",
    renderItem: ({ option, props, isSelected }) => (
      <CategoryCard
        key={option.CategoryID}
        options={option}
        props={props}
        isSelected={isSelected}
      />
    ),
    searchApi: (keyStroke) =>
      AllocationCategoryList(
        {
          CategoryCode: keyStroke,
          CategoryDesc: "",
        },
        {
          enabled: keyStroke !== "" ? true : false,
        },
      ),
    // optionKey: "CategoryID",
    changes: handleChanges,
    getOptionLabel: (option) => (option ? `${option.CategoryCode}` : ""),
    options: (searchData) => searchData?.Data ?? [],
    xs: 2,
  },
  {
    fieldType: "autoComplete",
    name: `categoryList.${index}.categoryName`,
    size: "medium",
    // variant: "standard",
    renderItem: ({ option, props, isSelected }) => (
      <CategoryCard
        key={option.CategoryID}
        options={option}
        props={props}
        isSelected={isSelected}
      />
    ),
    searchApi: (keyStroke) =>
      AllocationCategoryList(
        {
          CategoryCode: "",
          CategoryDesc: keyStroke,
        },
        {
          enabled: keyStroke !== "" ? true : false,
        },
      ),
    // optionKey: "CategoryCode",
    changes: handleChanges,
    getOptionLabel: (option) => (option ? `${option.CategoryDesc}` : ""),
    options: (searchData) => searchData?.Data ?? [],

    xs: 8.4,
  },
];
