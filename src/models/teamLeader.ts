import mongoose, { Schema, Document } from "mongoose";

export interface TeamLeader extends Document {
  name: string;
  email: string;
  password: string;
  verifyCode: number;
  verifyCodeExpiry: Date;
  mobileNumber?: number;
  token: string;
}

const teamLeaderSchema: Schema<TeamLeader> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: Number,
    },
    verifyCode: Number,
    verifyCodeExpiry: Date,
    token: {
      type: String,
    },
  },
  { timestamps: true },
);

const TeamLeaderModel =
  (mongoose.models.TeamLeader as mongoose.Model<TeamLeader>) ||
  mongoose.model<TeamLeader>("TeamLeader", teamLeaderSchema);

export default TeamLeaderModel;
