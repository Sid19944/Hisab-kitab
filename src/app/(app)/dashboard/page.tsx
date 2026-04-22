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
import { useJob } from "@/context/JobContext";
import { Deduction } from "@/models/deduction";
import { LandDetail } from "@/models/landDetail";
import CountUp from "react-countup";

const jobSchema = z.object({
  jobName: z.string().min(1, "Enter Job Name"),
});

type data = {
  deductions: Deduction[];
  lands: LandDetail[];
  workerId: string;
  worker: string;
  mobileNumber: number;
  workingDays: number;
  totalDays: number;
  totalLandMoney: number;
  totalDeduction: number;
};

type Record = {
  date: Date;
  status?: number;
};

type AllAttendace = {
  _id: string;
  date: string;
  job: string;
  status: number;
  worker: string;
};

function page() {
  const [addJob, setAddjob] = useState(false);
  const { jobs, fetchJobs, selectedJob, setSelectedJob } = useJob();
  const [workerWithAttendance, setWorkerWithAttendance] = useState<data[]>([]);
  const [allAttendace, setAllAttendace] = useState<AllAttendace[]>([]);
  let presentToday = 0;
  let haltDayToday = 0;
  let absentToday = 0;

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

  const totalWorkingDays = workerWithAttendance.reduce((sum, currVal) => {
    return sum + currVal.workingDays;
  }, 0);

  useEffect(() => {
    selectedJob &&
      axios
        .get(`/api/salary/get/${selectedJob}`)
        .then((res) => setWorkerWithAttendance(res.data.workerWithAttendance))
        .catch((err) => {
          const axiosErr = err as AxiosError<ApiResponse>;
          toast.error(
            axiosErr.response?.data.message ??
              "Failed to add new Land to Current Job",
          );
        });

    selectedJob &&
      axios
        .get(`/api/attendance/todaysData/${selectedJob}`)
        .then((res) => setAllAttendace(res.data.today))
        .catch((err) => {
          const axiosErr = err as AxiosError<ApiResponse>;
          toast.error(
            axiosErr.response?.data.message ?? "Failed to Load Workers",
          );
        });
  }, [selectedJob]);

  allAttendace &&
    allAttendace.map((at) => {
      at.status == 1
        ? (presentToday += 1)
        : at.status == 0.5
          ? (haltDayToday += 1)
          : (absentToday += 1);
    });

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

      <div className="p-4 flex gap-5 flex-col ">
        <div className="flex justify-between flex-col gap-3 sm:flex-row">
          <div className="border border-[#E8D5B0] p-2 rounded-lg bg-[#FFFFFF] w-full flex flex-col justify-center">
            <CountUp
              className="text-2xl"
              end={workerWithAttendance.length}
              duration={2}
            />

            <h1>Total Worker</h1>
          </div>
          <div className="border border-[#E8D5B0] p-2 rounded-lg bg-[#FFFFFF] w-full flex flex-col justify-center">
            <h1 className="sm:text-xl text-green-600">
              {presentToday} Full Today
            </h1>
            <h1 className="sm:text-xl text-yellow-600">
              {haltDayToday} half day
            </h1>
            <h1 className="sm:text-xl text-red-600">{absentToday} absent</h1>
          </div>
          <div className="border border-[#E8D5B0] p-2 rounded-lg bg-[#FFFFFF] w-full flex flex-col justify-center">
            <CountUp
              className="text-2xl text-green-700"
              end={workerWithAttendance[0]?.totalLandMoney}
              duration={2}
            />
            <h1>Total Earning </h1>
            <h1 className="text-green-500">
              <CountUp
                end={Number(
                  (
                    workerWithAttendance[0]?.totalLandMoney / totalWorkingDays
                  ).toFixed(2),
                )}
                duration={2}
              />
              / Day
            </h1>
          </div>
        </div>

        <div className="rounded-t-lg">
          <ul className="flex text-sm sm:text-lg font-semibold justify-between p-2 border border-amber-800 rounded-t-lg">
            <li className="w-[35%]">WORKER</li>
            <div className="w-[70%] flex justify-around">
              <li>STATUS</li>
              <li>DAYS</li>
              <li>SALARY</li>
            </div>
          </ul>

          {workerWithAttendance.map((w, idx) => (
            <div
              className="flex justify-around p-2 border-x border-amber-700 border-b"
              key={idx}
            >
              <h1 className="text-start w-[35%]">{w.worker}</h1>
              <div className="w-[70%] flex justify-around">
                {allAttendace.find((at) => at.worker == w.workerId) ? (
                  <h1
                    className={`text-sm h-fit sm:text-lg tracking-tight sm:font-semibold ${allAttendace.find((at) => at.worker == w.workerId)?.status == 1 ? "text-green-700 px-3 rounded-lg bg-[#E5EBE7]" : allAttendace.find((at) => at.worker == w.workerId)?.status == 0.5 ? "text-yellow-700 px-3 rounded-lg bg-[#f6e8c7]" : "text-red-600 px-3 rounded-lg bg-[#FFEFEF]"}`}
                  >
                    {allAttendace.find((at) => at.worker == w.workerId)
                      ?.status == 1
                      ? "Present"
                      : allAttendace.find((at) => at.worker == w.workerId)
                            ?.status == 0.5
                        ? "Half"
                        : "Absent"}
                  </h1>
                ) : (
                  "Not Yet"
                )}

                <h1>{w.workingDays}</h1>
                <h1
                  className={`mr-3 ${(w.totalLandMoney / totalWorkingDays) * w.workingDays - w.totalDeduction < 0 ? "text-red-600" : "text-green-600"} underline`}
                >
                  {(
                    (w.totalLandMoney / totalWorkingDays) * w.workingDays -
                    w.totalDeduction
                  ).toFixed(2)}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
