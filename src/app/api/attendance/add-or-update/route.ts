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

  const body = await req.json();
  const { worker, job } = body;
  if (!worker || !job) {
    throw new ErrorHandler("Provide all detils", 400);
  }

  const date = new Date();
  const toDate = new Date(date).setUTCHours(0, 0, 0, 0);

  const fWorker = await WorkerModle.findById(worker);
  if (!fWorker) {
    throw new ErrorHandler("Invalid worker ID", 400);
  }

  const alreadyCurrDay = await AttendanceModel.findOne({
    worker,
    job,
    date: toDate,
  });


  if (alreadyCurrDay) {
    alreadyCurrDay.status = body.status;
    await alreadyCurrDay.save();

    return NextResponse.json(
      { success: true, message: "Attendance Updated Successfully" },
      { status: 200 },
    );
  }

  const newAttendance = await AttendanceModel.create({
    teamLeader: user._id,
    job,
    status: body?.status,
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
