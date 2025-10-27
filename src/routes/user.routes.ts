import express from "express";
import { getCreditBalance, unlockProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/credit", getCreditBalance);
router.post("/unlock", unlockProfile);

export default router;
