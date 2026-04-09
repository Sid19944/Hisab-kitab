import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/models/attendanceSheet";
import ErrorHandler from "@/utils/errorHandler";
import { wrapAsync } from "@/utils/wrapAsync";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const { id } = await req.json();

  if (!id) {
    throw new ErrorHandler("Provide the ID", 400);
  }

  const attendace = await AttendanceModel.findByIdAndDelete(id);
  if (!attendace) {
    throw new ErrorHandler("Invalid ID", 400);
  }

  return NextResponse.json(
    { success: true, message: "Attendate deleted successfully" },
    { status: 200 },
  );
});
