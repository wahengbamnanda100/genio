import { AlertColor } from "@mui/material";
import React from "react";

type AppProviderProps = {
	children: React.ReactNode;
};

type NotifyStateType = { message: string; severity: AlertColor } | undefined;
type ImgUrlType = string;

type AppContextType = {
	notify: NotifyStateType;
	setNotify: React.Dispatch<React.SetStateAction<NotifyStateType>>;
	imgUrl: ImgUrlType;
	setImgUrl: React.Dispatch<React.SetStateAction<ImgUrlType>>;
};

const app = React.createContext<AppContextType>({} as AppContextType);

export const useAppProvider = () => React.useContext(app);

const AppProvider = ({ children }: AppProviderProps) => {
	const [notify, setNotify] = React.useState<NotifyStateType>(undefined);
	const [imgUrl, setImgUrl] = React.useState<ImgUrlType>("");

	return (
		<app.Provider value={{ notify, setNotify, imgUrl, setImgUrl }}>
			{children}
		</app.Provider>
	);
};

export default AppProvider;
