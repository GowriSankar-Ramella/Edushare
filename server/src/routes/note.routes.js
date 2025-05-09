import express from "express";
import {
  uploadNote,
  getMyNotes,
  getSingleNote,
  searchNotes,
  downloadNote,
  rateNote,
  commentOnNote,
  getPendingNotes,
  reviewNote,
  getReviewedNotes,
} from "../controllers/note.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

import {authorizeRoles} from "../middleware/authorizeRoles.middleware.js"

import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

//  Publisher routes
router.post("/upload", isAuthenticated, authorizeRoles("publisher"),upload.single("file") ,uploadNote);
router.get("/mynotes", isAuthenticated, authorizeRoles("publisher"), getMyNotes);

router.get("/search", isAuthenticated, authorizeRoles("user"), searchNotes);

router.get("/pending", isAuthenticated, authorizeRoles("admin"), getPendingNotes);

router.get("/reviewed", isAuthenticated, authorizeRoles("admin"), getReviewedNotes);


router.get("/:id/download", isAuthenticated, authorizeRoles("user"), downloadNote);
router.post("/:id/rate", isAuthenticated, authorizeRoles("user"), rateNote);
router.post("/:id/comment", isAuthenticated, authorizeRoles("user"), commentOnNote);

router.put("/:id/review", isAuthenticated, authorizeRoles("admin"), reviewNote);

router.get("/:id", isAuthenticated, getSingleNote);

export default router;
