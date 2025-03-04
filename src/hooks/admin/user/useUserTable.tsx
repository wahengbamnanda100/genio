import { UserFormType } from "@/components/user/user.type";
import { useFormContext } from "react-hook-form";

export const useUserTable = () => {
  const { setValue } = useFormContext<UserFormType>();
};
