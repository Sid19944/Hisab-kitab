import dbConnect from "@/lib/dbConnect";
import { wrapAsync } from "@/utils/wrapAsync";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import ErrorHandler from "@/utils/errorHandler";
import LandDetailModel from "@/models/landDetail";

export const DELETE = wrapAsync(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
      throw new ErrorHandler("Not Authenticated", 400);
    }
    const { id } = await params;

    if (!id) {
      throw new ErrorHandler("Provide Land ID", 400);
    }

    const fLandDetail = await LandDetailModel.findByIdAndDelete(id);
    if (!fLandDetail) {
      throw new ErrorHandler("Invalid Land ID", 400);
    }

    return NextResponse.json(
      { success: true, message: "Land Detail Deleted Successfully" },
      { status: 200 },
    );
  },
);
