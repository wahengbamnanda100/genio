import {
  Paper,
  Box,
  Typography,
  Divider,
  Grid,
  Button,
  ButtonProps,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import CustomContainer from "../common/UI-component/CustomContainer";
import { useMemo, useState } from "react";
import SearchBox from "../common/UI-component/SearchBox";
import Field from "../common/Form-component/field";
import {
  AppActivationFields,
  AppActivationType,
} from "../common/UI-component/AppActivation/AppActivation.type";
import AppActivationTable from "../common/UI-component/AppActivation/AppActivation.table";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

interface ButtonConfig extends ButtonProps {
  label: string;
}

const AppActivation = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const methods = useForm<AppActivationType>({
    defaultValues: {
      Company: "",
      Product: "",
      AppStatus: "",
      FamilyId: "",
      FullName: "",
      MobileNo: "",
      ParentType: "",
    },
  });

  const handleSubmit = (data: AppActivationType) => {
    console.log({ data });
  };

  const handleReset = () => {
    methods.reset();
  };

  const buttonConfig: ButtonConfig[] = [
    {
      label: "Submit Without Mail",
      variant: "contained",

      color: "secondary",
      //   size: "small",
      disabled: false,
      startIcon: <DoneAllIcon />,
      onClick: () => handleSubmit,
      sx: {
        marginRight: 1,
      },
    },
    {
      label: "Deactivate",
      variant: "outlined",

      color: "error",
      //   size: "small",
      disabled: false,
      startIcon: <RemoveCircleOutlineIcon />,
      onClick: () => handleReset,
      sx: {
        marginRight: 1,
      },
    },
    {
      label: "Submit and Email",
      variant: "contained",

      color: "primary",
      //   size: "small",
      disabled: false,
      startIcon: <CheckIcon />,
      onClick: () => handleReset,
      sx: {
        marginRight: 1,
      },
    },
    {
      label: "Cancel",
      variant: "outlined",

      color: "primary",
      //   size: "small",
      disabled: false,
      startIcon: <CloseIcon />,
      onClick: () => handleReset,
      sx: {
        marginRight: 1,
      },
    },
  ];

  const pageStyles = useMemo(
    () => ({
      paper: {
        mt: 4,
        p: 2,
        px: 3,
        minHeight: `calc(100vh - 89px)`,
      },
      container: {
        // width: { md: "60%", sm: "80%", xs: "100%" },
        width: "100%",
        margin: "auto",
        p: 3,
        height: "100%",
        boxShadow: 2,
      },
    }),
    [],
  );

  return (
    <Paper sx={pageStyles.paper}>
      <Box sx={{ pb: 2, pt: 1 }}>
        <Typography variant="h6" fontWeight={"500"} gutterBottom>
          User App Activation
        </Typography>
        <Divider
          sx={{
            borderBottom: "1px solid",
            borderBottomColor: "primary.main",
          }}
        />
      </Box>

      <CustomContainer sx={pageStyles.container}>
        <FormProvider {...methods}>
          {/* <Grid item container xs={12}> */}
          <SearchBox
            expanded={expanded}
            setExpanded={setExpanded}
            onSearch={methods.handleSubmit(handleSubmit)}
            title="Search App User"
            onCancel={handleReset}
            sx={{ m: 0 }}
          >
            {AppActivationFields().map((field) => (
              <Field key={field.name} {...field} />
            ))}
          </SearchBox>
          {/* </Grid> */}
        </FormProvider>

        <Box sx={{ m: 2 }} />

        <AppActivationTable />
        <Box sx={{ m: 2 }} />
        <Grid item container spacing={2} justifyContent={"center"}>
          {buttonConfig.map((button) => (
            <Grid item key={button.label}>
              <Button
                variant={button.variant}
                color={button.color}
                size={button.size}
                fullWidth
                disabled={button.disabled}
                startIcon={button.startIcon}
                onClick={button.onClick}
                sx={button.sx}
              >
                {button.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CustomContainer>
    </Paper>
  );
};

export default AppActivation;
