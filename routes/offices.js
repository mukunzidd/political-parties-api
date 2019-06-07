import { Router } from "express";
import officesController from "../controllers/offices";

export default Router()
  .get("/offices", officesController.findAll)
  .post("/offices", officesController.create)
  .get("/offices/:id", officesController.find)
  .put("/offices/:id", officesController.update)
  .delete("/offices/:id", officesController.delete);
