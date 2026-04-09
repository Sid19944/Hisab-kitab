import mongoose, { Schema, Document, model, ObjectId } from "mongoose";

export interface Worker extends Document {
  teamLeader: ObjectId;
  name: string;
  mobileNumber: number;
}

const workerSchema: Schema<Worker> = new Schema(
  {
    teamLeader: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true,"Where is TeamLeader"],
    },
    name: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const WorkerModle =
  (mongoose.models.Worker as mongoose.Model<Worker>) ||
  mongoose.model<Worker>("Worker", workerSchema);

export default WorkerModle;
