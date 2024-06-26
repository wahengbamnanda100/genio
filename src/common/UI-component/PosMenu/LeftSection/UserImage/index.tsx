import React from "react";
import { Box } from "@mui/material";
// import { styled } from "@mui/system";
// import placeholderImg from "../../../../../public/staticData/image/imagePlaceholder.png";

// const PlaceholderContainer = styled("div")(({ theme }) => ({
// 	width: "100%",
// 	height: "100%",
// 	display: "flex",
// 	alignItems: "center",
// 	justifyContent: "center",
// 	backgroundColor: theme.palette.grey[200],
// 	color: theme.palette.text.secondary,
// }));

interface ImageComponentProps {
	src?: string;
	alt?: string;
	width?: number | string;
	height?: number | string;
}

const placeholderUrl =
	"https://placehold.jp/25/5b5b5b/ffffff/200x200.png?text=NO%20IMAGE%20AVAILABLE&css=%7B%22border-radius%22%3A%2215px%22%2C%22background%22%3A%22%20-webkit-gradient(linear%2C%20left%20top%2C%20left%20bottom%2C%20from(%235b5b5b)%2C%20to(%23cccccc))%22%2C%22font-weight%22%3A%22%20bold%22%7D";

const UserImage: React.FC<ImageComponentProps> = ({
	src,
	alt = "image",
	width = "100%",
	height = "auto",
}) => {
	const [imgSrc, setImgSrc] = React.useState<string>(src || "");

	const handleError = () => {
		setImgSrc("");
	};

	return imgSrc ? (
		<Box
			component="img"
			src={imgSrc}
			alt={alt}
			width={width}
			height={height}
			onError={handleError}
			sx={{
				objectFit: "cover",
			}}
		/>
	) : (
		<Box
			component="img"
			src={placeholderUrl}
			alt="placeholder"
			width={width}
			height={height}
			sx={{
				objectFit: "cover",
			}}
		/>
	);
};

export default UserImage;
