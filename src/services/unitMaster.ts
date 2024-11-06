import axiosInstance from "../utils/axiosInstance";
import { UnitMasterRequestBodyType } from "./aoi.type";

export const unitMaster = async (data: UnitMasterRequestBodyType) => {
  return await axiosInstance.post("/API/GenioUnitMasterSave", data);
};

// export const unitMaster = async (data: UnitMasterRequestBodyType) => {
//   return await axios.post("API/GenioUnitMasterAPI", data, {
//     baseURL: "http://111.92.109.104:9098/",
//     headers: {
//       WATCH_WORD_KEY: "HNG37484=",
//       Content: "application/json",
//       SubscriptionID: "ConnectDB",
//       "Content-Type": "application/json",
//     },
//   });
// };
