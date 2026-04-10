import z from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid Email ID" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[a-z]/, "Must include lowercase")
    .regex(/[A-Z]/, "Must include uppercase")
    .regex(/\d/, "Must include number")
    .regex(/[^A-Za-z0-9]/, "Must include special character"),
});
