import type { RouteProps } from "react-router-dom";
<<<<<<< HEAD
import RecipeCreationPage from "../pages/recipe-creation/RecipeCreation.tsx";
import RecipePage from "../pages/recipe/recipePage.tsx";
import ChefPage from "../pages/chef/ChefPage.tsx";
import HomePage from "./../pages/home/homePage";
=======
import HomePage from "../pages/home/HomePage.tsx";
import RecipeCreationPage from "../pages/recipe-creation/RecipeCreation.tsx";
import RecipePage from "../pages/recipe/RecipePage.tsx";
import ChefPage from "../pages/chef/ChefPage.tsx";
>>>>>>> 33e97d0 (Renamed recipe component to cardRecipe and added a recipe component.)

export const PAGES_ROUTES: RouteProps[] = [
  { element: <HomePage />, path: "/" },
  { element: <RecipeCreationPage />, path: "/creation" },
  { element: <RecipePage />, path: "/recipe/:uuid" },
  { element: <ChefPage />, path: "/chef" },
];
