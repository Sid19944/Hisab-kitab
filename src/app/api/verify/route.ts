import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import ErrorHandler from "@/utils/errorHandler";
import { wrapAsync } from "@/utils/wrapAsync";
import { NextRequest, NextResponse } from "next/server";

export const PUT = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const { code, email } = await req.json();

  console.log(typeof(code),email)

  if (!code) {
    throw new ErrorHandler("Please Enter Verification Code", 400);
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ErrorHandler("Invalid Email ID", 400);
  }

  if (user.verifyCode !== code) {
    throw new ErrorHandler("Invalid OTP", 400);
  }

  user.isVerified = true;
  await user.save();

  return NextResponse.json(
    { success: false, message: "Verification Successfull" },
    { status: 200 },
  );
});
