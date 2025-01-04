import { login, signUp } from "@controllers/auth.controller";
import express from "express";

const router = express.Router();

router.post("/sign-up", signUp as any);
router.post("/login", login as any);

export default router;
