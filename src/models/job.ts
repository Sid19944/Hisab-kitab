import mongoose, { Schema, Document, ObjectId } from "mongoose";
interface Worker {
  workerId: string;
  name: string;
  mobileNumber: number;
}

export interface Job extends Document {
  jobName: string;
  user: ObjectId;
  workers?: Worker[];
  completedDate?: Date;
  createdAt?: Date;
}

const JobSchema: Schema<Job> = new Schema(
  {
    jobName: {
      type: String,
      required: [true, "Job name is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    workers: [
      {
        _id: false,
        workerId: String,
        name: String,
        mobileNumber: Number,
      },
    ],
    completedDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

export const Job =
  (mongoose.models.Job as mongoose.Model<Job>) ||
  mongoose.model<Job>("Job", JobSchema);
