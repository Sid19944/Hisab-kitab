import { z } from "zod";

export const nameSchema = z.string().min(1, "Enter Name");

export const numberSchema = z
  .string()
  .length(10, "Please Enter 10 Digit")
  .regex(/^[6-9]\d{9}$/, "Enter a valid Indian mobile number");

export const workerSchema = z.object({
  name: nameSchema,
  mobileNumber: numberSchema,
});
