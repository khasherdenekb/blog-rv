import { editUserProfile } from "@controllers/users.controller";
import { authenticateToken } from "@middleware/auth.middleware";
import express from "express";

const router = express.Router();

router.put("/users/me", authenticateToken, editUserProfile);

export default router;
