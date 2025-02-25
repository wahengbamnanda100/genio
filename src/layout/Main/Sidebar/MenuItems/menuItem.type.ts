export interface MenuItem {
  key: string;
  label: string;
  icon: JSX.Element;
  path?: string; // Path for the main item
  subItems?: {
    label: string;
    path: string; // Path for sub-items
  }[];
}
