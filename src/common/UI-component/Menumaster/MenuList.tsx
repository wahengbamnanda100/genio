/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Box from "@mui/material/Box";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import UnfoldMoreDoubleIcon from "@mui/icons-material/UnfoldMoreDouble";
import UnfoldLessDoubleIcon from "@mui/icons-material/UnfoldLessDouble";
import AddIcon from "@mui/icons-material/Add";
import { alpha, lighten, useTheme } from "@mui/material/styles";
// import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import {
  Button,
  ButtonGroup,
  Grid,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import CategoryDialog, { BackendData } from "../../ModalComponent/AddCategory";
import AnimateButton from "../Extended/AnimateButton";
import MenuListTree from "./MenuListTree";
// import { MenuMasterCategoryListType } from "../../../services/aoi.type";
import { buildCategoryTree } from "../../../helpers/helper";
import {
  MenuMasterCategoryDelete,
  MenuMasterCategoryList,
  mutateCategorySave,
} from "../../../services/menuMaster";
import { keepPreviousData, useMutation } from "@tanstack/react-query";
import { useAppProvider } from "../../../AppProvider";
import { CategorySaveRequestBodyType } from "../../../services/aoi.type";
import { useDispatch } from "react-redux";
import { setCategoryItem } from "../../../store/slices/menuMasterSlice";

export default function CustomMenuList() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { setNotify } = useAppProvider();
  // const [treeData, setTreeData] = React.useState<MenuMasterCategoryListType[]>(
  //   [],
  // );
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(
    null,
  );
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [openCategory, setOpenCategory] = React.useState<boolean>(false);
  const [type, setType] = React.useState<"add" | "edit" | "new">("new");
  const [modalData, setModalData] = React.useState<any | null>(null);
  const [modalError, setModalError] = React.useState<string | null>(null);

  const { watch, setValue } = useFormContext();

  const { data, isPending, isFetched, refetch } = MenuMasterCategoryList(null, {
    placeholderData: keepPreviousData,
  });

  const CmpID = JSON.parse(localStorage.getItem("CmpId")!);

  const { mutateAsync, isPending: isSaving } = useMutation({
    mutationKey: ["categorySave"],
    mutationFn: mutateCategorySave,
    onSuccess: (data) => {
      if (data.Status === "1") {
        setOpenCategory(false);
        setModalError(null);
        setNotify({
          message: data.CategoryID + " " + data.Message,
          severity: "success",
        });
        refetch();
      } else if (data.Status === "-2") {
        setModalError(data.Message);
      } else {
        setNotify({
          message: "Something went wrong",
          severity: "error",
        });
      }
    },
  });

  const { mutateAsync: mutateDelete } = useMutation({
    mutationKey: ["categoryDelete"],
    mutationFn: MenuMasterCategoryDelete,
    onSuccess: (data) => {
      if (data.Status === "1") {
        setNotify({
          message: data.Message,
          severity: "success",
        });
        refetch();
      } else {
        setNotify({
          message: "Something went wrong",
          severity: "error",
        });
      }
    },
  });

  const handleContextMenu = (
    event: React.MouseEvent,
    nodeId: string,
    props: any,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedNodeId(nodeId);
    console.log("context id", props);

    if (contextMenu) {
      setContextMenu(null);
    }

    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleClose = () => {
    setContextMenu(null);
    // setType("add");
    // setEditData(null);
  };

  const buildTree = React.useMemo(
    () =>
      isFetched && data?.Status === "1" ? buildCategoryTree(data?.Data) : [],
    [data],
  ); //todo change to aler api call

  const handleAddItem = () => {
    console.log("add item", selectedNodeId);
    setType("add");
    setOpenCategory(true);
    handleClose();
  };

  const handleEditItem = () => {
    setType("edit");
    setOpenCategory(true);
    handleClose();
  };

  const handleDeleteItem = () => {
    if (selectedNodeId) {
      console.log("delete item", selectedNodeId);
      mutateDelete({ CategoryId: selectedNodeId });
    }
    handleClose();
  };

  const handleExpandedItemsChange = (
    event: React.SyntheticEvent,
    itemIds: string[],
  ) => {
    setExpanded(itemIds);
  };

  const handleExpandAll = () => {
    const allNodeIds = buildTree
      .map((item) => item.id)
      .concat(
        buildTree.flatMap(
          (item) => item.children?.map((child) => child.id) || [],
        ),
      );
    setExpanded(allNodeIds);
  };

  const handleCollapseAll = () => {
    setExpanded([]);
  };

  const handleReloadData = () => {
    // setTreeData([]);
  };

  const handleConfirmForm = (data: BackendData) => {
    console.log("log form", data);
    // handleClose();
    const backend: CategorySaveRequestBodyType = {
      CategoryCode: data.CategoryCode,
      CategoryName: data.CategoryDesc,
      CategoryImage: data.CategoryImg,
      CategoryID: data.CategoryId,
      ParentID: data.ParentId,
      FormType: "1",
      UserID: CmpID,
    };
    mutateAsync(backend);
    // setOpenCategory(false);
    console.log({ backend });
  };

  React.useEffect(() => {
    if (selectedNodeId && data) {
      console.log("selected Node id", selectedNodeId);
      dispatch(setCategoryItem(selectedNodeId));
      const categoryItem = data?.Data.filter(
        (item) => item.CategoryId === selectedNodeId,
      );

      console.log("find item", categoryItem[0]);
      setModalData(categoryItem[0]);

      setValue("categoryTitle", categoryItem[0].CategoryDesc);
    }
  }, [selectedNodeId]);

  const buttons = [
    <AnimateButton>
      <Button
        key="one"
        startIcon={<RestartAltIcon />}
        onClick={handleReloadData}
        sx={{
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          maxWidth: "140px", // Adjust based on your requirements
        }}
      >
        relaod
      </Button>
    </AnimateButton>,
    <AnimateButton>
      <Button
        key="two"
        startIcon={<UnfoldMoreDoubleIcon />}
        onClick={handleExpandAll}
        sx={{
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          maxWidth: "140px", // Adjust based on your requirements
        }}
      >
        expand all
      </Button>
    </AnimateButton>,
    <AnimateButton>
      <Button
        key="three"
        startIcon={<UnfoldLessDoubleIcon />}
        onClick={handleCollapseAll}
        sx={{
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          maxWidth: "140px", // Adjust based on your requirements
        }}
      >
        collapse all
      </Button>
    </AnimateButton>,
  ];

  const categoryTitleWatch = watch("categoryTitle");

  return (
    <Box
      sx={{
        minHeight: "100%",
        minWidth: 250,
        m: 0.5,
        p: 1,
        bgcolor: lighten(theme.palette.secondary.main, 0.9),
      }}
    >
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid item xs={9}>
          <Box
            sx={{
              outline: "1px solid",
              outlineColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              minHeight: "35px",
              p: 1,
              borderRadius: 1,
              boxShadow: theme.shadows[3],
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "500",
            }}
          >
            {/* dgdfgsfcdsfdsf fdsfadsf dsklfadsfjasd f asdf kjldfhdskljfdjgdsfj */}
            {categoryTitleWatch}
          </Box>
        </Grid>
        <Grid item xs={2} sx={{ marginLeft: 1.5 }}>
          <AnimateButton>
            <Tooltip arrow title="Add Category">
              <Button
                onClick={() => {
                  setType("new");
                  setOpenCategory(true);
                }}
                sx={{
                  fontWeight: "500",
                  outline: "1px solid",
                  boxShadow: theme.shadows[3],
                  outlineColor: theme.palette.primary.main,
                }}
              >
                <AddIcon fontSize="medium" />
              </Button>
            </Tooltip>
          </AnimateButton>
        </Grid>
      </Grid>
      {/* Control Panel */}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "row",
          gap: 1,
          mt: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ButtonGroup
          size="small"
          aria-label="Small button group"
          sx={{ boxShadow: theme.shadows[3] }}
        >
          {buttons}
        </ButtonGroup>
      </Box>

      <MenuListTree
        data={buildTree}
        isLoading={isPending}
        expanded={expanded}
        onContextMenu={handleContextMenu}
        selectedNodeId={selectedNodeId}
        setSelectedNodeId={setSelectedNodeId}
        onExpandedItemsChange={handleExpandedItemsChange}
      />

      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        disablePortal={true}
        sx={{ position: "absolute", zIndex: 1 }}
      >
        <MenuItem onClick={handleAddItem}>Add Item</MenuItem>
        <MenuItem onClick={handleEditItem}>Edit Item</MenuItem>
        <MenuItem onClick={handleDeleteItem}>Delete Item</MenuItem>
      </Menu>

      <CategoryDialog
        loading={isSaving}
        type={type}
        open={openCategory}
        title={type === "edit" ? "Edit Category" : "Add Category"}
        setOpen={setOpenCategory}
        onConfirm={handleConfirmForm}
        data={modalData}
        error={modalError}
      />
    </Box>
  );
}
