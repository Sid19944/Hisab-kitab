import mongoose, { Schema, Document, ObjectId } from "mongoose";

enum status {
  PAID = "PAID",
  PARTIAL = "PARTIAL",
  NOT_PAID = "NOT_PAID",
}

interface Deduction extends Document {
  amount: number;
  date: Date;
}

export interface Salary {
  worker: ObjectId;
  totalDays: number;
  fullDays: number;
  halfDays: number;
  absentDays: number;
  deductions: Deduction[];
  totalSalary: number;
  paymentStatus: status;
}

const SalarySchema: Schema<Salary> = new Schema(
  {
    worker: {
      type: Schema.Types.ObjectId,
      ref: "Worker",
    },
    totalDays: { type: Number },
    fullDays: { type: Number },
    halfDays: { type: Number },
    absentDays: { type: Number },
    deductions: [
      {
        amount: Number,
        date: Date,
      },
    ],
    totalSalary: { type: Number },
    paymentStatus: { type: String, enum: Object.values(status) },
  },
  { timestamps: true },
);

const SalaryModel =
  (mongoose.models.Salary as mongoose.Model<Salary>) ||
  mongoose.model<Salary>("Salary", SalarySchema);

export default SalaryModel