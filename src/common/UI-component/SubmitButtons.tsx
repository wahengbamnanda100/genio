import { Button, Grid } from "@mui/material";

interface SubmitButtonsProps<T> {
  primaryActions: string;
  secondaryActions: string;
  placement?: "flex-start" | "flex-end" | "center";
  //   priamryProps: ButtonProps;
  //   secondaryProps: ButtonProps;
  onSubmit?: (data: T) => void;
  onCancel?: () => void;
}

const SubmitButtons = <T,>({
  primaryActions,
  secondaryActions,
  placement = "flex-end",
  onCancel,
  onSubmit,
}: SubmitButtonsProps<T>) => {
  return (
    <Grid item container spacing={2} justifyContent={placement}>
      <Grid item xs={2}>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ px: 2 }}
          onClick={() => onSubmit && onSubmit({} as T)} // Example: Passing an empty object as T
        >
          {primaryActions}
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          type="reset"
          variant="outlined"
          fullWidth
          sx={{ px: 2 }}
          onClick={onCancel && onCancel}
        >
          {secondaryActions}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SubmitButtons;
