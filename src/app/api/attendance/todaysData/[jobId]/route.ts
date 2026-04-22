import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/models/attendanceSheet";
import { wrapAsync } from "@/utils/wrapAsync";
import { NextRequest, NextResponse } from "next/server";

export const GET = wrapAsync(
  async (req: NextRequest, { params }: { params: { jobId: string } }) => {
    await dbConnect();

    const { jobId } = await params;

    const allAttendance = await AttendanceModel.find({ job: jobId });

    const today = allAttendance.filter(
      (at) =>
        new Date(at.date).setHours(0, 0, 0, 0) ==
        new Date().setHours(0, 0, 0, 0),
    );

    return NextResponse.json(
      {
        success: true,
        today,
      },
      { status: 201 },
    );
  },
);
