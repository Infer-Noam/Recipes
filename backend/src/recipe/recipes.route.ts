import { Router, Request, Response } from "express";
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
import { validateZodSchema } from "../middleware/validation.middleware";
import { RecipeDetailsSchema } from "@shared/validation/recipeDetailsSchema.validation";
import { UuidSchema } from "@shared/validation/uuidSchema.validation";
import { NotFoundError } from "../utils/errors/notFound.error";
import { InternalServerError } from "../utils/errors/internalServer.error";

const router = Router();

router.post(
  "/",
  validateZodSchema(RecipeDetailsSchema, "recipeDetails"),
  async (
    req: Request<unknown, SaveRecipeRes, SaveRecipeReq>,
    res: Response<SaveRecipeRes>
  ) => {
    await service.saveRecipe(req.body.recipeDetails);
    res.status(200).json({ message: "Recipe saved successfully" });
  }
);

router.delete(
  "/",
  validateZodSchema(UuidSchema),
  async (
    req: Request<unknown, DeleteRecipeRes, DeleteRecipeReq>,
    res: Response<DeleteRecipeRes>
  ) => {
    const { uuid } = req.body;

    const exist = await service.deleteRecipe(uuid);

    if (!exist) {
      throw new NotFoundError();
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  }
);

router.get("/", async (_: Request, res: Response<GetAllRecipesRes>) => {
  const recipes = await service.getAllRecipes();

  res.status(200).json({ recipes });
});

router.get("/:uuid", async (req: Request, res: Response<GetRecipeByIdRes>) => {
  const uuid = req.params.uuid;

  const recipe = await service.getRecipeByUuid(uuid);

  if (!recipe) {
    throw new NotFoundError();
  }

  res.status(200).json({ recipe });
});

export default router;
