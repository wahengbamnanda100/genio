type Error = {
  Error_Code: string;
  Error_Msg: string;
};
export type ApiResponse = {
  Status: string;
  Message: string;
  Info?: string;
  Error?: Error;
  OverallCount?: string;
};
