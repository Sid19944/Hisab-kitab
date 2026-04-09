import dbConnect from "@/lib/dbConnect";
import AttendanceModel, { Attendance } from "@/models/attendanceSheet";
import ErrorHandler from "@/utils/errorHandler";
import { wrapAsync } from "@/utils/wrapAsync";
import { NextRequest, NextResponse } from "next/server";

export const POST = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const { teamLeader, date, status, worker } = await req.json();
  if (!teamLeader || !date || !status || !worker) {
    throw new ErrorHandler("Provide all detils", 400);
  }

  const toDate = new Date(date).setHours(0, 0, 0, 0);

  const alreadyCurrDay = await AttendanceModel.findOne({
    worker,
    date: toDate,
  });

  if (alreadyCurrDay) {
    throw new ErrorHandler(
      `Worker's attendance Already added for ${new Date(toDate).toLocaleDateString("en-In")}`,
      400,
    );
  }

  const newAttendance = await AttendanceModel.create({
    teamLeader,
    date: toDate,
    status,
    worker,
  });

  if (!newAttendance) {
    throw new ErrorHandler("Error while add attendace", 500);
  }

  return NextResponse.json(
    { success: true, message: "Attendance Added Successfully" },
    { status: 201 },
  );
});
