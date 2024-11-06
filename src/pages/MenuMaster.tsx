import { Button, Grid, Paper, Stack, useTheme } from "@mui/material";
import MenuContainer from "../common/UI-component/Menumaster/MenuContainer";
import CustomMenuList from "../common/UI-component/Menumaster/MenuList";
import { FormProvider, useForm } from "react-hook-form";
import MenuForm from "../common/UI-component/Menumaster/MenuForm";
import { LoadingButton } from "@mui/lab";

const MenuMaster = () => {
  const theme = useTheme();
  const method = useForm({
    //todo set types
    defaultValues: {
      categoryTitle: "",
    },
  });

  const handleSubmit = () => {};
  return (
    <Paper sx={{ mt: 4, p: 2, px: 3 }}>
      <MenuContainer>
        <FormProvider {...method}>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            sx={{
              maxHeight: "85vh",
              minHeight: "85vh",
              borderRight: "1px solid",
              borderRightColor: theme.palette.primary.main,
              // overflowY: "auto",
            }}
          >
            <CustomMenuList />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={9}
            sx={{
              maxHeight: "85vh",
              overflowY: "auto",
            }}
          >
            <MenuForm />
            {/* <MenuForm /> */}
            <Stack
              direction={"row"}
              width={"100%"}
              alignItems={"center"}
              justifyContent={"flex-end"}
              gap={2}
              mb={4}
              px={2}
            >
              <LoadingButton
                loading={false} //todo change later
                variant="contained"
                loadingPosition="start"
                color={"secondary"}
                onClick={handleSubmit}
              >
                Submit
              </LoadingButton>
              <Button variant="outlined" color="primary">
                Cancel
              </Button>
            </Stack>
          </Grid>
        </FormProvider>
      </MenuContainer>
    </Paper>
  );
};

export default MenuMaster;
