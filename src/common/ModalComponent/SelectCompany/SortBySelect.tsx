import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SortBySelect: FC = () => {
  const { watch, setValue } = useFormContext();
  const sortBy = watch("sortBy");
  const sortDirection = watch("sortDirection");

  return (
    <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
      <InputLabel>Sort by</InputLabel>
      <Select
        label="Sort by"
        value={`${sortBy}-${sortDirection}`}
        onChange={(event) => {
          const [newSortBy, newSortDirection] = event.target.value.split(
            "-",
          ) as ["CompanyCode" | "CompanyDesc", "asc" | "desc"];
          setValue("sortBy", newSortBy);
          setValue("sortDirection", newSortDirection);
        }}
      >
        <MenuItem value="CompanyCode-asc">Code (A-Z)</MenuItem>
        <MenuItem value="CompanyCode-desc">Code (Z-A)</MenuItem>
        <MenuItem value="CompanyDesc-asc">Name (A-Z)</MenuItem>
        <MenuItem value="CompanyDesc-desc">Name (Z-A)</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortBySelect;
