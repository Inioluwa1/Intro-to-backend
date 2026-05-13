import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 1,
      maxLength: 30
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      // match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },

    logedIn: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model("User", userSchema)
export default User;