/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  alpha,
  Box,
  Skeleton,
  styled,
  SvgIcon,
  SvgIconProps,
} from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { FC, useCallback } from "react";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { Virtuoso } from "react-virtuoso";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";

interface MenuListTreeProps {
  expanded: string[];
  isLoading: boolean;
  onExpandedItemsChange: (
    event: React.SyntheticEvent,
    itemIds: string[],
  ) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
  data: TreeViewBaseItem[];
  onContextMenu: (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    itemId: string,
    additionalProps: any,
  ) => void;
}

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    fontWeight: "300",
    "& .selected": {
      backgroundColor: alpha(theme.palette.primary.light, 0.3),
      color: theme.palette.primary.main,
    },
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

const MenuListTree: FC<MenuListTreeProps> = ({
  data,
  isLoading,
  expanded,
  selectedNodeId,
  onExpandedItemsChange,
  setSelectedNodeId,
  onContextMenu,
}) => {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>, props: any) => {
      event.preventDefault();
      onContextMenu(event, props.itemId, props);
    },
    [onContextMenu],
  );

  const handleSelectNode = useCallback(
    (id: string) => {
      console.log("selected ", id);

      setSelectedNodeId((prev) => (prev === id ? null : id));
    },
    [setSelectedNodeId],
  );

  if (isLoading) {
    return (
      <Box
        ref={parentRef}
        sx={{
          maxHeight: "70vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Skeleton animation="wave" variant="rectangular" height={20} />
        <Skeleton animation="wave" variant="rectangular" height={20} />
        <Skeleton animation="wave" variant="rectangular" height={20} />
        <Skeleton animation="wave" variant="rectangular" height={20} />
        <Skeleton animation="wave" variant="rectangular" height={20} />
        <Skeleton animation="wave" variant="rectangular" height={20} />
        <Skeleton animation="wave" variant="rectangular" height={20} />
      </Box>
    );
  }

  return (
    <Box ref={parentRef} sx={{ maxHeight: "70vh", overflowY: "auto" }}>
      <Virtuoso
        style={{ height: "70vh" }}
        totalCount={data.length}
        itemContent={(index) => {
          const item = data[index];
          return (
            <RichTreeView
              expandedItems={expanded}
              defaultExpandedItems={["grid"]} //todo change it later
              onExpandedItemsChange={onExpandedItemsChange}
              expansionTrigger="iconContainer"
              onSelectedItemsChange={(e, ids) => handleSelectNode(ids!)}
              selectedItems={selectedNodeId}
              slots={{
                expandIcon: AddBoxIcon,
                collapseIcon: IndeterminateCheckBoxIcon,
                endIcon: CloseSquare,
                item: (props: any) => {
                  // console.log("inside tree porps", props);
                  const isSelected = selectedNodeId === props.itemId;
                  return (
                    <CustomTreeItem
                      {...props}
                      className={isSelected ? "selected" : ""}
                      onContextMenu={(e) => handleContextMenu(e, props)}
                    />
                  );
                },
              }}
              items={[item]}
            />
          );
        }}
      />
    </Box>
  );
};

export default MenuListTree;
