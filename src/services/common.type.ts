type Error = {
  Error_Code: string;
  Error_Msg: string;
};
export type ApiResponse = {
  Status: string;
  Data?: unknown;
  Message: string;
  Info?: string;
  Error?: Error;
};
