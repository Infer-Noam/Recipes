import type { RouteProps } from "react-router-dom";
import HomePage from "../pages/home/HomePage.tsx";
import RecipeCreationPage from "../pages/recipe-creation/recipeCreation.tsx";
import RecipeEditPage from "../pages/recipe-edit/RecipeEdit.tsx";
import ChefPage from "../pages/chef/ChefPage.tsx";

export const PAGES_ROUTES: RouteProps[] = [
  { element: <HomePage />, path: "/" },
  { element: <RecipeCreationPage />, path: "/creation" },
  { element: <RecipeEditPage />, path: "/edit" },
  { element: <ChefPage />, path: "/chef" },
];
