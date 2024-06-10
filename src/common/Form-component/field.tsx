import _ from "lodash";
import { FieldProps } from "./formField.type";
import { CheckBoxField, InputField } from ".";
import AsyncSearchField from "./AsyncSearchField";
// import DropZoneField from "./DropZoneField";
import DateField from "./DatePickerField";
import SelectField from "./selectField";
// import ReactDropZoneField from "./ReactDropZoneField";

const Field = (props: FieldProps) => {
	const { fieldType } = props;

	return fieldType === "text" ? (
		<InputField {..._.omit(props, ["fieldType"])} />
	) : fieldType === "checkbox" ? (
		<CheckBoxField {..._.omit(props, ["fieldType", "name"])} />
	) : fieldType === "search" ? (
		<AsyncSearchField {..._.omit(props, ["fieldType"])} />
	) : fieldType === "date" ? (
		<DateField {..._.omit(props, ["fieldType"])} />
	) : fieldType === "select" ? (
		<SelectField {..._.omit(props, ["fieldType"])} />
	) : // fieldType === "reactdropzone" ? (
	//<ReactDropZoneField {..._.omit(props, ["fieldType"])} />
	//) :  ) : fieldType === "dropzone" ? (
	//   <AsyncSearchField {..._.omit(props, ["fieldType"])} />
	// ) : fieldType === "dateTime" ? (
	//   <AsyncSearchField {..._.omit(props, ["fieldType"])} />
	// )
	null;
};

export default Field;
