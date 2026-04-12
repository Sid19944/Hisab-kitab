"use client";

import { workerSchema } from "@/schemas/worker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { easeInOut, motion } from "framer-motion";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof workerSchema>>({
    resolver: zodResolver(workerSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      mobileNumber: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof workerSchema>) => {
    setIsSubmitting(true);

    console.log(data);
  };
  return (
    <div
      id="addWorker"
      className="flex-1 flex flex-col justify-center items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(180, 145, 19, 0.2) 1px, transparent 1px),linear-gradient(90deg,rgba(180, 145, 19, 0.2) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: easeInOut }}
        className="border w-[95%] sm:w-fit p-10 rounded-lg shadow-lg bg-[#2C1810]"
        style={{
          backgroundImage: `linear-gradient(rgba(180, 145, 19, 0.2) 1px, transparent 1px),linear-gradient(90deg,rgba(180, 145, 19, 0.2) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      >
        <div>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight rounded-lg text-[#e7e429]">
            Add New Worker
          </h1>
          <p className="text-[#FEFD99]">Fill in worker details below</p>
        </div>

        <form
          id="form-rhf-demo"
          onSubmit={form.handleSubmit(onSubmit)}
          className="py-5 flex flex-col gap-5"
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name" className="text-[#FEFD99]">
                    Worker Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Worker Name"
                    autoComplete="off"
                    className="bg-[#FFFFFF]"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="mobileNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="mobileNumber" className="text-[#FEFD99]">
                    Mobile Number
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    id="mobileNumber"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Worker's Mobile Number"
                    autoComplete="off"
                    className="bg-[#FFFFFF]"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <div className="flex justify-around items-center">
            <Button
              onClick={() => form.reset()}
              type="reset"
              className="cursor-pointer w-[40%]"
              variant="outline"
            >
              Clear
            </Button>
            <Button
              type="submit"
              className="cursor-pointer w-[40%]"
              disabled={isSubmitting}
            >
              Add Worker
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default page;
