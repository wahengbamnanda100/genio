//!______________________________________

import { Controller, useFormContext, useFormState } from "react-hook-form";
import { FormControl, Grid, InputLabel, useTheme } from "@mui/material";
import _ from "lodash";
// import { ChangeEvent, forwardRef, useRef } from "react";
import { ChangeEvent, forwardRef, useState } from "react";
import { InputFieldProps } from "../../../Form-component/formField.type";
import { ErrorContainer } from "../../../Form-component/ErrorContainer";
// import { IMaskInput } from "react-imask";
import {
  NumericFormat,
  NumericFormatProps,
  PatternFormat,
} from "react-number-format";
import { NewTextField } from "./Form-style/Input-style";

const NewInputField = ({
  name,
  rules,
  size = "small",
  variant = "standard",
  condition,
  // thousandSeparator,
  className,
  style,
  xs,
  sm,
  lg,
  md,
  label,
  rtl = false,
  bgColor = "inherit",
  // numberFormate,
  hasErrorMessage,
  ...restProps
}: InputFieldProps) => {
  const theme = useTheme();
  const { control } = useFormContext();
  const { errors } = useFormState({ control });
  const hasError = Boolean(_.get(errors, name));

  const [, setIsFocused] = useState<boolean>(false);

  // const addCommas = (num) =>
  // 	num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} className={className} sx={style}>
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, onChange, ...rest } }) => (
          <FormControl size={size} variant={variant} fullWidth>
            <InputLabel
              shrink
              htmlFor={`form-${label}`}
              sx={{ color: hasError ? theme.palette.error.main : "inherit" }}
            >
              {label}
            </InputLabel>
            <NewTextField
              {...rest}
              {...restProps}
              id={`form-${label}`}
              fullWidth
              error={Boolean(_.get(errors, name))}
              inputRef={ref}
              // variant={variant}
              size={size}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
              ) => {
                condition
                  ? (condition.test(e.target.value) || !e.target.value) &&
                    onChange(e.target.value)
                  : onChange(e.target.value);
              }}
              // InputLabelProps={{ //todo fix it later
              //   //   shrink: Boolean(value) || isFocused,
              //   style: {
              //     direction: rtl ? "rtl" : "ltr",
              //     textAlign: rtl ? "right" : "left",
              //   },
              // }}
              autoComplete="off"
              // label={label}
              sx={{
                backgroundColor: bgColor,
                direction: rtl ? "rtl" : "ltr",
                "& .MuiInputLabel-root": {
                  transformOrigin: rtl ? "top right" : "top left",
                  right: rtl ? 25 : "unset",
                  // left: rtl ? "unset" : 25,
                  textAlign: rtl ? "right" : "left",
                },
                "& .MuiInputBase-root": {},
                "& .MuiOutlinedInput-notchedOutline": {
                  direction: rtl ? "rtl" : "ltr",
                  textAlign: rtl ? "right" : "left",
                },
              }}
            />
          </FormControl>
        )}
        rules={rules}
      />
      {hasErrorMessage && _.get(errors, name) && (
        <ErrorContainer>
          {
            (_.get(errors, name)
              ? _.get(errors, `${name}.message`)
              : null) as React.ReactNode
          }
        </ErrorContainer>
      )}
    </Grid>
  );
};

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

// const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(
// 	function TextMaskCustom(props, ref) {
// 		const { onChange, ...other } = props;
// 		const inputRef = useRef(null);
// 		return (
// 			<IMaskInput
// 				{...other}
// 				mask="+(00) 0000 000000"
// 				lazy={true}
// 				definitions={{
// 					"#": /[1-9]/,
// 				}}
// 				//@ts-ignore
// 				inputRef={ref}
// 				onAccept={(value: any) =>
// 					onChange({ target: { name: props.name, value } })
// 				}
// 				overwrite
// 			/>
// 		);
// 	}
// );

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onFocus={(e) => e.target.select()}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        decimalScale={2}
        thousandSeparator
        valueIsNumericString
        fixedDecimalScale
        // prefix="$"
      />
    );
  },
);

const NumericPercnetageFormatCustom = forwardRef<
  NumericFormatProps,
  CustomProps
>(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onFocus={(e) => e.target.select()}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      decimalScale={5}
      thousandSeparator
      valueIsNumericString
      fixedDecimalScale
      suffix="%"
      // prefix="$"
    />
  );
});

const CeditCardNubmer = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <PatternFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        format="####"
        mask="_" // Mask for incomplete input
        // allowEmptyFormatting
      />
    );
  },
);

export default NewInputField;
export { NumericFormatCustom, CeditCardNubmer, NumericPercnetageFormatCustom };
