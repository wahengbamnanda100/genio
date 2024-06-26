import React from "react";
import { Box, styled, useTheme } from "@mui/material";

interface DotIndicatorProps {
	total: number; // Total number of dots
	activeIndex: number; // Index of the active dot (zero-based)
	dotSize?: number; // Size of each dot (default is 10)
}

const Dot = styled(Box)<{ isActive: boolean; dotSize: number }>(
	({ isActive, dotSize }) => ({
		width: dotSize,
		height: dotSize,
		borderRadius: "50%",
		backgroundColor: isActive ? "currentColor" : "transparent",
		border: `2px solid ${isActive ? "transparent" : "currentColor"}`,
		margin: `0 ${dotSize / 2}px`,
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
	dotSize = 10,
}) => {
	const theme = useTheme();

	return (
		<Box display="flex" justifyContent="center" alignItems="center">
			{Array.from({ length: total }).map((_, index) => (
				<Dot
					key={index}
					isActive={index === activeIndex}
					dotSize={dotSize}
					style={{
						backgroundColor:
							index === activeIndex
								? theme.palette.secondary.dark
								: "transparent",
						borderColor: theme.palette.secondary.dark,
					}}
				/>
			))}
		</Box>
	);
};

export default DotIndicator;
