import { ObjectId } from "mongoose";
import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id: ObjectId;
  }
  interface Session {
    user: {
      _id: ObjectId;
    } & DefaultSession["user"];
  }
  interface jwt {
    _id: ObjectId;
  }
}
