import { Button, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import { FC } from "react";
import AnimateButton from "./UI-component/Extended/AnimateButton";

interface SearchContainerProps {
  children: React.ReactNode;
  itemsNo: number;
  onSearch: () => void;
  onCancel: () => void;
}

const SearchContainer = ({
  children: fields,
  itemsNo,
  onSearch,
  onCancel,
}: SearchContainerProps) => {
  const buttonCols = 2;
  const fieldCols = 12 - buttonCols;

  const fieldItemCols = Math.floor(fieldCols / itemsNo);

  const isSingleRow = itemsNo < 4;
  return (
    <Grid container item spacing={2}>
      {fields}
      <Grid
        item
        container
        spacing={2}
        xs={3}
        textAlign={"end"}
        wrap={isSingleRow ? "nowrap" : "wrap"}
      >
        <Grid item xs={isSingleRow ? 6 : fieldItemCols}>
          <ActionButton varient="search" onClick={onSearch} />
        </Grid>
        <Grid item xs={isSingleRow ? 6 : fieldItemCols}>
          <ActionButton varient="cancel" onClick={onCancel} />
        </Grid>
      </Grid>
    </Grid>
  );
};

interface ActionButtonProps {
  varient: "search" | "cancel";
  onClick: () => void;
}

const ActionButton: FC<ActionButtonProps> = ({ varient, onClick }) => {
  return (
    <AnimateButton>
      <Button
        fullWidth
        sx={{
          borderRadius: 1,
          px: 2,
          bgcolor: varient === "search" ? "black" : "white",
          outline: varient === "search" ? "none" : "1px solid black",
          color: varient === "search" ? "white" : "black",
          "&:hover": {
            bgcolor: "white",
            color: "black",
            outline: "1px solid black",
          },
        }}
        startIcon={varient === "search" ? <SearchIcon /> : <ClearIcon />}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          onClick();
        }}
      >
        {varient}
      </Button>
    </AnimateButton>
  );
};

export default SearchContainer;
