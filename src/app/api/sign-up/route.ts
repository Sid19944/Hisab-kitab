import dbConnect from "@/lib/dbConnect";
import TeamLeaderModel from "@/models/teamLeader";
import { signUpSchema } from "@/schemas/signUp";
import ErrorHandler from "@/utils/errorHandler";
import { sendVerificationEmail } from "@/utils/sendVerificationMail";
import { wrapAsync } from "@/utils/wrapAsync";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


function ToUpperCase(str: string) {
  return str.at(0)?.toUpperCase() + str.substring(1);
}

export const POST = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const body = await req.json();
  const { firstName, lastName, email, password } = body;

  if (!firstName || !lastName || !email || !password) {
    throw new ErrorHandler("Please Provide All Details", 400);
  }

  const name = ToUpperCase(firstName) + " " + ToUpperCase(lastName);

  // zod validation
  const checkSignUpSchema = signUpSchema.safeParse({ name, email, password });
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

  const userExist = await TeamLeaderModel.findOne({ email });
  if (userExist) {
    throw new ErrorHandler("User alreay registered with this Email ID", 400);
  }

  const verifyCode: number = Math.ceil(100000 + Math.random() * 999999);
  console.log(verifyCode);
  const hashPass = await bcrypt.hash(password, 10);
  const verifyCodeExpiry = new Date(Date.now() + 5 * 60 * 1000);

//   const user = await TeamLeaderModel.create({
//     name,
//     email,
//     password: hashPass,
//     verifyCode,
//     verifyCodeExpiry,
//   });

  const emailResponse = await sendVerificationEmail(email, name, verifyCode);
  if(!emailResponse.success){
    toast
    throw new ErrorHandler(emailResponse.message, 500)
  }



  return NextResponse.json({ success: true, message: "" }, { status: 200 });
});
