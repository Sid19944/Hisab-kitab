import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  mobileNumber: number;
  isVerified: boolean;
  verifyCode: number;
  verifyCodeExpiry: Date;
  createdAt: Date;
}

const UserSchema: Schema<User> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: [8, "Password must be at least 6 characters"],
    },
    verifyCode: {
      type: Number,
      required: [true, "verifyCode is required"],
    },
    verifyCodeExpiry: {
      type: Date,
      required: [true, "Expiry of required code is required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
