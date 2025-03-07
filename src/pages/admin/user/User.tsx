import ConfirmationDialog from "@/common/ModalComponent/ConfirmationDialog";
import SubmitButtons from "@/common/UI-component/SubmitButtons";
import UserForm from "@/components/user/userForm";
import UserFormTitle from "@/components/user/userFormTitle";
import { useUserForm } from "@/hooks/admin/user/useUserForm";
import { Grid } from "@mui/material";
import { FormProvider } from "react-hook-form";

const User = () => {
  const {
    method,
    isModalOpen,
    isPending,
    reset,
    setEmpFocus,
    setRoleFocus,
    setIsModalOpen,
    handleSeachList,
    handleSubmit,
    handleSave,
  } = useUserForm();

  return (
    <>
      <Grid
        container
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
        <FormProvider {...method}>
          <Grid item container xs={12} mt={1} px={2} mb={2} rowSpacing={2}>
            <UserForm
              reset={reset}
              userIdDisable={false}
              employeeFocus={setEmpFocus}
              roleFocus={setRoleFocus}
            />
            <SubmitButtons
              primaryActions="Submit"
              secondaryActions="Cancel"
              onSubmit={method.handleSubmit(handleSubmit)}
              onCancel={() => method.reset()}
              placement="center"
            />
          </Grid>
        </FormProvider>
      </Grid>

      <ConfirmationDialog
        open={isModalOpen}
        loading={isPending}
        onCancel={() => setIsModalOpen(false)}
        dialogType="submit"
        title="User"
        description="Confirm to save"
        onConfirm={handleSave}
      />
    </>
  );
};

export default User;
