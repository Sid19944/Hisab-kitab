import dbConnect from "@/lib/dbConnect";
import TeamLeaderModel from "@/models/teamLeader";
import { signUpSchema } from "@/schemas/signUp";
import ErrorHandler from "@/utils/errorHandler";
import { wrapAsync } from "@/utils/wrapAsync";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

export const POST = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const body = await req.json();
  const { name, email, password } = body;
  if (!name || !email || !password) {
    throw new ErrorHandler("Please Provide All Details", 400);
  }

  // zod validation
  const checkSignUpSchema = signUpSchema.safeParse(body);
  if (!checkSignUpSchema.success) {
    const formatted = checkSignUpSchema.error.format();

    const nameError = formatted.name?._errors?.[0];
    const emailErr = formatted.email?._errors?.[0];
    const passwordErr = formatted.password?._errors?.[0];

    throw new ErrorHandler(
      `${nameError ?? emailErr ?? passwordErr ?? "Invalid Input"}`,
      400,
    );
  }

  const userExist = await TeamLeaderModel.findOne({email})
  if(userExist){
    throw new ErrorHandler("User alreay registered with this Email ID",400)
  }

  const hashPass = await bcrypt.hash(password,10);
  const 
});
