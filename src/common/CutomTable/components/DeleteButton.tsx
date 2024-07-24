import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface DeleteButtonProps {
	onExecute: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onExecute }) => (
	<IconButton
		color="error"
		onClick={() => {
			// eslint-disable-next-line
			if (window.confirm("Are you sure you want to delete this row?")) {
				onExecute();
			}
		}}
		title="Delete row"
		size="small"
		sx={{}}>
		<DeleteOutlineIcon sx={{ fontSize: "16px" }} />
	</IconButton>
);

export default DeleteButton;
