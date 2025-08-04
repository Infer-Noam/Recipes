import { Router, Request, Response, NextFunction } from "express";
import service from "./chef.service";
import {
  SaveChefReq,
  SaveChefRes,
} from "@shared/http-types/chef/saveChef.http-type";
import { GetAllChefsRes } from "@shared/http-types/chef/getAllChefs.http-type";
import {
  DeleteChefReq,
  DeleteChefRes,
} from "@shared/http-types/chef/deleteChef.http-type";
import { HttpError } from "@shared/types/httpError.type";
import { NotFoundError } from "src/utils/errors/notFound.error";

const router = Router();

router.post(
  "/",
  async (req: Request<null, null, SaveChefReq>, res: Response<SaveChefRes>) => {
    const chef = await service.saveChef(req.body.chefDetails);
    if (!chef) {
      new HttpError("Something went wrong");
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
  async (req: Request<null, null, DeleteChefReq>, res: Response<DeleteChefRes>) => {
    const { uuid } = req.body;

    const exist = await service.deleteChef(uuid);

    if (!exist) throw new NotFoundError("Chef");

    res.status(200).json({
        message: "Chef deleted successfully",
      });
  }
);
export default router;
