import { Box, styled, Switch } from "@mui/material";

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 38,
  height: 22,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    boxShadow: theme.shadows[3],
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#000000",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#000000",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 18,
    height: 18,
    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)",
  },
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    boxShadow: "0 3px 5px 0 rgba(0,0,0,0.16)",
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export const ScrollableCardContainer = styled(Box)({
  maxHeight: "calc(100vh - 200px)",
  overflowY: "auto",
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  scrollBehavior: "smooth",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});

export const HeaderRow = styled(Box)({
  display: "grid",
  gridTemplateColumns: "80px 1fr 100px",
  padding: "12px 16px",
  backgroundColor: "#f5f5f5",
  borderBottom: "1px solid #e0e0e0",
  fontWeight: "bold",
});

export const CardRow = styled(Box)({
  display: "grid",
  gridTemplateColumns: "80px 1fr 100px",
  padding: "8px 16px",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#f9f9f9",
  },
});
