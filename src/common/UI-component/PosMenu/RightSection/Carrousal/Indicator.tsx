import React from "react";
import { Box, styled, useTheme } from "@mui/material";

interface DotIndicatorProps {
	total: number; // Total number of dots
	activeIndex: number; // Index of the active dot (zero-based)
	dotsize?: number; // Size of each dot (default is 10)
}

const Dot = styled(Box)<{ isactive: "true" | "false"; dotsize: number }>(
	({ isactive, dotsize }) => ({
		width: dotsize,
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
}) => {
	const theme = useTheme();

	return (
		<Box display="flex" justifyContent="center" alignItems="center">
			{Array.from({ length: total }).map((_, index) => (
				<Dot
					key={index}
					isactive={index === activeIndex ? "true" : "false"}
					dotsize={dotsize}
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
