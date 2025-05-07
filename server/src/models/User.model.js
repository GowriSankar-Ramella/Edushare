import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true, // Hashed
  },

  role: {
    type: String,
    enum: ["user", "admin", "publisher"],
    default: "user",
  },

  viewedNotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default User = mongoose.model("User", userSchema);
