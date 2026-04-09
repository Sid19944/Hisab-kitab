import dbConnect from "@/lib/dbConnect";
import WorkerModle from "@/models/worker";
import { nameSchema, numberSchema, workerSchema } from "@/schemas/worker";
import ErrorHandler from "@/utils/errorHandler";
import { wrapAsync } from "@/utils/wrapAsync";
import { NextRequest, NextResponse } from "next/server";
import z, { number } from "zod";

export const PUT = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const body = await req.json();
  const { id } = body;
  const newData = {
    teamLeader: body.teamLeader as string,
    name: body?.name as string,
    mobileNumber: body?.mobileNumber,
  };

  if (!id || !newData.teamLeader) {
    throw new ErrorHandler(
      `${id ? "Provide TeamLeader ID" : "Provide ID"}`,
      400,
    );
  }

  // Zod validation — only validate fields that exist
  const checkWorkerSchema =
    newData.name && newData.mobileNumber
      ? workerSchema.safeParse({
          teamLeader: newData.teamLeader,
          name: newData.name,
          mobileNumber: String(newData.mobileNumber),
        })
      : newData.name
        ? nameSchema.safeParse(newData.name)
        : numberSchema.safeParse(String(newData.mobileNumber));

  if (!checkWorkerSchema.success) {
    const formatted = checkWorkerSchema.error.format();

    const teamLeaderErr = formatted.teamLeader?._errors?.[0];
    const nameErr = formatted.name?._errors?.[0];
    const numberErr = formatted.mobileNumber?._errors?.[0];

    console.log(teamLeaderErr, nameErr, numberErr);
    throw new ErrorHandler(
      `${teamLeaderErr ?? nameErr ?? numberErr ?? "Invalid Data"}`,
      400,
    );
  }

  const worker = await WorkerModle.findByIdAndUpdate(id, {
    name: body?.name,
    mobileNumber: body.mobileNumber && Number(body?.mobileNumber),
  });

  if (worker?.teamLeader.toString() !== newData.teamLeader) {
    throw new ErrorHandler("This Worker is not under you", 400);
  }

  if (!worker) {
    throw new ErrorHandler("Invalid ID", 400);
  }

  return NextResponse.json(
    { success: true, message: "Worker detail update successfully" },
    { status: 200 },
  );
});
