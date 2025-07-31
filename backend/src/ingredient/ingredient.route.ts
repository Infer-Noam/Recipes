import { Router, Request, Response } from "express";
import service from "./ingredient.service";
import {
  CreateIngredientReq,
  CreateIngredientRes,
} from "@shared/http-types/ingredient/createIngredient.http-type";
import { GetAllIngredientsRes } from "@shared/http-types/ingredient/getAllIngredients.http-type";

const router = Router();

router.post(
  "/",
  async (
    req: Request<null, null, CreateIngredientReq>,
    res: Response<CreateIngredientRes>
  ) => {
    const name = req.body.name;
    const ingredient = await service.createIngredient(name);

    res.status(201).json({ ingredient });
  }
);

router.get("/", async (_: Request, res: Response<GetAllIngredientsRes>) => {
  const ingredients = await service.getAllIngredients();
  return res.status(200).json({ ingredients });
});

export default router;
