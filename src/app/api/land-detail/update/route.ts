import dbConnect from "@/lib/dbConnect";
import { wrapAsync } from "@/utils/wrapAsync";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession, User } from "next-auth";
import ErrorHandler from "@/utils/errorHandler";
import LandDetailModel from "@/models/landDetail";

export const PUT = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    throw new ErrorHandler("Not Authenticated", 400);
  }

  const body = await req.json();
  const { id } = body;
  if (!id) throw new ErrorHandler("Provide land ID", 400);
  const newData = {
    owner: body?.owner,
    area: body?.area,
    money: body?.money,
    location: body?.location,
    status: body?.status,
  };

  const landDetail = await LandDetailModel.findOneAndUpdate(
    {
      $and: [{ _id: id }, { landAssignTo: user._id }],
    },
    newData,
    { new: true },
  );

  if (!landDetail) {
    throw new ErrorHandler("Failed to update land detail", 400);
  }

  return NextResponse.json(
    { success: true, message: "Land Detail updaeted successfully" },
    { status: 200 },
  );
});
