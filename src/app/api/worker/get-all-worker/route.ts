import dbConnect from "@/lib/dbConnect";
import { wrapAsync } from "@/utils/wrapAsync";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import WorkerModle from "@/models/worker";
import ErrorHandler from "@/utils/errorHandler";

export const GET = wrapAsync(async (req: NextRequest) => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    throw new ErrorHandler("Not Authenticated", 400);
  }

  const workers = await WorkerModle.find({ teamLeader: user._id });
  return NextResponse.json(
    { success: true, message: "All Worker's Fetched", workers },
    { status: 200 },
  );
});
