import type { RouteProps } from "react-router-dom";
import RecipeCreationPage from "../pages/recipe-creation/RecipeCreation.tsx";
import RecipePage from "../pages/recipe/recipePage.tsx";
import ChefPage from "../pages/chef/ChefPage.tsx";
import HomePage from "./../pages/home/homePage";

export const PAGES_ROUTES: RouteProps[] = [
  { element: <HomePage />, path: "/" },
  { element: <RecipeCreationPage />, path: "/creation" },
  { element: <RecipePage />, path: "/recipe/:uuid" },
  { element: <ChefPage />, path: "/chef" },
];
