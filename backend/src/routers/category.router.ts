import express from "express";
import { addCategory, getCategory } from "@controllers/category.controller";
import { authenticateToken, checkAdmin } from "@middleware/auth.middleware";

const router = express.Router();

router.get("/category", authenticateToken, getCategory);
router.post("/category", authenticateToken, checkAdmin, addCategory);

export default router;
