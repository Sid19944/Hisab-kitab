import dbConnect from "@/lib/dbConnect";
import WorkerModle from "@/models/worker";
import { workerSchema } from "@/schemas/worker";
import ErrorHandler from "@/utils/errorHandler";
import { wrapAsync } from "@/utils/wrapAsync";
import { NextRequest, NextResponse } from "next/server";

export const POST = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const body = await req.json();
  const { teamLeader, name, mobileNumber } = body;

  if (!name || !mobileNumber) {
    throw new ErrorHandler("Please Provide name and number", 400);
  }

  // zod validation
  const checkWorkerSchema = workerSchema.safeParse({
    teamLeader,
    name,
    mobileNumber: String(mobileNumber),
  });
  if (!checkWorkerSchema.success) {
    const formatted = checkWorkerSchema.error.format();

    const teamLeaderErr = formatted.teamLeader?._errors?.[0];
    const nameErr = formatted.name?._errors?.[0];
    const numberErr = formatted.mobileNumber?._errors?.[0];

    throw new ErrorHandler(
      `${teamLeaderErr ?? nameErr ?? numberErr ?? "Invalid Input"}`,
      400,
    );
  }

  const workerExist = await WorkerModle.findOne({
    $and: [{ name }, { mobileNumber: Number(mobileNumber) }],
  });

  if (workerExist) {
    throw new ErrorHandler("Worker already added with given data", 400);
  }

  const worker = await WorkerModle.create(body);
  if (!worker) {
    throw new ErrorHandler("Error while adding the worker", 500);
  }

  return NextResponse.json(
    { success: true, message: "Worker added successfully" },
    { status: 201 },
  );
});
