import {
  Box,
  Button,
  Grid,
  IconButton,
  lighten,
  useTheme,
} from "@mui/material";
import { FieldProps } from "../../Form-component";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SearchIcon from "@mui/icons-material/Search";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, useFormContext } from "react-hook-form";

export const SalePriceFields = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "company",
    label: "Company / Business Unit",
    hasErrorMessage: true,
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "showroom",
    label: "Showroom",
    hasErrorMessage: true,
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "date",
    name: "effectDate",
    label: "Effect Date",
    hasErrorMessage: true,
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "referenceNo",
    label: "Reference Number",
    hasErrorMessage: true,
    disabled: true,
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "manufacturerName",
    label: "Manufacturer Name",
    hasErrorMessage: true,
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "categoryName",
    label: "Category Name",
    hasErrorMessage: true,
    size: "medium",
    xs: 3,
  },
];

export const SearchActionButtons = () => {
  return (
    <Grid item container xs={6} spacing={1}>
      <Grid item xs={3}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<SearchIcon />}
          color="secondary"
        >
          Search
        </Button>
      </Grid>
      <Grid item xs={6}>
        {/* <Button variant="contained" fullWidth startIcon={<FileUploadIcon />}>
          Upload
        </Button> */}
        <FileUploadButton name="fileUpload" />
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<SimCardDownloadIcon />}
        >
          Import
        </Button>
      </Grid>
    </Grid>
  );
};

export const SalesNotes = (): FieldProps => ({
  fieldType: "text",
  name: "notes",
  label: "Notes",
  multiline: true,
  rows: 4,
  xs: 12,
});

export const FileUploadButton: React.FC<{ name: string }> = ({ name }) => {
  const theme = useTheme();
  const { control, setValue, watch } = useFormContext();
  const selectedFile = watch(name);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setValue(name, event.target.files[0]);
    }
  };

  const handleDelete = () => {
    setValue(name, null);
  };

  return (
    <Grid item container xs={12}>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={() => (
          <Box
            display="flex"
            width={"100%"}
            alignItems="center"
            gap={2}
            sx={
              {
                //   outline: "1px solid",
                //   outlineColor: "primary.main",
              }
            }
          >
            <Button
              variant={selectedFile ? "outlined" : "contained"}
              component="label"
              sx={{ textTransform: "none" }}
              fullWidth
              startIcon={selectedFile ? <AttachFileIcon /> : <FileUploadIcon />}
            >
              {selectedFile ? selectedFile.name : "Upload File"}
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {selectedFile && (
              <IconButton
                size="small"
                color="error"
                onClick={handleDelete}
                sx={{
                  outline: "1px solid",
                  outlineColor: "error.main",
                  bgcolor: lighten(theme.palette.error.main, 0.8),
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        )}
      />
    </Grid>
  );
};
