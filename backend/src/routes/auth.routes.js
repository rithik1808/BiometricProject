import express from "express";
import { signup, signin, logout, checkAuth, addDoctor } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", (req, res) => res.send("test Route")); // test route
router.post("/signup", signup);
router.post("/addDoctor", addDoctor);
router.post("/login", signin);
router.get("/logout", logout);
router.get("/check", protectRoute, checkAuth);

export default router;
