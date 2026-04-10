import dbConnect from "@/lib/dbConnect";
import AttendanceModel from "@/models/attendanceSheet";
import ErrorHandler from "@/utils/errorHandler";
import { wrapAsync } from "@/utils/wrapAsync";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export const DELETE = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if(!session || !session.user){
      throw new ErrorHandler("Not Authenticated",400)
    }

  const { id } = await req.json();

  if (!id) {
    throw new ErrorHandler("Provide the ID", 400);
  }

  const attendace = await AttendanceModel.findOneAndDelete({
    $and: [{ _id: id }, {}],
  });
  if (!attendace) {
    throw new ErrorHandler("Invalid ID", 400);
  }

  return NextResponse.json(
    { success: true, message: "Attendate deleted successfully" },
    { status: 200 },
  );
});
