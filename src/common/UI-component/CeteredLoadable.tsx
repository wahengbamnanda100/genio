import { Suspense, ComponentType } from "react";

import CenteredLoader from "./CenerLoader";

const CenteredLoadable = <P extends object>(Component: ComponentType<P>) => {
  return (props: P) => (
    <Suspense fallback={<CenteredLoader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default CenteredLoadable;
