import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [3, "Name must be atleast 3 characters"],
      maxLength: [50, "Name must not exceed 50 characters"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      minLength: [3, "Username must be atleast 3 characters"],
      maxLength: [50, "Username must not exceed 50 characters"],
      unique: [true, "This username  is not available"],
      match: [
        /^[A-Za-z0-9._]+$/,
        "Usernames can only include numbers, letters, underscores and period",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email already exists"],
      maxLength: [255, "Invalid email address"],
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if(!this.isModified("password")) return
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.verifyPassword = async function (password) {
  return  bcrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema);
export default User;


//everytime password hashed when user docs updates
