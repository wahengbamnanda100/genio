import React from "react";
import { Avatar, Box, CircularProgress } from "@mui/material";

interface ImageComponentProps {
	src?: string;
	alt?: string;
	width?: number | string;
	height?: number | string;
	appBar?: boolean; // New boolean prop
}

const placeholderUrl =
	"https://placehold.jp/25/5b5b5b/ffffff/200x200.png?text=NO%20IMAGE%20AVAILABLE&css=%7B%22border-radius%22%3A%2215px%22%2C%22background%22%3A%22%20-webkit-gradient(linear%2C%20left%20top%2C%20left%20bottom%2C%20from(%235b5b5b)%2C%20to(%23cccccc))%22%2C%22font-weight%22%3A%22%20bold%22%7D";

const UserImageAvatar: React.FC<ImageComponentProps> = ({
	src,
	alt = "image",
	width = "30",
	height = "30",
	appBar = false, // Default value is false
}) => {
	const [imgSrc, setImgSrc] = React.useState<string>(
		appBar ? placeholderUrl : src || ""
	);
	const [loading, setLoading] = React.useState<boolean>(!appBar);

	const handleLoad = () => {
		setLoading(false);
	};

	const handleError = () => {
		setLoading(false);
		setImgSrc(placeholderUrl);
	};

	React.useEffect(() => {
		src && src !== "" && setImgSrc(src);
		setLoading(true);
	}, [src, appBar]);

	return (
		<Box
			position="relative"
			display="inline-flex"
			width={width}
			height={height}>
			{loading && (
				<CircularProgress
					size={width}
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						zIndex: 1,
					}}
				/>
			)}
			<Avatar
				alt={alt}
				src={imgSrc}
				sx={{ width: width, height: height, opacity: loading ? 0 : 1 }}
				onLoad={handleLoad}
				onError={handleError}
			/>
		</Box>
	);
};

export default UserImageAvatar;
