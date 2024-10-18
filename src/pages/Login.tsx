import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LoginFormSchema } from "../common/Component-types/login.type";
import loginImage from "../../public/staticData/image/login.jpg";
import FormCard from "../common/UI-component/Login/FormCard";
import LoginHeader from "../common/UI-component/Login/Header";
import LoginFooter from "../common/UI-component/Login/Footer";
// import { useNavigate } from "react-router";
// import { useStudentList } from "../services";
import { useAppProvider } from "../AppProvider";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/login";
import SelectCompanyModal from "../common/UI-component/Login/SelectModal";

const Login = () => {
	// const theme = useTheme();
	// const navigate = useNavigate();
	const { setNotify } = useAppProvider();
	const [showPassword, setShowPassword] = useState(false);
	const [openModal, setOpenModal] = useState<boolean>(false);

	// const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const methods = useForm<LoginFormSchema>({
		defaultValues: {
			userName: "",
			passWord: "",
			rememberMe: false,
		},
	});

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["login"],
		mutationFn: loginUser,
		onSuccess: (data) => {
			//console.log("user login in dasta", data);
			if (data.Status === "1") {
				// setNotify({ severity: "success", message: "Login Successfully" });

				const res = data.Data[0];
				localStorage.setItem("userDetail", JSON.stringify(res));
				setOpenModal(true);
				// navigate("/");
				return;
			} else {
				setNotify({
					severity: "error",
					message: "Login failed please check username and password ",
				});
				return;
			}
		},
	});

	const onsubmit = (data: LoginFormSchema) => {
		//console.log("login formdata", data);

		mutateAsync({
			Usr_LoginID_V: data.userName,
			Usr_Password_V: data.passWord,
		});
		// setNotify({ severity: "success", message: "Login Successfully" });
		// navigate("/pos-menu");
	};

	const handleModalClose = () => {
		setOpenModal(false);
	};

	// const isInitialMount = useRef(true);

	// useEffect(() => {
	// 	if (isInitialMount.current) {
	// 		isInitialMount.current = false;
	// 		mutateAsync({
	// 			FamilyId: "",
	// 			CardNumber: "",
	// 			StudentName: "",
	// 			ShowroomId: "7",
	// 			Cmp_ID_N: "1",
	// 		})
	// 			.then(
	// 				(data) => {
	// 					//console.log("data [login]", data);
	// 				},
	// 				(error) => {
	// 					console.error("Error fetching data:", error.message);
	// 				}
	// 			)
	// 			.catch((error) => {
	// 				console.error("Error fetching data:", error.message);
	// 			});
	// 	}
	// }, [mutateAsync]);

	useEffect(() => {
		//console.log("isLoading [login]", isPending);
		// if (error) {
		// 	console.error("Error fetching data:", error.message);
		// }
	}, [isPending]);

	// const onSubmit = (data: LoginFormSchema) => {
	// 	//console.log("lgoin data", data);
	// };

	return (
		<>
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
					{/* <form onSubmit={methods.handleSubmit(onSubmit)}> */}
					<FormCard
						showPassword={showPassword}
						setShowPassword={setShowPassword}
						onSubmit={onsubmit}
						isPending={isPending}
						sx={{
							marginRight: "8rem",
						}}
					/>
					{/* </form> */}
				</FormProvider>
				<LoginFooter />
			</Box>

			<SelectCompanyModal
				// title="Select modal"
				open={openModal}
				onClose={handleModalClose}
			/>
		</>
	);
};

export default Login;

{
	/*  */
}
