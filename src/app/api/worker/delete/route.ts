import dbConnect from "@/lib/dbConnect";
import WorkerModle from "@/models/worker";
import ErrorHandler from "@/utils/errorHandler";
import { wrapAsync } from "@/utils/wrapAsync";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const { id } = await req.json();

  const worker = await WorkerModle.findByIdAndDelete(id);
  if (!worker) {
    throw new ErrorHandler("Invalid ID", 400);
  }

  return NextResponse.json(
    { success: true, message: "Worker removed successfully" },
    { status: 200 },
  );
});
