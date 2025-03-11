// import { InputRounded } from "@mui/icons-material";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const formatText = (text: string) => {
  return text
    .replace(/-/g, " ") // Replace dashes with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter
};

interface CustombreadcrumbProps {
  isEdit?: boolean;
  isView?: boolean;
  breadcrumbTitle?: string;
}

const CustomBreadcrumbs = ({
  isEdit = false,
  isView = false,
  breadcrumbTitle = "",
}: CustombreadcrumbProps) => {
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
        const displayValue =
          last && isEdit && isView && breadcrumbTitle ? breadcrumbTitle : value;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography color="text.primary" key={to} sx={{ fontWeight: "bold" }}>
            {formatText(displayValue)}
          </Typography>
        ) : (
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate(to)}
            key={to}
            sx={{ cursor: "pointer" }}
          >
            {formatText(displayValue)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
