"use client";

import { signInSchema } from "@/schemas/signIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);

    const respo = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (respo?.error) {
      toast.error(respo.error);
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
    toast.success("User Sign-In Successfully");
    router.replace("/dashboard");
  };
  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen bg-[rgb(68,35,22)]"
      style={{
        backgroundImage: `
      linear-gradient(rgba(70, 73, 81, 0.5) 1px, transparent 1px),
      linear-gradient(90deg, rgba(70, 73, 81, 0.5) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="w-[95%] max-w-md p-8 spcae-y-8 bg-[#F5EDD6] rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join <span className="text-[rgb(236,185,55)]">Hisab</span>-<span className="text-[rgb(187,135,3)]">Kitab</span>
          </h1>
          <p className="mb-4">Sign In to continue stress free calculation</p>
        </div>

        <div>
          <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <div className="flex gap-2">
                      <Input
                        {...field}
                        id="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Email ID"
                        autoComplete="off"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div>
                      <Input
                        {...field}
                        id="passwordemail"
                        type="password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Password"
                        autoComplete="off"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                className="cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" /> Please wait
                  </>
                ) : (
                  <>Sign In</>
                )}
              </Button>
            </FieldGroup>
          </form>
          <div>
            <p>
              Not a member?{" "}
              <Link
                href={`/sign-up`}
                className="text-blue-400 hover:text-blue-600 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
