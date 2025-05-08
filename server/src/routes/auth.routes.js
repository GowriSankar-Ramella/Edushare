import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout",isAuthenticated,logout)


export default router;
