import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { AxiosResponse } from "axios";

const useApiQuery = <RequestType, ResponseType>(
  key: string,
  url: string,
  data: RequestType,
  queryOptions?: Partial<UseQueryOptions<ResponseType, Error>>,
): UseQueryResult<ResponseType, Error> => {
  return useQuery<ResponseType, Error>({
    queryKey: [key, data],
    queryFn: async () =>
      axiosInstance
        .post(url, data)
        .then((res: AxiosResponse<ResponseType>) => res.data),
    staleTime: 60 * 5 * 1000, // 5 minutes in milliseconds
    gcTime: 60 * 5 * 1000, // 5 minutes in milliseconds
    ...queryOptions,
  });
};

export default useApiQuery;
