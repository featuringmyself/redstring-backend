import { Router } from 'express';
import profileRoutes from "./profile.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

router.use("/profile", profileRoutes);
router.use("/user", userRoutes);

export default router;