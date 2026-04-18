import dbConnect from "@/lib/dbConnect";
import { wrapAsync } from "@/utils/wrapAsync";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import ErrorHandler from "@/utils/errorHandler";
import LandDetailModel from "@/models/landDetail";

export const GET = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    throw new ErrorHandler("Not Authenticated", 400);
  }

  const lands = await LandDetailModel.find({
    landAssignTo: user._id,
  });

  return NextResponse.json(
    { success: true, message: "All Land Fetched", lands },
    { status: 200 },
  );
});
