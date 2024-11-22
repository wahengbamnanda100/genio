import { AxiosResponse } from "axios"
import axiosInstance from "../utils/axiosInstance"
import { ManufacturerMasterRequestBodyType,ManufacturerMasterSearchRequestBodyType} from "./aoi.type"

export const ManufacturerMaster= async(data:ManufacturerMasterRequestBodyType)=>{
   return await axiosInstance.post("/API/GenioManufacturerSave",data)
}




export const ManufacturerMasterSearch=async(
   data:ManufacturerMasterSearchRequestBodyType
   ):Promise<ManufacturerMasterSearchRequestBodyType>=>{
    const response: AxiosResponse<ManufacturerMasterSearchRequestBodyType>=
      await axiosInstance.post("/api/ManufacturerListing",data);
     return response.data;				
   } 
   



