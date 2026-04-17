import { ObjectId } from "mongoose";
import "next-auth";

declare module "next-auth" {
  interface User {
    _id?: ObjectId | string;
    isVerified?: boolean;
  }
  interface Session {
    user: {
      _id?: ObjectId | string;
      isVerified?: boolean;
    };
  }
  interface jwt {
    _id?: ObjectId | string;
    isVerified?: boolean;
  }
}
