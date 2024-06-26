import React, { FC } from "react";
import {
	Box,
	Button,
	ButtonBaseProps,
	Grid,
	Theme,
	Typography,
	styled,
	useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import AnimateButton from "../../../Extended/AnimateButton";
import DotIndicator from "./Indicator";

interface CarouselProps {
	children: React.ReactNode[];
	rows: number;
	columns: number;
	label: string;
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const CarouselContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
	position: "relative",
	overflow: "hidden",
	boxShadow: theme.shadows[4],
	border: `1px solid transparent`,
	padding: "0.5rem",
	paddingRight: "0.5rem",
	paddingLeft: "0.5rem",
	borderRadius: 6,

	display: "flex",
	flexDirection: "column",
}));

const Carousel: React.FC<CarouselProps> = ({
	children,
	rows,
	columns,
	label,
	currentPage,
	setCurrentPage,
}) => {
	// const [currentPage, setCurrentPage] = useState(0);

	const itemsPerPage = rows * columns;

	const totalSlides = Math.ceil(children.length / itemsPerPage);

	const handleNext = () => {
		// setSlideDirection("right");
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalSlides - 1));
	};

	const handlePrevious = () => {
		// setSlideDirection("left");
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
	};

	const startIndex = currentPage * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const visibleItemsOnPage = children.slice(startIndex, endIndex);

	return (
		<CarouselContainer>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={2}>
				<NaviationButton
					onClick={handlePrevious}
					// disabled={startIndex === 0}
				>
					<ArrowBackIcon />
				</NaviationButton>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						alignItems: "center",
						gap: 2,
					}}>
					<Typography
						variant="h6"
						fontWeight={"medium"}
						textTransform={"capitalize"}>
						{label}
					</Typography>
					<DotIndicator total={totalSlides} activeIndex={currentPage} />
				</Box>
				<NaviationButton
					onClick={handleNext}
					// disabled={startIndex + visibleItemsCount >= children.length}
				>
					<ArrowForwardIcon />
				</NaviationButton>
			</Box>

			<Grid container spacing={2}>
				{visibleItemsOnPage.length > 0 ? (
					visibleItemsOnPage.map((item, index) => (
						<Grid item xs={12 / columns} key={index}>
							{item}
						</Grid>
					))
				) : (
					<Box
						sx={{
							padding: 2,
							width: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Typography variant="h6" fontWeight={"medium"} color="grey.500">
							No Item found
						</Typography>
					</Box>
				)}
			</Grid>
		</CarouselContainer>
	);
};

interface NavigationBtnProps extends ButtonBaseProps {
	children: React.ReactNode;
	onClick: () => void;
}

const NaviationButton: FC<NavigationBtnProps> = ({
	children,
	onClick,
	...rest
}) => {
	const theme = useTheme();
	return (
		<AnimateButton>
			<Button
				{...rest}
				variant="contained"
				color="secondary"
				sx={{
					bgcolor: "secondary.main",
					maxWidth: "40px",
					maxHeight: "40px",
					borderRadius: 1,
					color: "white",
					padding: 2,
					boxShadow: theme.shadows[4],
					// "&:hover": {
					// 	bgcolor: "secondary.dark",
					// },
				}}
				onClick={onClick}>
				{children}
			</Button>
		</AnimateButton>
	);
};

export default Carousel;
