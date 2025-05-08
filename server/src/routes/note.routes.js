// import express from "express";
// import {
//   uploadNote,
//   getMyNotes,
//   getSingleNote,
//   searchNotes,
//   downloadNote,
//   rateNote,
//   commentOnNote,
//   getViewedNotes,
//   getPendingNotes,
//   reviewNote,
//   getReviewedNotes,
// } from "../controllers/note.controller.js";
// import { isAuthenticated, authorizeRoles } from "../middlewares/auth.middleware.js";

// const router = express.Router();

// //  Publisher routes
// router.post("/upload", isAuthenticated, authorizeRoles("publisher"), uploadNote);
// router.get("/mynotes", isAuthenticated, authorizeRoles("publisher"), getMyNotes);

// //  User routes
// router.get("/search", isAuthenticated, authorizeRoles("user"), searchNotes);
// router.get("/:id", isAuthenticated, getSingleNote);
// router.get("/:id/download", isAuthenticated, authorizeRoles("user"), downloadNote);
// router.post("/:id/rate", isAuthenticated, authorizeRoles("user"), rateNote);
// router.post("/:id/comment", isAuthenticated, authorizeRoles("user"), commentOnNote);


// //  Admin routes
// router.get("/pending", isAuthenticated, authorizeRoles("admin"), getPendingNotes);
// router.put("/:id/review", isAuthenticated, authorizeRoles("admin"), reviewNote);
// router.get("/reviewed", isAuthenticated, authorizeRoles("admin"), getReviewedNotes);

// export default router;
