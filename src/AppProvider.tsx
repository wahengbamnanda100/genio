import { AlertColor } from "@mui/material";
import React from "react";

type AppProviderProps = {
	children: React.ReactNode;
};

type ItemColorType = string;

type NotifyStateType = { message: string; severity: AlertColor } | undefined;
type ImgUrlType = string;

type AppContextType = {
	notify: NotifyStateType;
	setNotify: React.Dispatch<React.SetStateAction<NotifyStateType>>;
	imgUrl: ImgUrlType;
	setImgUrl: React.Dispatch<React.SetStateAction<ImgUrlType>>;
	itemColor: ItemColorType;
	setItemColor: React.Dispatch<React.SetStateAction<ItemColorType>>;
};

const app = React.createContext<AppContextType>({} as AppContextType);

export const useAppProvider = () => React.useContext(app);

const AppProvider = ({ children }: AppProviderProps) => {
	const [notify, setNotify] = React.useState<NotifyStateType>(undefined);
	const [imgUrl, setImgUrl] = React.useState<ImgUrlType>("");
	const [itemColor, setItemColor] = React.useState<ItemColorType>("#BD4186");

	return (
		<app.Provider
			value={{ notify, setNotify, imgUrl, setImgUrl, itemColor, setItemColor }}>
			{children}
		</app.Provider>
	);
};

export default AppProvider;
