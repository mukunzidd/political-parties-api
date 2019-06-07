import { Router } from "express";
import candidatesController from "../controllers/candidates";

export default Router()
  .post("/candidates", candidatesController.create)
  .get("/candidates", candidatesController.findAll)
  .get("/candidates/:id", candidatesController.find)
  .put("/candidates/:id", candidatesController.update)
  .delete("/candidates/:id", candidatesController.delete);
