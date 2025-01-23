import express from "express";
import { authenticateToken, checkAdmin } from "@middleware/auth.middleware";
import { createBlog, getBlogs } from "@controllers/blogs.controller";

const router = express.Router();

router.get("/blogs", authenticateToken, getBlogs);
router.post("/blogs", authenticateToken, checkAdmin, createBlog);

export default router;
