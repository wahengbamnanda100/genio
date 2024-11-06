/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Box from "@mui/material/Box";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import UnfoldMoreDoubleIcon from "@mui/icons-material/UnfoldMoreDouble";
import UnfoldLessDoubleIcon from "@mui/icons-material/UnfoldLessDouble";
import AddIcon from "@mui/icons-material/Add";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { alpha, lighten, styled, useTheme } from "@mui/material/styles";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import {
  Button,
  ButtonGroup,
  Grid,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import CategoryDialog from "../../ModalComponent/AddCategory";
import AnimateButton from "../Extended/AnimateButton";

const restaurantMenuData: TreeViewBaseItem[] = [
  {
    id: "appetizers",
    label: "Appetizers",
    children: [
      { id: "spring-rolls", label: "Spring Rolls" },
      { id: "mozzarella-sticks", label: "Mozzarella Sticks" },
      { id: "stuffed-mushrooms", label: "Stuffed Mushrooms" },
      { id: "nachos", label: "Nachos" },
    ],
  },
  {
    id: "salads",
    label: "Salads",
    children: [
      { id: "caesar-salad", label: "Caesar Salad" },
      { id: "garden-salad", label: "Garden Salad" },
      { id: "greek-salad", label: "Greek Salad" },
      { id: "quinoa-salad", label: "Quinoa Salad" },
    ],
  },
  {
    id: "soups",
    label: "Soups",
    children: [
      { id: "tomato-basil-soup", label: "Tomato Basil Soup" },
      { id: "chicken-noodle-soup", label: "Chicken Noodle Soup" },
      { id: "clam-chowder", label: "Clam Chowder" },
      { id: "french-onion-soup", label: "French Onion Soup" },
    ],
  },
  {
    id: "main-course",
    label: "Main Course",
    children: [
      {
        id: "pasta",
        label: "Pasta",
        children: [
          { id: "spaghetti-bolognese", label: "Spaghetti Bolognese" },
          { id: "fettuccine-alfredo", label: "Fettuccine Alfredo" },
          { id: "lasagna", label: "Lasagna" },
        ],
      },
      {
        id: "seafood",
        label: "Seafood",
        children: [
          { id: "grilled-salmon", label: "Grilled Salmon" },
          { id: "shrimp-scampi", label: "Shrimp Scampi" },
          { id: "lobster-thermidor", label: "Lobster Thermidor" },
        ],
      },
      {
        id: "grill",
        label: "Grill",
        children: [
          { id: "grilled-chicken", label: "Grilled Chicken" },
          { id: "steak", label: "Steak" },
          { id: "bbq-ribs", label: "BBQ Ribs" },
        ],
      },
      {
        id: "vegetarian",
        label: "Vegetarian",
        children: [
          { id: "vegetable-lasagna", label: "Vegetable Lasagna" },
          { id: "stuffed-bell-peppers", label: "Stuffed Bell Peppers" },
          { id: "tofu-stir-fry", label: "Tofu Stir Fry" },
        ],
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    children: [
      { id: "cheesecake", label: "Cheesecake" },
      { id: "chocolate-cake", label: "Chocolate Cake" },
      { id: "tiramisu", label: "Tiramisu" },
      { id: "apple-pie", label: "Apple Pie" },
      { id: "ice-cream", label: "Ice Cream" },
    ],
  },
  {
    id: "beverages",
    label: "Beverages",
    children: [
      {
        id: "non-alcoholic",
        label: "Non-Alcoholic",
        children: [
          { id: "lemonade", label: "Lemonade" },
          { id: "iced-tea", label: "Iced Tea" },
          { id: "soda", label: "Soda" },
          { id: "smoothies", label: "Smoothies" },
        ],
      },
      {
        id: "alcoholic",
        label: "Alcoholic",
        children: [
          { id: "beer", label: "Beer" },
          { id: "wine", label: "Wine" },
          { id: "cocktails", label: "Cocktails" },
          { id: "whiskey", label: "Whiskey" },
        ],
      },
    ],
  },
];

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    color: theme.palette.primary.main,
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.label}`]: {
    fontWeight: "600",
    fontSize: "inherit",
    color: theme.palette.grey[900],
    padding: 1,
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.primary.main, 0.4)}`,
  },
}));

function searchByIdIgnoreChildren(
  id: string,
  items: TreeViewBaseItem[],
): Omit<TreeViewBaseItem, "children"> | null {
  for (const item of items) {
    if (item.id === id) {
      const { children, ...resultWithoutChildren } = item;
      console.log({ children });

      return resultWithoutChildren;
    }
    if (item.children) {
      const result = searchByIdIgnoreChildren(id, item.children);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

function CloseSquare(props: SvgIconProps) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

export default function CustomMenuList() {
  const theme = useTheme();
  const [treeData, setTreeData] =
    React.useState<TreeViewBaseItem[]>(restaurantMenuData);
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(
    null,
  );
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [editData, setEditData] = React.useState<Record<string, string> | null>(
    null,
  );
  const [openCategory, setOpenCategory] = React.useState<boolean>(false);
  const [type, setType] = React.useState<"add" | "edit">("add");

  const { watch, setValue } = useFormContext();

  const handleContextMenu = (
    event: React.MouseEvent,
    nodeId: string,
    props: any,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedNodeId(nodeId);
    console.log("context id", props);
    setEditData(props);
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

  const addNode = (
    items: TreeViewBaseItem[],
    nodeId: string,
    nodeData: { categoryName: string; categoryCode: string }, // Contains name and code for the new or edited node
  ): TreeViewBaseItem[] => {
    return items.map((item) => {
      // Check if the current item matches the categoryCode for editing
      if (item.id === nodeData.categoryCode) {
        console.log("Editing first-level node:", item.id);
        // Update the label for the existing first-level node
        return {
          ...item,
          label: nodeData.categoryName, // Update label with the new name
        };
      }

      // If the current item is the one we want to add/edit under its children
      if (item.id === nodeId) {
        console.log("Tree item found for adding/editing children:", item.id);

        // Check if an existing child has the same id as nodeData.categoryCode
        const existingChildIndex = item.children?.findIndex(
          (child) => child.id === nodeData.categoryCode,
        );

        if (
          existingChildIndex !== undefined &&
          existingChildIndex >= 0 &&
          item.children
        ) {
          // Edit the existing child node with the same id
          const updatedChildren = [...item.children];
          updatedChildren[existingChildIndex] = {
            ...updatedChildren[existingChildIndex],
            label: nodeData.categoryName, // Update label with the new name
          };
          console.log("Updated children:", updatedChildren);

          return {
            ...item,
            children: updatedChildren,
          };
        } else {
          // Add new child if no matching id was found
          const newNode: TreeViewBaseItem = {
            id: nodeData.categoryCode, // Set the id to the code from nodeData
            label: nodeData.categoryName, // Set the label to the name from nodeData
          };
          console.log("Adding new node:", newNode);

          return {
            ...item,
            children: item.children ? [...item.children, newNode] : [newNode],
          };
        }
      }

      // Recursive call to search within children
      if (item.children) {
        return {
          ...item,
          children: addNode(item.children, nodeId, nodeData),
        };
      }

      return item;
    });
  };

  const deleteNode = (
    items: TreeViewBaseItem[],
    nodeId: string,
  ): TreeViewBaseItem[] => {
    const itemToDelete = items.find((item) => item.id === nodeId);

    if (
      itemToDelete &&
      itemToDelete.children &&
      itemToDelete.children.length > 0
    ) {
      alert("Cannot delete an item that has children.");
      return items;
    }

    return items
      .map((item) =>
        item.children
          ? { ...item, children: deleteNode(item.children, nodeId) }
          : item,
      )
      .filter((item) => item.id !== nodeId);
  };

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
      setTreeData((prevData) => deleteNode(prevData, selectedNodeId));
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
    const allNodeIds = treeData
      .map((item) => item.id)
      .concat(
        treeData.flatMap(
          (item) => item.children?.map((child) => child.id) || [],
        ),
      );
    setExpanded(allNodeIds);
  };

  const handleCollapseAll = () => {
    setExpanded([]);
  };

  const handleReloadData = () => {
    setTreeData(restaurantMenuData);
  };

  const handleConfirmForm = (data: any) => {
    console.log("log form", data);
    // handleClose();
    if (data && selectedNodeId) {
      setTreeData((prevData) => addNode(prevData, selectedNodeId, data));
    }
    setOpenCategory(false);
  };

  React.useEffect(() => {
    if (selectedNodeId) {
      console.log("selected Node id", selectedNodeId);
      const categoryTitle = searchByIdIgnoreChildren(
        selectedNodeId,
        restaurantMenuData,
      );
      setValue("categoryTitle", categoryTitle?.label);
      console.log("find item", categoryTitle);
    }
  }, [selectedNodeId]);

  const buttons = [
    <AnimateButton>
      <Button
        key="one"
        startIcon={<RestartAltIcon />}
        onClick={handleReloadData}
      >
        relaod
      </Button>
    </AnimateButton>,
    <AnimateButton>
      <Button
        key="two"
        startIcon={<UnfoldMoreDoubleIcon />}
        onClick={handleExpandAll}
      >
        expand all
      </Button>
    </AnimateButton>,
    <AnimateButton>
      <Button
        key="three"
        startIcon={<UnfoldLessDoubleIcon />}
        onClick={handleCollapseAll}
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
                onClick={() => setOpenCategory(true)}
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

      <Box sx={{ maxHeight: "70vh", overflowY: "auto" }}>
        <RichTreeView
          expandedItems={expanded}
          defaultExpandedItems={["grid"]} //todo change it later
          onExpandedItemsChange={handleExpandedItemsChange}
          expansionTrigger="iconContainer"
          slots={{
            expandIcon: AddBoxIcon,
            collapseIcon: IndeterminateCheckBoxIcon,
            endIcon: CloseSquare,
            item: (props: any) => (
              <CustomTreeItem
                {...props}
                onContextMenu={(e) => handleContextMenu(e, props.itemId, props)}
                onClick={() => setSelectedNodeId(props.itemId)}
              />
            ),
          }}
          items={treeData}
        />
      </Box>

      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleAddItem}>Add Item</MenuItem>
        <MenuItem onClick={handleEditItem}>Edit Item</MenuItem>
        <MenuItem onClick={handleDeleteItem}>Delete Item</MenuItem>
      </Menu>

      <CategoryDialog
        loading={false} //todo later
        type={type}
        open={openCategory}
        title={"Add Category"}
        setOpen={setOpenCategory}
        onConfirm={handleConfirmForm}
        editData={editData}
      />
    </Box>
  );
}
