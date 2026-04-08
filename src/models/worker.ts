import mongoose, { Schema, Document, model } from "mongoose";

export interface Worker extends Document {
  name: string;
  mobileNumber: number;
}

const workerSchema: Schema<Worker> = new Schema(
  {
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

export default WorkerModle