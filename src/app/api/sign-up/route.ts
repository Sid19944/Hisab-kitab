import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import { signUpSchema } from "@/schemas/signUp";
import ErrorHandler from "@/utils/errorHandler";
import { sendVerificationEmail } from "@/utils/sendVerificationMail";
import { wrapAsync } from "@/utils/wrapAsync";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import z, { success } from "zod";

function FirstLetterUpperCase(str: string) {
  return str.at(0)?.toUpperCase() + str.substring(1);
}

export const POST = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const body = await req.json();
  const { firstName, lastName, email, password } = body;

  if (!firstName || !lastName || !email || !password) {
    throw new ErrorHandler("Please Provide All Details", 400);
  }

  const name =
    FirstLetterUpperCase(firstName) + " " + FirstLetterUpperCase(lastName);

  // Zod validation
  const checkSignUpSchema = signUpSchema.safeParse({ name, email, password });
  if (!checkSignUpSchema.success) {
    const formatted = checkSignUpSchema.error.format();
    const nameErr = formatted.name?._errors?.[0];
    const emailErr = formatted.email?._errors?.[0];
    const passwordErr = formatted.password?._errors?.[0];

    throw new ErrorHandler(
      `${nameErr ?? emailErr ?? passwordErr ?? "Invalid Input"}`,
      400,
    );
  }

  const userExist = await UserModel.findOne({ email });

  const verifyCode = Math.floor(100000 + Math.random() * 999999);
  const hashPass = await bcrypt.hash(password, 10);
  const verifyCodeExpiry = new Date(Date.now() + 5 * 60 * 1000);
  if (userExist) {
    if (userExist.isVerified) {
      throw new ErrorHandler("User Already Registered with this Email", 400);
    } else {
      userExist.name = name;
      userExist.password = hashPass;
      userExist.verifyCode = verifyCode;
      userExist.verifyCodeExpiry = verifyCodeExpiry;

      await userExist.save();
    }
  } else {
    const user = await UserModel.create({
      name,
      password: hashPass,
      email,
      verifyCode,
      verifyCodeExpiry,
    });

    if (!user) {
      throw new ErrorHandler("Error while creating user", 500);
    }
  }

  const emailResponse = await sendVerificationEmail(email, name, verifyCode);
  if (!emailResponse.success) {
    throw new ErrorHandler(emailResponse.message, 500);
  }

  return NextResponse.json(
    {
      success: true,
      message: "User Registered Successfully, Please verify your Email",
    },
    { status: 201 },
  );
});
