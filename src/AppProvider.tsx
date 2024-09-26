import { AlertColor } from "@mui/material";
import React from "react";

type AppProviderProps = {
	children: React.ReactNode;
};

type ItemColorType = string;
type RefreshType = boolean;
type NotifyStateType = { message: string; severity: AlertColor } | undefined;
type ImgUrlType = string;
type DisableType = boolean;
type AvailBalType = number;

type AppContextType = {
	notify: NotifyStateType;
	setNotify: React.Dispatch<React.SetStateAction<NotifyStateType>>;
	imgUrl: ImgUrlType;
	setImgUrl: React.Dispatch<React.SetStateAction<ImgUrlType>>;
	refresh: RefreshType;
	setRefresh: React.Dispatch<React.SetStateAction<RefreshType>>;
	itemColor: ItemColorType;
	setItemColor: React.Dispatch<React.SetStateAction<ItemColorType>>;
	availBal: AvailBalType;
	setAvailBal: React.Dispatch<React.SetStateAction<AvailBalType>>;
	disableAvailableBalance: DisableType;
	setDisableAvailBalance: React.Dispatch<React.SetStateAction<DisableType>>;
	disableCashAmount: DisableType;
	setDisableCashAmount: React.Dispatch<React.SetStateAction<DisableType>>;
};

const app = React.createContext<AppContextType>({} as AppContextType);

export const useAppProvider = () => React.useContext(app);

const AppProvider = ({ children }: AppProviderProps) => {
	const [notify, setNotify] = React.useState<NotifyStateType>(undefined);
	const [imgUrl, setImgUrl] = React.useState<ImgUrlType>("");
	const [availBal, setAvailBal] = React.useState<AvailBalType>(0);
	const [refresh, setRefresh] = React.useState<RefreshType>(false);
	const [disableAvailableBalance, setDisableAvailBalance] =
		React.useState<DisableType>(false);
	const [disableCashAmount, setDisableCashAmount] =
		React.useState<DisableType>(false);
	const [itemColor, setItemColor] = React.useState<ItemColorType>("#f05d6f");

	return (
		<app.Provider
			value={{
				notify,
				setNotify,
				imgUrl,
				setImgUrl,
				availBal,
				setAvailBal,
				refresh,
				setRefresh,
				itemColor,
				setItemColor,
				disableCashAmount,
				setDisableCashAmount,
				disableAvailableBalance,
				setDisableAvailBalance,
			}}>
			{children}
		</app.Provider>
	);
};

export default AppProvider;
