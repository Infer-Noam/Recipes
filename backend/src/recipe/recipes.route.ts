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

const router = Router();

router.post(
  "/",
  async (
    req: Request<null, null, SaveRecipeReq>,
    res: Response<SaveRecipeRes>,
    next: NextFunction
  ) => {
    try {
      const recipe = await service.saveRecipe(req.body.recipeDetails);

      if (!recipe) throw new HttpError("Recipe creation failed", 500);

      res.status(200).json({ message: "Recipe saved successfully" });
      next();
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/",
  async (
    req: Request<null, null, DeleteRecipeReq>,
    res: Response<DeleteRecipeRes>,
    next: NextFunction
  ) => {
    try {
      const { uuid } = req.body;

      const exist = await service.deleteRecipe(uuid);

      if (!exist) throw new HttpError("Recipe not found", 404);

      res.status(200).json({ message: "Recipe deleted successfully" });
      next();
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/",
  async (_: Request, res: Response<GetAllRecipesRes>, next: NextFunction) => {
    try {
      const recipes = await service.getAllRecipes();

      if (!recipes.length) {
        throw new HttpError("Recipes not found", 404);
      }

      res.status(200).json({ recipes });
      next();
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:uuid",
  async (req: Request, res: Response<GetRecipeByIdRes>, next: NextFunction) => {
    try {
      const uuid = req.params.uuid;

      const recipe = await service.getRecipeByUuid(uuid);

      if (!recipe) throw new HttpError("Recipe not found", 404);

      res.status(200).json({ recipe });
      next();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
