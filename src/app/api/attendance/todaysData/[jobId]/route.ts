import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/models/attendanceSheet";
import { wrapAsync } from "@/utils/wrapAsync";
import { NextRequest, NextResponse } from "next/server";

export const GET = wrapAsync(
  async (req: NextRequest, { params }: { params: { jobId: string } }) => {
    await dbConnect();

    const { jobId } = await params;

    // today's day range
    const startOfDay = new Date().setUTCHours(0,0,0,0)
    const endOfDay = new Date().setUTCHours(23,59,59,59)

    const today = await AttendanceModel.find({
      job : jobId,
      date : {
        $gte : startOfDay,
        $lt : endOfDay
      }
    })

    return NextResponse.json(
      {
        success: true,
        today,
      },
      { status: 201 },
    );
  },
);
