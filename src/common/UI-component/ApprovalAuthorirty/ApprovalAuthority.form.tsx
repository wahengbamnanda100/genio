import {
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  useTheme,
  lighten,
} from "@mui/material";
import Box from "@mui/material/Box/Box";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Field from "../../Form-component/field";
import ApprovalAuthorityDetailTable from "./ApprovalAuthority.table";
import {
  ApprovalAuthorityFeilds,
  ApprovalAuthorityFeilds1,
} from "./ApprovalAuthority.type";

export const ApprovalAuthorityDetail = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: "0.5rem",
        bgcolor: lighten(theme.palette.primary.light, 0.9),
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={"medium"}>
            SL NO
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" fontWeight={"medium"}>
            Level
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button variant="contained" startIcon={<AddIcon />}>
            Add Level
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ my: 1 }}>
        <AuthorityAccordion index={1} />
      </Box>
    </Box>
  );
};

interface AuthorityAccordionProps {
  index: number;
}
export const AuthorityAccordion = ({ index }: AuthorityAccordionProps) => {
  const theme = useTheme();

  const onClickAddEmployee = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    console.log("Add employee button clicked");
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index}-content`}
        id={`panel${index}-header`}
        sx={{
          bgcolor: lighten(theme.palette.primary.light, 0.4),
          borderRadius: "0.5rem",
        }}
      >
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={2}>
            <Typography variant="body1" fontWeight={"medium"}>
              {index}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" fontWeight={"medium"}>
              Level {index}
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              sx={{
                color: theme.palette.text.primary,
                borderColor: theme.palette.text.primary,
                mr: 1,
              }}
              onClick={onClickAddEmployee}
            >
              Add Employee
            </Button>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <ApprovalAuthorityDetailTable data={[]} isLoading={false} />
      </AccordionDetails>
    </Accordion>
  );
};

const ApprovalAuthorityForm = () => {
  return (
    <Grid item xs={12} container spacing={1} columnSpacing={2}>
      {...ApprovalAuthorityFeilds().map((field) => (
        <Field key={field.name} {...field} />
      ))}
      {...ApprovalAuthorityFeilds1().map((field) => (
        <Field key={field.name} {...field} />
      ))}
    </Grid>
  );
};

export default ApprovalAuthorityForm;
