import {User} from "../models/User.model.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const getViewedNotesByUser = AsyncHandler(async (req, res) => {
  if (req.user.role !== "user") {
    throw new ApiError(403, "Only users can view their note history");
  }

  const user = await User.findById(req.user._id).populate({
    path: "viewedNotes",
    match: { status: "approved" },
    select: "title subject topic fileUrl createdAt",
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(
    new ApiResponse(200, user.viewedNotes, "Viewed notes fetched successfully")
  );
});

export const getProfile = AsyncHandler(async(req,res)=>{
    res.status(200).json(new ApiResponse(200,req.user,"User Profile fetched successfully"))
})