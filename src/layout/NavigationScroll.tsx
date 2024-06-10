import { ReactNode, useEffect } from "react";

interface NavigationScrollProps {
	children: ReactNode;
}

const NavigationScroll: React.FC<NavigationScrollProps> = ({ children }) => {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, []);

	return <>{children}</> || null;
};

export default NavigationScroll;
