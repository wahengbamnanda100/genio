import { FC } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface FormTitleProps {
  title: string;
  onSerch: () => void;
}

const FormTitle: FC<FormTitleProps> = ({ title, onSerch }) => {
  return (
    <>
      <Box
        sx={{
          pb: 1,
          pt: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={"500"} gutterBottom>
          {title}
        </Typography>
        <Button
          variant="contained"
          onClick={onSerch}
          startIcon={<SearchIcon />}
        >
          Search List
        </Button>
      </Box>
      <Divider
        sx={{
          borderBottom: "1px solid",
          borderBottomColor: "primary.main",
          mb: 2,
        }}
      />
    </>
  );
};

export default FormTitle;
