import { ObjectId } from "mongoose";
import "next-auth";

declare module "next-auth" {
  interface User {
    _id?: ObjectId;
    isVerified?: boolean;
  }
  interface Session {
    user: {
      _id?: ObjectId;
      isVerified?: boolean;
    };
  }
  interface jwt {
    _id?: ObjectId;
    isVerified?: boolean;
  }
}
