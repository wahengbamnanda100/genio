import { FC, useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  DialogCloseIconStyled,
  DialogContentStyled,
  DialogStyled,
  DialogTitleStyled,
} from "../ConfirmationDialog.style";
import SortBySelect from "./SortBySelect";
import CompanyListItem from "./CompanyListItem";
import {
  alpha,
  Box,
  Button,
  CardActions,
  Checkbox,
  FormControlLabel,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { PaperComponent } from "../ConfirmationDialog";

interface FormValues {
  selectedCompanies: Set<string>;
  sortBy: "CompanyCode" | "CompanyDesc";
  sortDirection: "asc" | "desc";
  selectAll: boolean;
}

export interface CompanyData {
  CompanyId: string;
  CompanyCode: string;
  CompanyDesc: string;
}

interface SelectCompanyModalProps {
  open: boolean;
  loading: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  data: CompanyData[];
  onSelectCompaines: (selectedCompanies: Set<string>) => void;
}

const AddCompanyModal: FC<SelectCompanyModalProps> = ({
  open,
  loading,
  setOpen,
  title,
  data,
  onSelectCompaines,
}) => {
  const theme = useTheme();
  const methods = useForm<FormValues>({
    defaultValues: {
      selectedCompanies: new Set<string>(),
      sortBy: "CompanyCode",
      sortDirection: "asc",
      selectAll: false,
    },
  });

  const { watch, setValue, handleSubmit, reset } = methods;
  const selectedCompanies = watch("selectedCompanies");
  const sortBy = watch("sortBy");
  const sortDirection = watch("sortDirection");

  const sortedCompanies = useMemo(() => {
    return [...data].sort((a, b) => {
      const modifier = sortDirection === "asc" ? 1 : -1;
      return a[sortBy].localeCompare(b[sortBy]) * modifier;
    });
  }, [data, sortBy, sortDirection]);

  const toggleAll = (checked: boolean) => {
    const allCompanies: Set<string> = checked
      ? new Set(data.map((company) => company.CompanyId))
      : new Set();
    setValue("selectedCompanies", allCompanies);
  };

  const toggleCompany = (id: string) => {
    const newSelected = new Set(selectedCompanies);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setValue("selectedCompanies", newSelected);
  };

  const onSubmit = (data: FormValues) => {
    onSelectCompaines(data.selectedCompanies);
    handleClose(); // Close modal after selection
  };

  const handleClose = () => {
    reset(); // Reset form data
    setOpen(false); // Close the modal
  };

  return (
    <DialogStyled
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-CompanyList-dialog"
      sx={{
        "& .MuiDialog-paperWidthSm": { minWidth: "600px", maxWidth: "600px" },
      }}
    >
      <DialogCloseIconStyled onClick={handleClose}>
        <CloseIcon />
      </DialogCloseIconStyled>
      <DialogTitleStyled
        id="draggable-dialog-title"
        dialogType="submit"
        sx={{
          cursor: "move",
          color: "inherit",
          fontWeight: "inherit",
          p: 1,
          ":hover": { bgcolor: alpha(theme.palette.primary.light, 0.3) },
        }}
      >
        <Typography variant="h6" flex={1}>
          {title}
        </Typography>
      </DialogTitleStyled>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContentStyled
            sx={{
              height: "100%",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              p: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCompanies.size === data.length}
                    onChange={(e) => toggleAll(e.target.checked)}
                    color="primary"
                  />
                }
                label={<Typography variant="body1">Select All</Typography>}
              />
              <SortBySelect />
            </Box>
            <Box sx={{ maxHeight: 400, overflowY: "auto", pr: 1 }}>
              {!loading
                ? sortedCompanies.map((company) => (
                    <CompanyListItem
                      key={company.CompanyId}
                      company={company}
                      selected={selectedCompanies.has(company.CompanyId)}
                      toggleCompany={toggleCompany}
                    />
                  ))
                : Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} animation="wave" height={20} />
                  ))}
            </Box>
          </DialogContentStyled>

          <CardActions>
            <Stack
              direction={"row"}
              gap={2}
              width={"100%"}
              justifyContent={"flex-end"}
            >
              <Button variant="contained" size="medium" type="submit">
                Select
              </Button>
              <Button size="medium" onClick={handleClose}>
                Cancel
              </Button>
            </Stack>
          </CardActions>
        </form>
      </FormProvider>
    </DialogStyled>
  );
};

export default AddCompanyModal;
