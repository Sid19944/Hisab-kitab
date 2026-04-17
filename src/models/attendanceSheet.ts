import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface Attendance extends Document {
  teamLeader: string | ObjectId;
  date: Date;
  job: string;
  status?: number;
  worker: string | ObjectId;
}

const AttendanceSchema: Schema<Attendance> = new Schema(
  {
    job: {
      type: String,
      required: true,
    },
    teamLeader: {
      type: Schema.Types.ObjectId,
      ref: "TeamLeader",
      required: true,
    },
    date: {
      type: Date,
      default: new Date(Date.now()).setHours(0, 0, 0, 0),
    },
    status: { type: Number, enum: [1, 0.5, 0] },
    worker: { type: Schema.Types.ObjectId, ref: "Worker", required: true },
  },
  { timestamps: true },
);

const AttendanceModel =
  (mongoose.models.Attendance as mongoose.Model<Attendance>) ||
  mongoose.model<Attendance>("Attendance", AttendanceSchema);

export default AttendanceModel;
