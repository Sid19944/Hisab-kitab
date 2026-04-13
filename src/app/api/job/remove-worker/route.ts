import dbConnect from "@/lib/dbConnect";
import { Job } from "@/models/job";
import ErrorHandler from "@/utils/errorHandler";
import { wrapAsync } from "@/utils/wrapAsync";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import WorkerModle from "@/models/worker";
import mongoose from "mongoose";

export const PUT = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

    if (!session || !session.user) {
      throw new ErrorHandler("Not Authenticated", 400);
    }

  const { id, worker } = await req.json();
  if (!id) {
    throw new ErrorHandler("Enter Job ID", 400);
  }

  if (!worker) {
    throw new ErrorHandler("Where are Worker", 400);
  }

  const fJob = await Job.findById(id);
  if (!fJob) {
    throw new ErrorHandler("Invalid Job ID", 400);
  }

  const job = await Job.findByIdAndUpdate(
    id,
    {
      $pull: { workers: { _id: worker } },
    },
    { new: true },
  );


  return NextResponse.json(
    { success: true, message: "Job Updated Successfully" },
    { status: 200 },
  );
});
