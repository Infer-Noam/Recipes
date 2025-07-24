import { Router, Request, Response } from "express";
import service from "./chef.service";
import {
  SaveChefReq,
  SaveChefRes,
} from "@shared/http-types/chef/saveChef.http-type";
import { GetAllChefsRes } from "@shared/http-types/chef/getAllChefs.http-type";
import { DeleteChefReq } from "@shared/http-types/chef/deleteChef.http-type";

const router = Router();

router.post(
  "/",
  async (req: Request<null, null, SaveChefReq>, res: Response<SaveChefRes>) => {
    const result = await service.saveChef(req.body.chefDetails);
    if (result.chef) {
      res.status(200).json({ chef: result.chef });
    } else {
      res.status(500).json({ error: result.error });
    }
  }
);

router.get("/", async (_: Request, res: Response<GetAllChefsRes>) => {
  const chefs = await service.getAllChefs();
  return res.status(200).json({ chefs });
});

router.delete(
  "/",
  async (req: Request<null, null, DeleteChefReq>, res: Response) => {
    const { uuid } = req.body;

    const exist = await service.deleteChef(uuid);

    res.sendStatus(exist ? 204 : 404);
  }
);
export default router;
