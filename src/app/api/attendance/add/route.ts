import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/models/attendanceSheet";
import WorkerModle from "@/models/worker";
import ErrorHandler from "@/utils/errorHandler";
import { wrapAsync } from "@/utils/wrapAsync";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export const POST = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    throw new ErrorHandler("Not Authenticated", 400);
  }

  const { date, status, worker } = await req.json();
  if (!date || !status || !worker) {
    throw new ErrorHandler("Provide all detils", 400);
  }

  const toDate = new Date(date).setHours(0, 0, 0, 0);

  const fWorker = await WorkerModle.findById(worker);
  if (!fWorker) {
    throw new ErrorHandler("Invalid worker ID", 400);
  }

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
    teamLeader: user._id,
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
