import React, { FC } from "react";
import {
	Box,
	Button,
	ButtonBaseProps,
	Grid,
	Skeleton,
	Theme,
	Typography,
	styled,
	useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SwipeableViews from "react-swipeable-views";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import AnimateButton from "../../../Extended/AnimateButton";
import DotIndicator from "./Indicator";
// import { distance } from "framer-motion";

interface CarouselProps {
	children: React.ReactNode[];
	rows: number;
	columns: number;
	label: string;
	currentPage: number;
	isLoading?: boolean;
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
	isLoading,
	setCurrentPage,
}) => {
	// const [currentPage, setCurrentPage] = useState(0);

	const itemsPerPage = rows * columns;

	const totalSlides = Math.ceil(children.length / itemsPerPage);

	const handleNext = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalSlides - 1));
	};

	const handlePrevious = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
	};

	// const startIndex = currentPage * itemsPerPage;
	// const endIndex = startIndex + itemsPerPage;

	// const visibleItemsOnPage = children.slice(startIndex, endIndex);

	return (
		<CarouselContainer>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={2}>
				<NaviationButton onClick={handlePrevious} disabled={currentPage === 0}>
					<ArrowBackIcon />
				</NaviationButton>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						flex: 1, // Allow the content to use up available space
						overflow: "hidden",
					}}>
					<Typography
						variant="h6"
						fontWeight="medium"
						textTransform="capitalize">
						{label}
					</Typography>
					<DotIndicator total={totalSlides} activeIndex={currentPage} />
				</Box>
				<NaviationButton
					onClick={handleNext}
					// disabled={startIndex + visibleItemsCount >= children.length}
					disabled={currentPage === totalSlides - 1}>
					<ArrowForwardIcon />
				</NaviationButton>
			</Box>

			{isLoading && <LoadingItem rows={1} columns={3} />}

			<SwipeableViews
				index={currentPage}
				onChangeIndex={(index: number) => setCurrentPage(index)}
				containerStyle={{ width: "100%" }}>
				{Array.from({ length: totalSlides }).map((_, pageIndex) => (
					<Grid container spacing={2} key={pageIndex}>
						{children
							.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
							.map((item, index) => (
								<Grid item xs={12 / columns} key={index}>
									{item}
								</Grid>
							))}
					</Grid>
				))}
			</SwipeableViews>
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
interface LoadingItemProps {
	rows: number;
	columns: number;
}

const LoadingItem: FC<LoadingItemProps> = ({ rows, columns }) => {
	const itemsPerPage = rows * columns;

	// const totalSlides = Math.ceil(dummyChildren.length / itemsPerPage);

	return (
		<Grid container spacing={2}>
			{[...Array(itemsPerPage)].map((_, index) => (
				<Grid item xs={12 / columns} key={index}>
					<Skeleton animation="wave" height="120px" />
				</Grid>
			))}
		</Grid>
	);
};

export default Carousel;
