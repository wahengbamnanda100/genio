import UserListTable from "@/components/user/userListTable";
import UserSearchList from "@/components/user/UserSearchList";
import { useUserList } from "@/hooks/admin/user/useUserLIst";
import { Box, Grid } from "@mui/material";

const UserList = () => {
  const {
    method,
    tableData,
    isLoading,
    searchQuery,
    expanded,
    setSearchQuery,
    setExpanded,
    handleSearch,
    handleCreateNew,
  } = useUserList();

  return (
    <Box px={2}>
      <Grid
        container
        justifyContent={"center"}
        rowSpacing={1}
        sx={{
          width: "100%",
          borderRadius: 1,
          overflowY: "hidden",
          overflowX: "hidden",
          px: 1,
        }}
      >
        <UserSearchList
          method={method}
          expanded={expanded}
          setExpanded={setExpanded}
          onSubmit={handleSearch}
          handleCreateNew={handleCreateNew}
        />
        <Grid item xs={12} ml={-3.5}>
          <UserListTable
            isLoading={isLoading}
            data={tableData?.Data || []}
            totalCount={tableData?.OverallCount || "0"}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserList;
