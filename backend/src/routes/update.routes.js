import express from "express";
import {
  updateDocument,
  getDocuments,
} from "../controllers/update.controller.js";

const router = express.Router();

router.post("/", updateDocument);
router.get("/", getDocuments);

export default router;
