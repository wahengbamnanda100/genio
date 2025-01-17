import { Skeleton } from "@mui/material";

const SkeletonCategory = () => {
  return (
    <>
      <Skeleton animation="wave" height={"50px"} width={"100%"} />
      <Skeleton animation="wave" height={"50px"} width={"100%"} />
      <Skeleton animation="wave" height={"50px"} width={"100%"} />
    </>
  );
};

export default SkeletonCategory;
