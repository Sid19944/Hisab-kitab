import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface Attendance extends Document {
  teamLeader: ObjectId;
  date: Date;
  status: number;
  worker: ObjectId;
}

const AttendanceSchema: Schema<Attendance> = new Schema(
  {
    teamLeader: {
      type: Schema.Types.ObjectId,
      ref: "TeamLeader",
      required: true,
    },
    date: {
      type: Date,
      default: new Date(Date.now()).setHours(0, 0, 0, 0),
      unique: true,
    },
    status: { type: Number, enum: [1, 0.5, 0], required: true },
    worker: { type: Schema.Types.ObjectId, ref: "Worker", required: true },
  },
  { timestamps: true },
);

const AttendanceModel =
  (mongoose.models.Attendance as mongoose.Model<Attendance>) ||
  mongoose.model<Attendance>("Attendance", AttendanceSchema);

export default AttendanceModel;
