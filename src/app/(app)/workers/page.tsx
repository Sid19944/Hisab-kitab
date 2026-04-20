"use client";

import { workerSchema } from "@/schemas/worker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { Worker } from "@/models/worker";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";
import { useJob } from "@/context/JobContext";

function page() {
  const [addWorker, setAddWorker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workers, setWorkers] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (addWorker) {
      // small delay for animation to complete first
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [addWorker]);

  const { selectedJob, jobs, fetchJobs } = useJob();
  const form = useForm<z.infer<typeof workerSchema>>({
    resolver: zodResolver(workerSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      mobileNumber: "",
    },
  });

  // add Worker
  const handleAddWorker = async (data: z.infer<typeof workerSchema>) => {
    setIsSubmitting(true);
    setAddWorker(!addWorker);

    try {
      const result = await axios.post(`/api/worker/add`, data);
      toast.success(result.data.message);
    } catch (err) {
      const axiosErr = err as AxiosError<ApiResponse>;
      toast.error(axiosErr.response?.data.message ?? "Failed to Add Worker");
    }
    {
      form.reset();
      setIsSubmitting(false);
    }
  };

  // delete worker
  const handleDeleteWorker = async (workerId: string) => {
    console.log(typeof workerId);
    setIsSubmitting(true);
    try {
      const result = await axios.delete(`/api/worker/delete/${workerId}`);
      toast.success(result.data.message);
    } catch (err) {
      const axiosErr = err as AxiosError<ApiResponse>;
      toast.error(axiosErr.response?.data.message ?? "Failed to delete Worker");
    } finally {
      setIsSubmitting(false);
    }
  };

  // add worker to job
  const handleAddToJob = async (workerId: string) => {
    setIsSubmitting(true);
    try {
      const result = await axios.put(`/api/job/add-worker`, {
        id: selectedJob,
        worker: workerId,
      });

      const addToAttendace = await axios.post(`/api/attendance/add-or-update`, {
        job: selectedJob,
        worker: workerId,
      });

      toast.success(result.data.message);
    } catch (err) {
      const axiosErr = err as AxiosError<ApiResponse>;
      toast.error(
        axiosErr.response?.data.message ??
          "Failed to add Workers to Current Job",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveFromJob = async (workerId: string) => {
    setIsSubmitting(true);
    try {
      const result = await axios.put(`/api/job/remove-worker`, {
        id: selectedJob,
        worker: workerId,
      });
      // const delteFromAttendance = await axios.delete(
      //   `/api/attendance/${selectedJob}/delete/${workerId}`,
      // );
      toast.success(result.data.message);
    } catch (err) {
      const axiosErr = err as AxiosError<ApiResponse>;
      toast.error(axiosErr.response?.data.message ?? "Failed to Remove Worker");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`/api/worker/get-all-worker`);
        setWorkers(result.data.workers);
        fetchJobs();
      } catch (err) {
        const axiosErr = err as AxiosError<ApiResponse>;
        toast.error(
          axiosErr.response?.data.message ?? "Failed to Load Workers",
        );
      }
    })();
  }, [isSubmitting]);

  const findWorkerThatInCurrJob =
    jobs.filter((job) => job._id === selectedJob)[0]?.workers ?? [];

  return (
    <div
      id="addWorker"
      className={`flex-1 flex flex-col bg-[#FFFFFF]`}
      style={{
        backgroundImage: `linear-gradient(rgba(180, 145, 19, 0.2) 1px, transparent 1px),linear-gradient(90deg,rgba(180, 145, 19, 0.2) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    >
      <div className={`${addWorker && "opacity-[0.3]"}`}>
        <nav className="shadow-md bg-[#E2A364] flex justify-around font-mono tracking-tight items-center p-2">
          <h1 className="sm:text-3xl font-semibold ">All Workers</h1>

          <motion.div
            whileTap={{ y: 5 }}
            onClick={() => setAddWorker(!addWorker)}
            className="border cursor-pointer rounded-lg bg-[#2C1810] text-[#FFFFFF]  sm:text-2xl sm:p-3 px-1"
          >
            Add New Worker
          </motion.div>
        </nav>

        <div className="flex flex-wrap justify-center p-1 gap-2">
          {workers.map((worker: Worker, idx) => (
            <div
              key={idx}
              className="relative border w-fit px-6 py-3 rounded-lg bg-[#2C1810] text-[#E2A364]"
            >
              <X
                onClick={() => handleDeleteWorker(String(worker._id))}
                className="absolute right-1 top-1 text-red-500 cursor-pointer"
              />
              <div className="mt-3">
                <h1>{worker.name}</h1>
                <h1>{worker.mobileNumber}</h1>
              </div>

              {findWorkerThatInCurrJob.some(
                (w) => w.workerId === worker._id.toString(),
              ) ? (
                <motion.div
                  className="border mt-2 cursor-pointer border-red-500 rounded-lg bg-[#2C1810] text-[#FFFFFF] px-2 tex-sm blur-[0.4px]"
                  onClick={() => handleRemoveFromJob(String(worker._id))}
                >
                  Remove From Job
                </motion.div>
              ) : (
                <motion.div
                  whileTap={{ y: 5 }}
                  className="border mt-2 cursor-pointer rounded-lg bg-[#2C1810] text-[#FFFFFF] px-2 tex-sm"
                  onClick={() => handleAddToJob(String(worker._id))}
                >
                  Add to Job
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* add worker div */}
      <AnimatePresence>
        {addWorker && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: easeInOut }}
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
                onClick={() => setAddWorker(!addWorker)}
                style={{ scale: "1.2" }}
              />
              <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight rounded-lg text-[#e7e429]">
                Add New Worker
              </h1>
              <p className="text-[#FEFD99]">Fill in worker details below</p>
            </div>

            <form
              id="form-rhf-demo"
              onSubmit={form.handleSubmit(handleAddWorker)}
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
                        ref={inputRef}
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
                      <FieldLabel
                        htmlFor="mobileNumber"
                        className="text-[#FEFD99]"
                      >
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
                  className="cursor-pointer w-[40%] bg-blue-500"
                  disabled={isSubmitting}
                >
                  Add Worker
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default page;
