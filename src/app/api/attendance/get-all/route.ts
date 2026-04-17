import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/models/attendanceSheet";
import ErrorHandler from "@/utils/errorHandler";
import { wrapAsync } from "@/utils/wrapAsync";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose, { Schema } from "mongoose";

export const GET = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    throw new ErrorHandler("Not Authenticated", 400);
  }

  const allAttendance = await AttendanceModel.aggregate([
    {
      $match: {
        teamLeader: new mongoose.Types.ObjectId(user?._id?.toString()),
      },
    },
    {
      $group: {
        _id: "$worker",
        attendanceRecord: {
          $push: {
            date: "$date",
            status: "$status",
          },
        },
        totalDays: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "workers",
        localField: "_id",
        foreignField: "_id",
        as: "WorkerDetail",
      },
    },
    { $unwind: "$WorkerDetail" },
    {
      $sort : {"WorkerDetail.name" : -1}
    }
  ]);

  return NextResponse.json(
    {
      success: true,
      message: "Attendance fetched Successfully",
      allAttendance,
    },
    { status: 201 },
  );
});
