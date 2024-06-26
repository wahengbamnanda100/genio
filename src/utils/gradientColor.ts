export interface Colors {
	light: string;
	dark: string;
}

const generateLinearGradient = (colors: Colors): string => {
	const { light, dark } = colors;

	// Basic validation to ensure colors are provided
	if (!light || !dark) {
		throw new Error("Both lightColor and darkColor must be provided");
	}

	// Create the linear gradient string
	const linearGradient = `linear-gradient(90deg, ${dark}, ${light})`;

	return linearGradient;
};

export default generateLinearGradient;
