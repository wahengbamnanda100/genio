import UserListTable from "@/components/user/userListTable";
import UserSearchList from "@/components/user/UserSearchList";
import { useUserList } from "@/hooks/admin/user/useUserLIst";
import { Box, Grid } from "@mui/material";

const UserList = () => {
  const { method, expanded, setExpanded, handleSearch, handleCreateNew } =
    useUserList();

  return (
    <Box padding={2}>
      <Grid
        container
        justifyContent={"center"}
        rowSpacing={1}
        sx={{
          width: "100%",
          borderRadius: 1,
          overflowY: "hidden",
          overflowX: "hidden",
          p: 1,
        }}
      >
        <UserSearchList
          method={method}
          expanded={expanded}
          setExpanded={setExpanded}
          onSubmit={handleSearch}
          handleCreateNew={handleCreateNew}
        />
        <UserListTable data={[]} />
      </Grid>
    </Box>
  );
};

export default UserList;
