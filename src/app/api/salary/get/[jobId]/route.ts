import dbConnect from "@/lib/dbConnect";
import { wrapAsync } from "@/utils/wrapAsync";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import ErrorHandler from "@/utils/errorHandler";
import AttendanceModel from "@/models/attendanceSheet";
import mongoose from "mongoose";

export const GET = wrapAsync(
  async (req: NextRequest, { params }: { params: { jobId: string } }) => {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
      throw new ErrorHandler("Not Authenticated", 400);
    }

    const { jobId } = await params;

    const workerWithAttendance = await AttendanceModel.aggregate([
      {
        $match: { job: new mongoose.Types.ObjectId(jobId) },
      },
      {
        $group: {
          _id: "$worker",
          job: { $first: "$job" },
          workingDays: { $sum: "$status" },
          totalDays: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "deductions",
          let: { workerId: "$_id", jobId: "$job" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$worker", "$$workerId"] },
                    { $eq: ["$job", "$$jobId"] },
                  ],
                },
              },
            },
          ],
          as: "deductions",
        },
      },
      // { $unwind: { path: "$deductions", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "workers",
          localField: "_id",
          foreignField: "_id",
          as: "WorkerDetail",
        },
      },
      {
        $unwind: "$WorkerDetail",
      },
      {
        $lookup: {
          from: "landdetails",
          let: { jobId: "$job" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$job", "$$jobId"] },
                    { $eq: ["$status", "COMPLETED"] },
                  ],
                },
              },
            },
          ],
          as: "lands",
        },
      },
      {
        $project: {
          _id: 0,
          workerId: "$WorkerDetail._id",
          worker: "$WorkerDetail.name",
          mobileNumber: "$WorkerDetail.mobileNumber",
          workingDays: 1,
          totalDays: 1,
          deductions: 1,
          lands: 1,
          totalLandMoney: { $sum: "$lands.money" },
          totalDeduction: { $sum: "$deductions.amount" },
        },
      },
      {
        $sort: { worker: 1 },
      },
    ]);

    return NextResponse.json(
      { success: true, workerWithAttendance },
      { status: 200 },
    );
  },
);
