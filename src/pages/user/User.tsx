import { Grid } from "@mui/material";
import { useUserForm } from "../../hooks/user/useUserForm";

import UserForm, { UserFormTitle } from "../../components/user/userForm";
import { FormProvider } from "react-hook-form";

const User = () => {
  const { method, handleSeachList } = useUserForm();

  return (
    <Grid
      container
      // justifyContent={"center"}
      rowSpacing={1}
      sx={{
        width: "100%",
        borderRadius: 1,
        overflowY: "hidden",
        overflowX: "hidden",
        p: 1,
      }}
    >
      <UserFormTitle title="Create" handleSearchList={handleSeachList} />
      <Grid item xs={12} mt={1} px={2}>
        <FormProvider {...method}>
          <UserForm />
        </FormProvider>
      </Grid>
    </Grid>
  );
};

export default User;
