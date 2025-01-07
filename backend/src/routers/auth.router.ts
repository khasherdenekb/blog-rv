import { isValidToken, login, signUp } from "@controllers/auth.controller";
import express from "express";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/login", login);
router.post("/is-valid-token", isValidToken);

export default router;
