import { NextRequest, NextResponse } from "next/server";
import { errorMiddleware } from "./errorHandler";

type Handler = (req: NextRequest, context: any) => Promise<NextResponse>;

export const wrapAsync = (fn: Handler): Handler => {
  return async (req: NextRequest, context: any) => {
    try {
      return await fn(req, context);
    } catch (error) {
      return errorMiddleware(error);
    }
  };
};
