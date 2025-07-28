import { Router, Request, Response, NextFunction } from "express";
import service from "./recipe.service";
import {
  SaveRecipeReq,
  SaveRecipeRes,
} from "@shared/api/recipe/saveRecipe.http-type";
import {
  DeleteRecipeReq,
  DeleteRecipeRes,
} from "@shared/api/recipe/deleteRecipe.http-type";
import { GetRecipeByIdRes } from "@shared/api/recipe/getRecipeByUuid.http-type";
import { GetAllRecipesRes } from "@shared/api/recipe/getAllRecipes.http-type";
import { HttpError } from "@shared/types/httpError.type";
import { NotFoundError } from "../utils/errors/notFound.error";

const router = Router();

router.post(
  "/",
  async (
    req: Request<null, null, SaveRecipeReq>,
    res: Response<SaveRecipeRes>
  ) => {
    const recipe = await service.saveRecipe(req.body.recipeDetails);

    if (!recipe) throw new HttpError("Recipe creation failed", 500);

    res.status(200).json({ message: "Recipe saved successfully" });
  }
);

router.delete(
  "/",
  async (
    req: Request<null, null, DeleteRecipeReq>,
    res: Response<DeleteRecipeRes>
  ) => {
    const { uuid } = req.body;

    const exist = await service.deleteRecipe(uuid);

    if (!exist) throw new NotFoundError("Recipe");

    res.status(200).json({ message: "Recipe deleted successfully" });
  }
);

router.get("/", async (_: Request, res: Response<GetAllRecipesRes>) => {
  const recipes = await service.getAllRecipes();

  if (!recipes.length) {
    throw new NotFoundError("Recipes");
  }

  res.status(200).json({ recipes });
});

router.get("/:uuid", async (req: Request, res: Response<GetRecipeByIdRes>) => {
  const uuid = req.params.uuid;

  const recipe = await service.getRecipeByUuid(uuid);

  if (!recipe) throw new NotFoundError("Recipe");

  res.status(200).json({ recipe });
});

export default router;
