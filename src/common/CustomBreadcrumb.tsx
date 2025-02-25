import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const formatText = (text: string) => {
  return text
    .replace(/-/g, " ") // Replace dashes with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter
};

const CustomBreadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the path segments
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" color="black">
      <Link
        underline="hover"
        color="inherit"
        onClick={() => navigate("/")}
        sx={{ cursor: "pointer" }}
      >
        Home
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography color="text.primary" key={to} sx={{ fontWeight: "bold" }}>
            {formatText(value)}
          </Typography>
        ) : (
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate(to)}
            key={to}
            sx={{ cursor: "pointer" }}
          >
            {formatText(value)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
