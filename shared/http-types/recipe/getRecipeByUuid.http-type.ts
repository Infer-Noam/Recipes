import { Recipe } from "../../types/recipe.type";
import { UuidReq } from "../generic/uuidReq.https-types";

export type GetRecipeByIdRes = {
  recipe: Recipe;
};
