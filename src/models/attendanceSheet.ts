import mongoose, { Schema, Document, ObjectId } from "mongoose";

enum status {
  fullDay = 1,
  halfDay = 0.5,
  absent = 0,
}
export interface Attendance extends Document {
  teamLeader: ObjectId;
  date: Date;
  status: status;
  worker: ObjectId;
}

const AttendanceSchema: Schema<Attendance> = new Schema(
  {
    teamLeader: {
      type: Schema.Types.ObjectId,
      ref: "TeamLeader",
      required: true,
    },
    date: { type: Date, default: Date.now() },
    status: { type: Number, enum: Object.values(status), required: true },
    worker: { type: Schema.Types.ObjectId, ref: "Worker", required: true },
  },
  { timestamps: true },
);

const AttendanceModel =
  (mongoose.models.Attendance as mongoose.Model<Attendance>) ||
  mongoose.model<Attendance>("Attendance", AttendanceSchema);

export default AttendanceModel