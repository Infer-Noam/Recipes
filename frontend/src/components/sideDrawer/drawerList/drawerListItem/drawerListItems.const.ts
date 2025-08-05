import { type DrawerListItem } from "./drawerListItem.type";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ContactsIcon from "@mui/icons-material/Contacts";

export const DRAWER_LIST_ITEMS: DrawerListItem[] = [
  {
    name: "Home",
    icon: HomeIcon,
    path: "/",
  },
  {
    name: "Add Recipes",
    icon: AddIcon,
    path: "/creation",
  },
  {
    name: "Manage chefs",
    icon: ContactsIcon,
    path: "/chef",
  },
];
