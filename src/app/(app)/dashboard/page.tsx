"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";
import { Job } from "@/models/job";
import { useJob } from "@/context/JobContext";

const jobSchema = z.object({
  jobName: z.string().min(1, "Enter Job Name"),
});

function page() {
  const [addJob, setAddjob] = useState(false);
  const { jobs, fetchJobs, selectedJob, setSelectedJob } = useJob();

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    mode: "onSubmit",
    defaultValues: {
      jobName: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof jobSchema>) => {
    try {
      const result = await axios.post(`/api/job/create`, {
        jobName: data.jobName,
      });
      toast.success(result.data.message);
      fetchJobs();
    } catch (err) {
      const axiosErr = err as AxiosError<ApiResponse>;
      toast.error(axiosErr.response?.data.message ?? "Failed to Create Job");
    } finally {
      form.reset();
    }
  };

  return (
    <div className="flex-1 bg-[#FFFDF5]">
      <nav className="flex border justify-end gap-1 items-center p-2 flex-col sm:flex-row">
        <div className="flex items-center gap-2">
          <h1>Selete Job</h1>
          <Select
            value={selectedJob}
            onValueChange={(val) => setSelectedJob(val)}
          >
            <SelectTrigger className="w-fit max-w-48">
              <SelectValue placeholder="Select a Job" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Jobs</SelectLabel>
                {jobs.map((job) => (
                  <SelectItem key={job._id} value={job._id}>
                    {job.jobName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <motion.div
          whileTap={{ y: 5 }}
          className="border cursor-pointer rounded-lg bg-[#2C1810] text-[#FFFFFF] px-2"
          onClick={() => setAddjob(!addJob)}
        >
          Add New Job
        </motion.div>
      </nav>

      <AnimatePresence>
        {addJob && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="border w-[95%] sm:w-fit p-10 rounded-lg shadow-lg bg-[#2C1810] z-2"
            style={{
              backgroundImage: `linear-gradient(rgba(180, 145, 19, 0.2) 1px, transparent 1px),linear-gradient(90deg,rgba(180, 145, 19, 0.2) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
              position: "absolute",
              left: "50%",
              top: "50%",
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <div>
              <X
                className="text-white absolute top-[2%] right-[2%] cursor-pointer"
                onClick={() => setAddjob(!addJob)}
                style={{ scale: "1.2" }}
              />
              <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight rounded-lg text-[#e7e429]">
                Add New Job
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
                  name="jobName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name" className="text-[#FEFD99]">
                        Job Name
                      </FieldLabel>
                      <Input
                        {...field}
                        id="name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Job Name"
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
                  className="cursor-pointer w-[40%] bg-blue-500"
                  onClick={() => {
                    setAddjob(!addJob);
                  }}
                >
                  Add Job
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-2 flex gap-2 flex-col">
        <div className="flex justify-around">
          <div className="border border-[#E8D5B0] w-[30%] p-2 rounded-lg bg-[#FFFFFF]">
            <h1>12</h1>
            <h1>Total </h1>
            <h1>2 </h1>
          </div>
          <div className="border border-[#E8D5B0] w-[30%] p-2 rounded-lg bg-[#FFFFFF]">
            <h1>12</h1>
            <h1>Total </h1>
            <h1>2 </h1>
          </div>
          <div className="border border-[#E8D5B0] w-[30%] p-2 rounded-lg bg-[#FFFFFF]">
            <h1>12</h1>
            <h1>Total </h1>
            <h1>2 </h1>
          </div>
        </div>

        <div className="rounded-t-lg">
          <ul className="flex justify-between p-2 border border-amber-800 rounded-t-lg">
            <li className="w-[40%]">WORKER</li>
            <div className="w-[60%] flex justify-around">
              <li>STATUS</li>
              <li>DAYS</li>
              <li>SALARY</li>
            </div>
          </ul>

          <div className="flex justify-around p-2 border-x border-amber-700 border-b">
            <h1 className="text-start w-[40%]">Siddharth Sarkar</h1>
            <div className="w-[60%] flex justify-around">
              <h1>STATUS</h1>
              <h1>20 </h1>
              <h1>50000</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
