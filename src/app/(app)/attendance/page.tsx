"use client";

import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Worker } from "@/models/worker";
import { useJob } from "@/context/JobContext";

type Record = {
  date: Date;
  status?: number;
};

type AllAttendace = {
  _id: string;
  totalDays: string;
  attendanceRecord: Record[];
  WorkerDetail: Worker;
};

function page() {
  const { selectedJob } = useJob();
  const [allAttendace, setAllAttendace] = useState<AllAttendace[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addAttendance = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    setIsSubmitting(true);
    await axios
      .post(`/api/attendance/add-or-update`, {
        job: selectedJob,
        status: Number(e.target.value),
        worker: id,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsSubmitting(false);
      })
      .catch((err) => {
        const axiosErr = err as AxiosError<ApiResponse>;
        toast.error(
          axiosErr.response?.data.message ?? "Failed to Load Workers",
        );
        setIsSubmitting(false);
      });
  };

  // fetch all attendance
  useEffect(() => {
    const getAttendance = axios
      .get(`/api/attendance/get-all`)
      .then((res) => setAllAttendace(res.data.allAttendance))
      .catch((err) => {
        const axiosErr = err as AxiosError<ApiResponse>;
        toast.error(
          axiosErr.response?.data.message ?? "Failed to Load Workers",
        );
      });
  }, [isSubmitting]);

  // console.log(allAttendace)

  return (
    <div
      id="attendace"
      className="flex-1 bg-[#efece2] p-2"
      style={{
        backgroundImage: `linear-gradient(rgba(180, 145, 19, 0.2) 1px, transparent 1px),linear-gradient(90deg,rgba(180, 145, 19, 0.2) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="my-3 sticky top-12 bg-[#efece2] py-0.5 border-b border-[#9a4f21] rounded-lg px-1">
        <h1 className="text-3xl font-semibold">Mark Attendance</h1>
        <p className="text-sm text-[#ac8d7a]">Today's attendance</p>
      </div>

      <div className="border rounded-lg border-[#9a4f21]">
        <nav className="bg-[#eacd76] p-2 rounded-t-lg flex justify-around items-center font-mono text-[#907869] font-semibold tracking-tight">
          <h1 className="w-[45%] sm:w-[40%]">WORKER</h1>
          <div className="flex w-[55%] sm:w-[60%] justify-around">
            <h1>FULL</h1>
            <h1>HALF</h1>
            <h1>ABSENT</h1>
          </div>
        </nav>

        {allAttendace.map((at, idx) => (
          <div
            key={idx}
            className="border-t border-[#9a4f21] flex justify-between p-2"
          >
            
            <h1 className="w-[45%] sm:w-[40%] sm:font-semibold tracking-tight">
              {at.WorkerDetail.name.toUpperCase()}
            </h1>
            <div className="flex w-[55%] sm:w-[60%] justify-around">
              <input
                type="radio"
                name={at._id}
                value={1}
                checked={
                  new Date(
                    at.attendanceRecord[at.attendanceRecord.length - 1].date,
                  ).getTime() === new Date(new Date()).setUTCHours(0, 0, 0, 0) &&
                  at.attendanceRecord[at.attendanceRecord.length - 1].status ===
                    1
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  addAttendance(e, at._id)
                }
              />
              <input
                type="radio"
                name={at._id}
                value={0.5}
                checked={
                  new Date(
                    at.attendanceRecord[at.attendanceRecord.length - 1].date,
                  ).getTime() === new Date(new Date()).setUTCHours(0, 0, 0, 0) &&
                  at.attendanceRecord[at.attendanceRecord.length - 1].status ===
                    0.5
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  addAttendance(e, at._id)
                }
              />
              <input
                type="radio"
                name={at._id}
                value={0}
                checked={
                  new Date(
                    at.attendanceRecord[at.attendanceRecord.length - 1].date,
                  ).getTime() === new Date(new Date()).setUTCHours(0, 0, 0, 0) &&
                  at.attendanceRecord[at.attendanceRecord.length - 1].status ===
                    0
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  addAttendance(e, at._id)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
