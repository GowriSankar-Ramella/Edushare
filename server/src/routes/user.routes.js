import express from "express";
import { getProfile, getViewedNotesByUser } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile", isAuthenticated, getProfile);
router.get("/viewed-notes", isAuthenticated, getViewedNotesByUser);

export default router;
