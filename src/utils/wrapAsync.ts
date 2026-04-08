import { NextRequest, NextResponse } from "next/server";
import { errorMiddleware } from "./errorHandler";

type Handler = (req: NextRequest) => Promise<NextResponse>;

export const wrapAsync = (fn: Handler): Handler => {
  return async (req: NextRequest) => {
    try {
      return await fn(req);
    } catch (error) {
      return errorMiddleware(error);
    }
  };
};
