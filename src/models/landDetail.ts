import mongoose, { Schema, Document } from "mongoose";

enum status {
  pending = "pending",
  in_progress = "in_progress",
  completed = "completed",
  canceled = "canceled",
}

export interface LandDetail extends Document {
  owner: string;
  area: number;
  money: number;
  status: status;
}

const LandDetailSchema: Schema<LandDetail> = new Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    area: { type: Number, required: true },
    money: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(status),
    },
  },
  { timestamps: true },
);

const LandDetailModel =
  (mongoose.models.LandDetail as mongoose.Model<LandDetail>) ||
  mongoose.model<LandDetail>("LandDetail", LandDetailSchema);

export default LandDetailModel;
