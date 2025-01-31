import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BasicBreadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: "primary.main", // Change the separator color
            fontSize: "20px", // Optional: Adjust the size
          },
        }}
      >
        <Link underline="hover" href="/" sx={{ color: "text.primary" }}>
          Home
        </Link>
        <Link
          underline="hover"
          href="/material-ui/getting-started/installation/"
          sx={{ color: "text.primary" }}
        >
          Role
        </Link>
        <Typography sx={{ color: "text.primary", fontWeight: "medium" }}>
          Create
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
