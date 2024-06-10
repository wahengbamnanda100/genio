import { ComponentType, Suspense } from "react";

// project imports
import Loader from "./Loader";

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = <P extends object>(Component: ComponentType<P>) => {
	return (props: P) => (
		<Suspense fallback={<Loader />}>
			<Component {...props} />
		</Suspense>
	);
};
export default Loadable;
