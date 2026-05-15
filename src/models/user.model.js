import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

    loggedIn: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

// before saving any password, it has to be hashed for safety reasons.
userSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) {
      return;
    }
  
    this.password = await bcrypt.hash(this.password, 10)
  
  } catch (error) {
      console.error(error)
  }
})

//compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema)
export default User;