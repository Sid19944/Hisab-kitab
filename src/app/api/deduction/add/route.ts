import dbConnect from "@/lib/dbConnect";
import ErrorHandler from "@/utils/errorHandler";
import { wrapAsync } from "@/utils/wrapAsync";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession, User } from "next-auth";
import deductionsModel from "@/models/deduction";

export const POST = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    throw new ErrorHandler("Not Authenticated", 400);
  }

  const body = await req.json();
  const { job, workerId, amount, date } = body;

  if (!job || !workerId || !amount || !date) {
    throw new ErrorHandler("Prove All Detail", 400);
  }

  const today = new Date(date);

  // const alreadyForToday = await deductionsModel.findOne({
  //   $and: [
  //     { job },
  //     { worker: workerId },
  //     { date: today },
  //   ],
  // });

  // // console.log(alreadyForToday)

  // if (alreadyForToday) {
  //   throw new ErrorHandler("Entery Alredy for Today, try update", 400);
  // }

  const deduction = await deductionsModel.create({
    job,
    worker: workerId,
    amount,
    date: today,
  });

  if (!deduction) {
    throw new ErrorHandler("Failed To Create, Try Again", 500);
  }

  return NextResponse.json(
    { success: true, message: "Deduction added" },
    { status: 201 },
  );
});
