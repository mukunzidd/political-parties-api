import { Router } from "express";
import partiesController from "../controllers/parties";

export default Router()
  .post("/parties", partiesController.create)
  .get("/parties", partiesController.findAll)
  .get("/parties/:id", partiesController.find)
  .put("/parties/:id", partiesController.update)
  .delete("/parties/:id", partiesController.delete);
