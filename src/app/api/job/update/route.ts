import dbConnect from "@/lib/dbConnect";
import { Job } from "@/models/job";
import ErrorHandler from "@/utils/errorHandler";
import { wrapAsync } from "@/utils/wrapAsync";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession, User } from "next-auth";

export const PUT = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

    if (!session || !session.user) {
      throw new ErrorHandler("Not Authenticated", 400);
    }

  const body = await req.json();
  const { id } = body;
  const newData = {
    jobName: body?.jobName,
    completedDate: body?.completedDate,
  };

  const job = await Job.findByIdAndUpdate(id, newData);
  if (!job) {
    throw new ErrorHandler("Failed to update Job", 400);
  }

  return NextResponse.json(
    { success: true, message: "Job Updated Successfully" },
    { status: 200 },
  );
});
