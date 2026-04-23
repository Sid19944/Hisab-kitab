import dbConnect from "@/lib/dbConnect";
import { wrapAsync } from "@/utils/wrapAsync";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import ErrorHandler from "@/utils/errorHandler";
import { Job } from "@/models/job";
import mongoose from "mongoose";

export const POST = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    throw new ErrorHandler("Not Authenticated", 400);
  }

  const { jobName } = await req.json();
  if (!jobName) {
    throw new ErrorHandler("Job name is required", 400);
  }

  const job = await Job.create({ jobName, user : user._id });
  if (!job) {
    throw new ErrorHandler("Failed to create job", 500);
  }
  return NextResponse.json(
    { success: true, message: "Job Created Successfully" },
    { status: 201 },
  );
});
