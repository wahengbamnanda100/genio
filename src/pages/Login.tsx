import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LoginFormSchema } from "../common/Component-types/login.type";
import loginImage from "../../public/staticData/image/login.jpg";
import FormCard from "../common/UI-component/Login/FormCard";
import LoginHeader from "../common/UI-component/Login/Header";
import LoginFooter from "../common/UI-component/Login/Footer";
import { useNavigate } from "react-router";
import { useStudentList } from "../services";
import { useAppProvider } from "../AppProvider";

const Login = () => {
	// const theme = useTheme();
	const navigate = useNavigate();
	const { setNotify } = useAppProvider();

	const [showPassword, setShowPassword] = useState(false);

	// const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const methods = useForm<LoginFormSchema>({
		defaultValues: {
			userName: "sdfasdfads",
			passWord: "fsdfads",
			rememberMe: false,
		},
	});

	const onsubmit = (data: LoginFormSchema) => {
		console.log("login formdata", data);
		setNotify({ severity: "success", message: "Login Successfully" });
		navigate("/pos-menu");
	};

	const { mutateAsync, isPending } = useStudentList();

	const isInitialMount = useRef(true);

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
			mutateAsync({
				FamilyId: "",
				CardNumber: "",
				StudentName: "",
				ShowroomId: "7",
				Cmp_ID_N: "1",
			})
				.then(
					(data) => {
						console.log("data [login]", data);
					},
					(error) => {
						console.error("Error fetching data:", error.message);
					}
				)
				.catch((error) => {
					console.error("Error fetching data:", error.message);
				});
		}
	}, [mutateAsync]);

	useEffect(() => {
		console.log("isLoading [login]", isPending);
		// if (error) {
		// 	console.error("Error fetching data:", error.message);
		// }
	}, [isPending]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-end",
				justifyContent: "space-between",
				width: "100%",
				flexGrow: 1,
				minHeight: "100vh",
				backgroundImage: `url(${loginImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}>
			<LoginHeader />
			<FormProvider {...methods}>
				<FormCard
					showPassword={showPassword}
					setShowPassword={setShowPassword}
					onSubmit={onsubmit}
					sx={{
						marginRight: "8rem",
					}}
				/>
			</FormProvider>
			<LoginFooter />
		</Box>
	);
};

export default Login;

{
	/*  */
}
