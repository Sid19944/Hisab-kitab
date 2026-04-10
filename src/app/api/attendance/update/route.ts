import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/models/attendanceSheet";
import WorkerModle from "@/models/worker";
import ErrorHandler from "@/utils/errorHandler";
import { wrapAsync } from "@/utils/wrapAsync";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";
import { authOptions } from "../../auth/[...nextauth]/options";

export const PUT = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    throw new ErrorHandler("Not Authenticated", 400);
  }

  const body = await req.json();
  const { id } = body;
  if (!id) {
    throw new ErrorHandler("Provide the ID", 400);
  }

  const newData = {
    date: body?.date,
    status: body?.status,
    worker: body?.worker,
  };

  if (newData.worker) {
    const fWorker = await WorkerModle.findById(newData.worker);
    if (!fWorker) {
      throw new ErrorHandler("Invalid worker ID", 400);
    }
  }

  const attendace = await AttendanceModel.findOneAndUpdate(
    {
      $and: [{ _id: id, teamLeader : user._id }],
    },
    newData,
    { new: true },
  );

  if (!attendace) {
    throw new ErrorHandler("Invalid ID", 400);
  }

  return NextResponse.json(
    { success: true, message: "Attendace Updated Successfully" },
    { status: 200 },
  );
});
