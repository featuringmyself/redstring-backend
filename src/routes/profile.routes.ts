import {Router} from "express";
import { getAllProfiles, getProfileById} from "../controllers/profile.controller.js";

const router = Router();

router.get('/', getAllProfiles);
router.get('/:id', getProfileById);

export default router;