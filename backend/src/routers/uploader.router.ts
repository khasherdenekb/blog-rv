import express from "express";
import { uploadImage } from "@controllers/uploader.controller";
import { authenticateToken, checkAdmin } from "@middleware/auth.middleware";

const router = express.Router();

router.post("/upload", authenticateToken, checkAdmin, uploadImage);

export default router;
