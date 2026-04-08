import { NextResponse } from "next/server";

class ErrorHandler extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err: unknown) => {
  let message = "Internal Server Error";
  let statusCode = 500;

  if (err instanceof ErrorHandler) {
    message = err.message;
    statusCode = err.statusCode;
  } else if (err instanceof Error) {
    const mongoErr = err as Error & {
      errors?: Record<string, { message: string }>;
    };
    message = mongoErr.errors
      ? Object.values(mongoErr.errors)
          .map((e) => e.message)
          .join(",")
      : mongoErr.message;
  }

  return NextResponse.json({ success: false, message }, { status: statusCode });
};

export default ErrorHandler;
