import { FC } from "react";
import { Checkbox, Typography, Card, CardContent, Stack } from "@mui/material";
import { CompanyData } from "./AddCompanyModal";
// import { useFormContext } from "react-hook-form";

interface CompanyListItemProps {
  company: CompanyData;
  selected: boolean;
  toggleCompany: (id: string) => void;
}

const CompanyListItem: FC<CompanyListItemProps> = ({
  company,
  selected,
  toggleCompany,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 1,
        "&:hover": { backgroundColor: "action.hover" },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          //   alignItems: "center",
          justifyContent: "flex-start",
        }}
        style={{ padding: 0.5 }}
      >
        <Checkbox
          checked={selected}
          onChange={() => toggleCompany(company.CompanyId)}
          color="primary"
        />
        <Stack
          direction={"row"}
          flex={1}
          gap={2}
          alignItems={"center"}
          justifyContent="flex-start" // Align children to the left side
          onClick={() => toggleCompany(company.CompanyId)}
        >
          <Typography
            variant="body1"
            fontWeight="medium"
            style={{
              width: "100%",
              textAlign: "left",
              fontWeight: "400",
              fontSize: "1.1em",
            }}
          >
            {company.CompanyDesc}
          </Typography>
          <Typography
            color="text.secondary"
            style={{
              width: "100%",
              textAlign: "left",
              fontWeight: "300",
              fontSize: "0.95em",
            }}
          >
            {company.CompanyCode}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CompanyListItem;
