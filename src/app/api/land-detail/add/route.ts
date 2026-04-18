import dbConnect from "@/lib/dbConnect";
import { wrapAsync } from "@/utils/wrapAsync";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import ErrorHandler from "@/utils/errorHandler";
import { landDetailSchema } from "@/schemas/landDetail";
import LandDetailModel from "@/models/landDetail";

export const POST = wrapAsync(async (req: NextRequest) => {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    throw new ErrorHandler("Not Authenticated", 400);
  }

  const body = await req.json();
  console.log(body)
  const { owner, location, area, money, status } = body;

  if (!owner || !location || !area || !money || !status ) {
    throw new ErrorHandler("Please Provide All Details", 400);
  }

  const data = {
    owner,
    location,
    area,
    money,
    status,
    landAssignTo : user._id,
  };

  // zod validation
  const checkLandValidate = landDetailSchema.safeParse(body);
  if (!checkLandValidate.success) {
    const formatted = checkLandValidate.error.format();

    const ownerErr = formatted.owner?._errors?.[0];
    const locationErr = formatted.location?._errors?.[0];
    const areaErr = formatted.area?._errors?.[0];
    const moneyErr = formatted.money?._errors?.[0];
    const statusErr = formatted.status?._errors?.[0];

    throw new ErrorHandler(
      `${ownerErr ?? locationErr ?? areaErr ?? moneyErr ?? statusErr ?? "Invalid Input"}`,
      400,
    );
  }

  const landDetail = await LandDetailModel.create(data);
  if (!landDetail) {
    throw new ErrorHandler("Error to add land detail", 400);
  }

  return NextResponse.json(
    { success: true, message: "Land Detail Added Successfully" },
    { status: 201 },
  );
});
