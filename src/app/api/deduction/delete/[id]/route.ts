import dbConnect from "@/lib/dbConnect";
import ErrorHandler from "@/utils/errorHandler";
import { wrapAsync } from "@/utils/wrapAsync";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession, User } from "next-auth";
import deductionsModel from "@/models/deduction";

export const DELETE = wrapAsync(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
      throw new ErrorHandler("Not Authenticated", 400);
    }
    const {id} = await params

    if (!id) {
      throw new ErrorHandler("Prove The Id", 400);
    }

    const deduction = await deductionsModel.findByIdAndDelete(id);

    if (!deduction) {
      throw new ErrorHandler("Failed To delete, Try Again", 500);
    }

    return NextResponse.json(
      { success: true, message: "Deduction Delete" },
      { status: 201 },
    );
  },
);
