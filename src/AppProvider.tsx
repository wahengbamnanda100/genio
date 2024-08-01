import { AlertColor } from "@mui/material";
import React from "react";

type AppProviderProps = {
	children: React.ReactNode;
};

type NotifyStateType = { message: string; severity: AlertColor } | undefined;

type AppContextType = {
	notify: NotifyStateType;
	setNotify: React.Dispatch<React.SetStateAction<NotifyStateType>>;
};

const app = React.createContext<AppContextType>({} as AppContextType);

export const useAppProvider = () => React.useContext(app);

const AppProvider = ({ children }: AppProviderProps) => {
	const [notify, setNotify] = React.useState<NotifyStateType>(undefined);

	return <app.Provider value={{ notify, setNotify }}>{children}</app.Provider>;
};

export default AppProvider;
