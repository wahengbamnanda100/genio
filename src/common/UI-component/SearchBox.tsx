import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import AnimateButton from "./Extended/AnimateButton";

interface SearchBoxProps {
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  onSearch: () => void;
  onCancel: () => void;
  title: string;
  children: ReactNode;
  sx?: SxProps;
}

interface ActionButtonProps {
  varient: "search" | "cancel";
  onClick: () => void;
}

const ActionButton: FC<ActionButtonProps> = ({ varient, onClick }) => {
  return (
    <AnimateButton>
      <Button
        variant={varient === "search" ? "contained" : "outlined"}
        color={"secondary"}
        fullWidth
        sx={{
          borderRadius: 1,
          px: 2,
        }}
        startIcon={varient === "search" ? <SearchIcon /> : <ClearIcon />}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault(); // Optional: prevents default form submission behavior
          onClick(); // Corrected to invoke the function
        }}
      >
        {varient}
      </Button>
    </AnimateButton>
  );
};
// SearchButtonGroup does not require a generic parameter
interface SearchButtonGroupProps {
  onSearch: () => void;
  onCancel: () => void;
}

const SearchButtonGroup: FC<SearchButtonGroupProps> = ({
  onSearch,
  onCancel,
}) => {
  return (
    <Stack direction={"row"} gap={2}>
      <ActionButton varient="search" onClick={onSearch} />
      <ActionButton varient="cancel" onClick={onCancel} />
    </Stack>
  );
};

// Declare the generic type in the FC definition for SearchBox
const SearchBox = ({
  expanded,
  setExpanded,
  title,
  children: fields,
  onSearch,
  onCancel,
  sx,
}: SearchBoxProps) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={4}
      sx={{
        border: `1px solid`,
        borderColor: theme.palette.secondary.main,
        m: 2,
        ...sx,
      }}
    >
      <Accordion
        component={"form"}
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        sx={{
          backgroundColor: alpha(theme.palette.secondary.main, 0.1),
          boxShadow: theme.shadows[4],
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Stack direction={"row"} alignItems={"center"}>
            <SearchIcon />
            <Typography variant="body1" fontWeight={"medium"} pl={1}>
              {title}
            </Typography>
          </Stack>
        </AccordionSummary>
        <Divider
          sx={{
            mb: 1,
            mx: 2,
            borderBottom: "0.01em solid",
            borderBlockColor: theme.palette.secondary.main,
          }}
        />
        <AccordionDetails sx={{ pb: 0.4 }}>
          <Grid container spacing={1.5}>
            {fields}
          </Grid>
        </AccordionDetails>
        <AccordionActions sx={{ px: 2 }}>
          <SearchButtonGroup onSearch={onSearch} onCancel={onCancel} />
        </AccordionActions>
      </Accordion>
    </Paper>
  );
};

export default SearchBox;
