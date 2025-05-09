import {Note} from "../models/Note.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";

export const uploadNote = AsyncHandler(async (req, res) => {
  const { title, subject, topic, description } = req.body;

  // Validate required fields
  if (!title || !subject || !topic) {
    throw new ApiError(400, "Title, subject, and topic are required");
  }

  // Check if file is uploaded
  if (!req.file) {
    throw new ApiError(400, "Note file is required");
  }

  // Upload file to Cloudinary
  const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
  if (!cloudinaryResponse) {
    throw new ApiError(500, "File upload to Cloudinary failed");
  }

  // Create new note
  const note = await Note.create({
    title,
    subject,
    topic,
    description,
    fileUrl: cloudinaryResponse.secure_url,
    uploadedBy: req.user._id,
    status: "pending", // default
    createdAt: new Date(),
  });

  res.status(201).json(
    new ApiResponse(201, note, "Note uploaded successfully and sent for review")
  );
});


export const getMyNotes = AsyncHandler(async(req,res)=>{

  const notes = await Note.find({uploadedBy:req.user._id}).sort({createdAt:-1})

  res.status(201).json(new ApiResponse(201,notes,"Your Uploaded Notes"))
})

export const getSingleNote = AsyncHandler(async (req, res) => {
  
  const noteId = req.params.id;

  const note = await Note.findById(noteId)
    .populate("uploadedBy", "name email role")
    .populate("verifiedBy", "name email role")
    .populate("comments.userId", "name email")
    .populate("ratings.userId", "name email");


  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  if (req.user.role === "user") {
  const alreadyViewed = req.user.viewedNotes.some(
    (id) => id.toString() === note._id.toString()
  );

  if (!alreadyViewed) {
    req.user.viewedNotes.push(note._id);
    await req.user.save();
  }
}


  const avgRating = note.ratings.length>0 ? Number(note.ratings.reduce((sum,r)=> sum+r.rating,0)/note.ratings.length).toFixed(1) : 0

  res.status(200).json(
    new ApiResponse(200, {note,avgRating}, "Full note details fetched successfully")
  );
});


export const searchNotes = AsyncHandler(async (req, res) => {
  const { keyword } = req.query;

  const query = {
    status: "approved", // show only approved notes to users
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { subject: { $regex: keyword, $options: "i" } },
      { topic: { $regex: keyword, $options: "i" } },
    ],
  };

  const notes = await Note.find(query).select("-feedback");

  res.status(200).json(
    new ApiResponse(200, notes, `Found ${notes.length} matching notes`)
  );
});


export const downloadNote = AsyncHandler(async (req, res) => {
  const noteId = req.params.id;

  const note = await Note.findById(noteId);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  if (note.status !== "approved") {
    throw new ApiError(403, "Note is not available for download");
  }

  // Increment download count
  note.downloads = note.downloads  + 1;
  await note.save();

  // Respond with the file URL (frontend will handle the preview or download)
  res.status(200).json(
    new ApiResponse(200, { fileUrl: note.fileUrl }, "Download link ready")
  );
});


export const rateNote = AsyncHandler(async (req, res) => {
  const noteId = req.params.id;
  const { rating } = req.body;
  const userId = req.user._id;

  if (!rating || rating < 1 || rating > 5) {
    throw new ApiError(400, "Rating must be a number between 1 and 5");
  }

  const note = await Note.findById(noteId);
  if (!note || note.status !== "approved") {
    throw new ApiError(404, "Note not found or not approved");
  }

  // Check if user has already rated this note
  const existingRating = note.ratings.find(r => r.userId.toString() === userId.toString());

  if (existingRating) {
    // Update existing rating
    existingRating.rating = rating;
  } else {
    // Add new rating
    note.ratings.push({ userId, rating });
  }

  await note.save();

  res.status(200).json(new ApiResponse(200, note.ratings, "Rating submitted"));
});

export const commentOnNote = AsyncHandler(async (req, res) => {
  const noteId = req.params.id;
  const { comment } = req.body;
  const userId = req.user._id;

  if (!comment || comment.trim() === "") {
    throw new ApiError(400, "Comment cannot be empty");
  }

  const note = await Note.findById(noteId);
  if (!note || note.status !== "approved") {
    throw new ApiError(404, "Note not found or not approved");
  }

  note.comments.push({
    userId,
    comment,
    createdAt: new Date(),
  });

  await note.save();

  res.status(200).json(
    new ApiResponse(200, note.comments, "Comment added successfully")
  );
});

export const getPendingNotes = AsyncHandler(async(req,res)=>{

  const pendingNotes = await Note.find({status : "pending"})
  .populate("uploadedBy","name email")

  res.status(200).json(new ApiResponse(200,pendingNotes,"Notes that are needed to verified are fetched successfullly"))
})


export const reviewNote = AsyncHandler(async (req, res) => {
  const noteId = req.params.id;
  const { status, feedback } = req.body;
  const adminId = req.user._id;

  if (!["approved", "rejected"].includes(status)) {
    throw new ApiError(400, "Invalid status. Must be 'approved' or 'rejected'");
  }

  const note = await Note.findById(noteId);
  if (!note || note.status !== "pending") {
    throw new ApiError(404, "Pending note not found");
  }

  note.status = status;
  note.feedback = feedback;
  note.verifiedBy = adminId;
  note.verifiedAt = new Date();

  await note.save();

  res.status(200).json(
    new ApiResponse(200, note, `Note ${status} successfully`)
  );
});


export const getReviewedNotes = AsyncHandler(async (req, res) => {
  const adminId = req.user._id;

  const reviewedNotes = await Note.find({
    verifiedBy: adminId,
    status: { $in: ["approved", "rejected"] }
  })
    .populate("uploadedBy", "name email")
    .sort({ verifiedAt: -1 });

  console.log(reviewedNotes)

  res.status(200).json(
    new ApiResponse(200, reviewedNotes, "Reviewed notes fetched")
  );
});



