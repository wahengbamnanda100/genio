/// <reference types="vite-plugin-svgr/client" />
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import AllergyIcon from "../../.../../../../../assets/icons/AllergyIcon.svg?react";

const AlergicBanner = () => {
	const theme = useTheme();
	return (
		<Stack
			direction={"row"}
			sx={{
				bgcolor: "#4f1c1b",
				height: "100px",
				borderRadius: 2,
				overflow: "hidden",
				boxShadow: theme.shadows[4],
			}}>
			{/* The motion.div only animates the background gradient */}
			<Box
				component={motion.div}
				sx={{
					width: "100%",
					height: "100%",
					flex: 1,
					padding: 1,
					py: 2,
					position: "relative",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
				animate={{
					background: [
						// Starts from small and grows to large radial gradient
						"radial-gradient(circle at 50% 50%, rgba(163, 7, 7, 1) 30%, rgba(79, 28, 27, 1) 50%)",
						"radial-gradient(circle at 50% 50%, rgba(163, 7, 7, 1) 30%, rgba(79, 28, 27, 1) 60%)",
						"radial-gradient(circle at 50% 50%, rgba(163, 7, 7, 1) 50%, rgba(79, 28, 27, 1) 90%)",
					],
				}}
				transition={{
					duration: 1.5, // Duration of the animation
					ease: "easeInOut",
					repeat: Infinity,
					repeatType: "reverse", // Reverses the gradient back
				}}>
				<AllergyIcon style={{ width: "80px", height: "80px" }} />
			</Box>
			<Stack direction={"column"} flex={6} justifyContent={"center"} gap={1}>
				<Typography variant="h6" fontWeight={"bold"} sx={{ color: "#ffaaaa" }}>
					Kid has allergy to below listed food items
				</Typography>
				<Typography
					variant="body1"
					fontWeight={"normal"}
					sx={{ color: "white" }}>
					Please check the items below for allergy information.
				</Typography>
			</Stack>
		</Stack>
	);
};

export default AlergicBanner;
