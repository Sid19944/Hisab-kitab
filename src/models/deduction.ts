import mongoose, { Schema, Document, ObjectId } from "mongoose";
export interface Deduction {
  job: string | ObjectId;
  worker: string | ObjectId;
  amount: number;
  date: Date;
}

const deductionsSchema: Schema<Deduction> = new Schema(
  {
    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Enter Worker ID"],
    },
    worker: {
      type: Schema.Types.ObjectId,
      ref: "Worker",
      required: [true, "Enter Worker ID"],
    },
    amount: { type: Number, required: [true, "Enter amount"] },
    date: { type: Date, required: [true, "Enter Date"] },
  },
  { timestamps: true },
);

const deductionsModel =
  (mongoose.models.Deduction as mongoose.Model<Deduction>) ||
  mongoose.model<Deduction>("Deduction", deductionsSchema);

export default deductionsModel;
