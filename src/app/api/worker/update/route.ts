import dbConnect from "@/lib/dbConnect";
import WorkerModle from "@/models/worker";
import { nameSchema, numberSchema, workerSchema } from "@/schemas/worker";
import ErrorHandler from "@/utils/errorHandler";
import { wrapAsync } from "@/utils/wrapAsync";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z, { number } from "zod";
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
  const newData = {
    name: body?.name as string,
    mobileNumber: body?.mobileNumber,
  };

  if (!id) {
    throw new ErrorHandler(`"Provide ID"`, 400);
  }

  // Zod validation — only validate fields that exist
  const checkWorkerSchema =
    newData.name && newData.mobileNumber
      ? workerSchema.safeParse({
          teamLeader: user._id,
          name: newData.name,
          mobileNumber: String(newData.mobileNumber),
        })
      : newData.name
        ? nameSchema.safeParse(newData.name)
        : numberSchema.safeParse(String(newData.mobileNumber));

  if (!checkWorkerSchema.success) {
    const formatted = checkWorkerSchema.error.format();

    const nameErr = formatted.name?._errors?.[0];
    const numberErr = formatted.mobileNumber?._errors?.[0];

    console.log(nameErr, numberErr);
    throw new ErrorHandler(`${nameErr ?? numberErr ?? "Invalid Data"}`, 400);
  }

  const worker = await WorkerModle.findByIdAndUpdate(id, {
    name: body?.name,
    mobileNumber: body.mobileNumber && Number(body?.mobileNumber),
  });

  if (worker?.teamLeader.toString() !== user._id) {
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
