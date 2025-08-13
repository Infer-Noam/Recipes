import { Router, Request, Response } from "express";
import service from "./chef.service";
import { SaveChefReq, SaveChefRes } from "@shared/api/chef/saveChef.api";
import { GetAllChefsRes } from "@shared/api/chef/getAllChefs.api";
import { DeleteChefReq, DeleteChefRes } from "@shared/api/chef/deleteChef.api";
import { NotFoundError } from "src/utils/errors/notFound.error";
import { ChefDetailsSchema } from "@shared/validation/chefDetailsSchema.validation";
import { validateZodSchema } from "../middleware/validation.middleware";
import { UuidSchema } from "@shared/validation/uuidSchema.validation";
import { InternalServerError } from "src/utils/errors/internalServer.error";

const router = Router();

router.post(
  "/",
  validateZodSchema(ChefDetailsSchema, "chefDetails"),
  async (
    req: Request<unknown, SaveChefRes, SaveChefReq>,
    res: Response<SaveChefRes>
  ) => {
    const chef = await service.saveChef(req.body.chefDetails);
    if (!chef) {
      throw new InternalServerError();
    }
    res.status(200).json({ message: "Chef saved successfully" });
  }
);

router.get("/", async (_: Request, res: Response<GetAllChefsRes>) => {
  const chefs = await service.getAllChefs();
  res.status(200).json({ chefs });
});

router.delete(
  "/",
  validateZodSchema(UuidSchema),
  async (
    req: Request<unknown, DeleteChefRes, DeleteChefReq>,
    res: Response<DeleteChefRes>
  ) => {
    const { uuid } = req.body;

    const exist = await service.deleteChef(uuid);

    if (!exist) throw new NotFoundError();

    res.status(200).json({
      message: "Chef deleted successfully",
    });
  }
);
export default router;
