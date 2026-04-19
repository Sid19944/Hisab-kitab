import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface LandDetail extends Document {
  owner: string;
  area: number;
  money: number;
  location: string;
  job?: string | ObjectId;
  status: string;
  landAssignTo: string | ObjectId;
}

const LandDetailSchema: Schema<LandDetail> = new Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    location: { type: String, required: true },
    area: { type: Number, required: true },
    money: { type: Number, required: true },
    job: { type: Schema.Types.ObjectId, ref: "Job" },
    status: {
      type: String,
      enum: ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELED"],
      required: true,
    },
    landAssignTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Pleaer Provide Land Assigner"],
    },
  },
  { timestamps: true },
);

const LandDetailModel =
  (mongoose.models.LandDetail as mongoose.Model<LandDetail>) ||
  mongoose.model<LandDetail>("LandDetail", LandDetailSchema);

export default LandDetailModel;
