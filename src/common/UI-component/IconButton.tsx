import { IconButton, IconButtonProps } from "@mui/material";

const CustomIconButton = (props: IconButtonProps) => {
  return (
    <IconButton
      sx={{
        borderRadius: 0,
      }}
      {...props}
    ></IconButton>
  );
};

export default CustomIconButton;
