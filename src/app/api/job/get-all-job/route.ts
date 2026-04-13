import dbConnect from "@/lib/dbConnect";
import { wrapAsync } from "@/utils/wrapAsync";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession, User } from "next-auth";
import ErrorHandler from "@/utils/errorHandler";
import { Job } from "@/models/job";

export const GET = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    throw new ErrorHandler("Not Authenticated", 400);
  }

  const jobs = await Job.find({ user: user._id }).sort({ createdAt: -1 });
  if (!jobs.length) {
    throw new ErrorHandler("Please Create A Job First", 400);
  }
  return NextResponse.json(
    { success: true, message: "All job Fetched", jobs },
    { status: 200 },
  );
});
