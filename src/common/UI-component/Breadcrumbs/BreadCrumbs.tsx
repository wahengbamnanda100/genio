import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

interface BreadcrumbsProps {
  pages: { label: string; href?: string }[];
}

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BasicBreadcrumbs({ pages }: BreadcrumbsProps) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: "primary.main",
            fontSize: "20px",
          },
        }}
      >
        {pages.map((page, index) => {
          const isLast = index === pages.length - 1;
          return isLast ? (
            <Typography
              key={page.label}
              sx={{ color: "text.primary", fontWeight: "bold" }}
            >
              {page.label}
            </Typography>
          ) : (
            <Link
              key={page.label}
              underline="hover"
              href={page.href}
              sx={{ color: "text.primary" }}
            >
              {page.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
