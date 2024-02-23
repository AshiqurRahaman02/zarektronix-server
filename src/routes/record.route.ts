import express from "express";
import { addRecord, deleteRecord, getRecords } from "../controllers/record.controller";
import { verifyToken } from "../middlewares/authentication.middlewares";

const recordRouter = express.Router();

recordRouter.get("/get-records",verifyToken, getRecords)
recordRouter.post("/add-record",verifyToken, addRecord)
recordRouter.delete("/delete-record/:id",verifyToken, deleteRecord)

export default recordRouter;