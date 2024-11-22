import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { MenuMasterCategoryListType } from "../services/aoi.type";

type CategoryTreeBuilder = (
  categories: MenuMasterCategoryListType[],
) => (TreeViewBaseItem & { ParentId: string })[];

export const buildCategoryTree: CategoryTreeBuilder = (categories) => {
  const categoryMap: Record<
    string,
    Omit<MenuMasterCategoryListType, "children"> & {
      children: (TreeViewBaseItem & { ParentId: string })[];
    }
  > = {};
  const roots: (TreeViewBaseItem & { ParentId: string })[] = [];
  categories.forEach((category) => {
    categoryMap[category.CategoryId] = { ...category, children: [] };
  });

  // Build the tree structure by populating `children` arrays
  categories.forEach((category) => {
    const { CategoryId, ParentId, CategoryDesc } = category;
    const categoryNode = {
      id: CategoryId,
      label: CategoryDesc,
      ParentId: ParentId,
      children: categoryMap[CategoryId].children,
    };

    if (ParentId === "0") {
      roots.push(categoryNode);
    } else if (categoryMap[ParentId]) {
      categoryMap[ParentId].children.push(categoryNode);
    }
  });

  return roots;
};
