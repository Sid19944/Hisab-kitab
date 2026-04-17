import dbConnect from "@/lib/dbConnect";
import WorkerModle from "@/models/worker";
import ErrorHandler from "@/utils/errorHandler";
import { wrapAsync } from "@/utils/wrapAsync";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";

export const DELETE = wrapAsync(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    await dbConnect();

    const { id } = await params;

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
      throw new ErrorHandler("Not Authenticated", 400);
    }

    const worker = await WorkerModle.findByIdAndDelete(id);
    if (!worker) {
      throw new ErrorHandler("Invalid ID", 400);
    }

    return NextResponse.json(
      { success: true, message: "Worker Deleteed successfully" },
      { status: 200 },
    );
  },
);
