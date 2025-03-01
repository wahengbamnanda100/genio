import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { CompanySettingFormTypes } from "../../components/companySetting/CompanySettings.type";

export const useCompanySettingForm = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const method = useForm<CompanySettingFormTypes>({
    defaultValues: {},
  });

  const handleSearchList = () => {
    navigate("/admin/transection/company-setting");
  };

  return {
    method,
    isModalOpen,
    setIsModalOpen,
    handleSearchList,
  };
};
