import {Router} from "express";
import {createProfile, getAllProfiles, getProfileById} from "../controllers/profile.controller.ts";

const router = Router();

router.get('/', getAllProfiles);
router.get('/:id', getProfileById);
router.post('/', createProfile);

export default router;