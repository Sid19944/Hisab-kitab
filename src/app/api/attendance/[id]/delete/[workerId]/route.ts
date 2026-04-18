import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/models/attendanceSheet";
import ErrorHandler from "@/utils/errorHandler";
import { wrapAsync } from "@/utils/wrapAsync";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../auth/[...nextauth]/options";

export const DELETE = wrapAsync(async (req: NextRequest,{params}:{params : {id : string, workerId : string}}) => {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    throw new ErrorHandler("Not Authenticated", 400);
  }

  const { id, workerId } = await params

  if (!id || !workerId) {
    throw new ErrorHandler("Provide the ID AND workerID", 400);
  }

  const attendace = await AttendanceModel.findOneAndDelete({
    $or: [{ _id: id }, { worker: workerId }],
  });
  if (!attendace) {
    throw new ErrorHandler("Invalid ID", 400);
  }

  return NextResponse.json(
    { success: true, message: "Attendate deleted successfully" },
    { status: 200 },
  );
});
