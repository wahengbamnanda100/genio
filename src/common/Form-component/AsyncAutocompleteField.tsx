/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useFormContext, useFormState } from "react-hook-form";
import {
  Autocomplete,
  CircularProgress,
  Grid,
  Popper,
  TextField,
} from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { ErrorContainer } from "./ErrorContainer";
import { AsyncAutoCompleteFieldProps } from "./formField.type";

const StyledPoper = (props: any) => {
  return (
    <Popper
      {...props}
      style={{ width: "fit-content", minWidth: "200px" }}
      placement="bottom-start"
    />
  );
};

const AsyncAutoCompleteField = ({
  name,
  searchApi,
  options,
  getOptionLabel,
  filterOptions = (x) => x,
  rules,
  variant = "outlined",
  size = "small",
  style,
  className,
  xs,
  sm,
  sx,
  setValue,
  placeholder,
  label,
  hasErrorMessage,
  id,
  freeSolo,
  optionKey,
  //   columns,
  changes,
  onFocus,
  renderItem,
  ...restProps
}: AsyncAutoCompleteFieldProps) => {
  const { control } = useFormContext();
  const { errors } = useFormState({ control });

  const [keyStrocke, setKeyStrocke] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const { data: searchData, isLoading } = searchApi(keyStrocke);

  useEffect(() => {
    if (isFocused && onFocus) {
      // //console.log("inside seard field", name, isFocused);

      onFocus(name);
    }
  }, [isFocused, name, onFocus]);

  return (
    <Grid item xs={xs} sm={sm} className={className} style={style}>
      <Controller
        key={id}
        name={name}
        control={control}
        render={({ field: { onChange, ref, ...rest } }) => (
          <Autocomplete
            // open={true}
            freeSolo={freeSolo}
            // autoSelect
            {...rest}
            fullWidth
            sx={sx}
            loading={isLoading}
            onChange={(e, value) => {
              setValue && setValue(name, value);
              changes && changes(name, value);
              if (!freeSolo) {
                onChange(value);
                return;
              }
              if (optionKey) {
                if (typeof value === "string") {
                  if (
                    options(searchData).find((el) => el[optionKey] === value)
                  ) {
                    onChange(
                      options(searchData).find((el) => el[optionKey] === value),
                    );
                    return;
                  }
                  onChange({ [optionKey || ""]: value });
                  return;
                }
                onChange(value);
                return;
              }
            }}
            onInputChange={(e, value) => isFocused && setKeyStrocke(value)}
            options={restProps.disabled ? [] : options(searchData)}
            getOptionLabel={getOptionLabel}
            filterOptions={filterOptions}
            PopperComponent={renderItem ? StyledPoper : undefined}
            renderOption={(props: any, option) => {
              return (
                <React.Fragment key={props["data-option-index"]}>
                  {renderItem ? (
                    <>{renderItem && renderItem({ option, props })}</>
                  ) : (
                    <li {...props}>{option[`${optionKey}`]}</li>
                  )}
                </React.Fragment>
              );
            }}
            noOptionsText={isLoading ? "Loading..." : "No options"}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  {...restProps}
                  inputRef={ref}
                  placeholder={placeholder}
                  label={label}
                  variant={variant}
                  size={size}
                  error={!!errors[name]}
                  onFocus={() => setIsFocused(true)} // Set focus state to true
                  onBlur={() => setIsFocused(false)} // Set focus state to false on blur
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {isLoading && (
                          <CircularProgress color="inherit" size={20} />
                        )}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              );
            }}
          />
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

export default AsyncAutoCompleteField;
