import React, { useEffect, useRef } from "react";
import { Box, styled, useTheme, Typography } from "@mui/material";

interface DotIndicatorProps {
	total: number; // Total number of dots
	activeIndex: number; // Index of the active dot (zero-based)
	dotsize?: number; // Size of each dot (default is 10)
	maxVisibleDots?: number; // Maximum number of visible dots (default is 25)
}

const DotIndicatorContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	overflowX: "auto", // Allow horizontal scrolling
	whiteSpace: "nowrap", // Prevent line break
	scrollBehavior: "smooth",
	maxWidth: "100%", // Adjust as needed
	flexShrink: 0,
	padding: theme.spacing(1, 0), // Optional padding for better spacing
}));

const Dot = styled(Box)<{ isactive: "true" | "false"; dotsize: number }>(
	({ isactive, dotsize }) => ({
		minWidth: dotsize,
		height: dotsize,
		borderRadius: "50%",
		backgroundColor: isactive === "true" ? "currentColor" : "transparent",
		border: `2px solid ${isactive === "true" ? "transparent" : "currentColor"}`,
		margin: `0 ${dotsize / 2}px`,
		transition: "background-color 0.3s ease, border-color 0.3s ease",
		cursor: "pointer",
		"&:hover": {
			backgroundColor: "currentColor",
			borderColor: "currentColor",
		},
	})
);

const DotIndicator: React.FC<DotIndicatorProps> = ({
	total,
	activeIndex,
	dotsize = 10,
	maxVisibleDots = 25,
}) => {
	const theme = useTheme();
	const containerRef = useRef<HTMLDivElement | null>(null);
	const activeDotRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (activeDotRef.current && containerRef.current) {
			const activeDotRect = activeDotRef.current.getBoundingClientRect();
			const containerRect = containerRef.current.getBoundingClientRect();

			// Check if the active dot is fully visible within the container
			if (
				activeDotRect.left < containerRect.left ||
				activeDotRect.right > containerRect.right
			) {
				activeDotRef.current.scrollIntoView({
					inline: "center",
					block: "nearest",
				});
			}
		}
	}, [activeIndex]);

	const visibleDotsCount = Math.min(total, maxVisibleDots);
	const startIndex = Math.max(
		0,
		Math.min(
			activeIndex - Math.floor(maxVisibleDots / 2),
			total - maxVisibleDots
		)
	);

	return (
		<Box display="flex" flexDirection="column" alignItems="center">
			<DotIndicatorContainer ref={containerRef}>
				{Array.from({ length: visibleDotsCount }).map((_, index) => {
					const actualIndex = startIndex + index;
					return (
						<Dot
							key={actualIndex}
							isactive={actualIndex === activeIndex ? "true" : "false"}
							dotsize={dotsize}
							ref={actualIndex === activeIndex ? activeDotRef : null}
							style={{
								backgroundColor:
									actualIndex === activeIndex
										? theme.palette.secondary.dark
										: "transparent",
								borderColor: theme.palette.secondary.dark,
							}}
						/>
					);
				})}
			</DotIndicatorContainer>
			{total > maxVisibleDots && (
				<Typography variant="body2" color="textPrimary" fontWeight={"medium"}>
					{activeIndex + 1} / {total}
				</Typography>
			)}
		</Box>
	);
};

export default DotIndicator;
