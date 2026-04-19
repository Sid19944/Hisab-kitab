"use client";

import { Deduction } from "@/models/deduction";
import { LandDetail } from "@/models/landDetail";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";



type data = {
  deductions : Deduction[]
  lands: LandDetail[]
  workerId: string;
  worker : string;
  mobileNumber : number;
  workingDays : number;
  totalDays : number;
  totalLandMoney : number;
  totalDeduction : number
};

function page() {
  const [data, setData] = useState<data[]>([]);
  const { jobId } = useParams();

  useEffect(() => {
    axios
      .get(`/api/salary/get/${jobId}`)
      .then((res) => setData(res.data.workerWithAttendance))
      .catch((err) => {
        const axiosErr = err as AxiosError<ApiResponse>;
        toast.error(
          axiosErr.response?.data.message ??
            "Failed to add new Land to Current Job",
        );
      });
  }, []);

  console.log(data);
  const totalWorkingDays = data.reduce((sum, currVal) => {
    return sum + currVal.workingDays;
  }, 0);

  // console.log(totalWorkingDays);

  return (
    <div
      id="salary"
      className="p-3 flex-1 gap-4 flex flex-col bg-[#FFFFFF]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(180, 145, 19, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(180, 145, 19, 0.2) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      <div>
        <h1 className="text-3xl font-semibold">Salary Summary</h1>
        <p className="text-sm tracking-tight">
          Auto-calculated from attendance
        </p>
      </div>
      <div className="rounded-lg flex flex-col gap-1 ">
        <div className="text-sm flex flex-col bg-[#dbcfa6] p-2 rounded-lg gap-2 font-semibold">
          <div className="flex justify-between">
            <h1>
              {(data[0]?.totalLandMoney / totalWorkingDays).toFixed(2)} / Day
            </h1>
            <h1>Total Money : {data[0]?.totalLandMoney}</h1>
          </div>

          <h1>Working Days : {totalWorkingDays} Days</h1>
        </div>
        <div className="bg-[#efe4c1] p-2 hidden sm:grid sm:grid-cols-5 text-center rounded-lg">
          <h1 className="text-start">Worker</h1>
          <h1>Present</h1>
          <h1>Deduction</h1>
          <h1>Total</h1>
          <h1>Final</h1>
        </div>
        {data.map((d, idx) => (
          <div key={idx} className=" bg-[#FFFFFF] rounded-lg ">
            <div className="sm:hidden flex justify-between border-[1.5px] border-[#E8D5B0] py-2 px-1 rounded-t-lg">
              <h1 className="mr-3">{d.worker}</h1>
              <h1 className="mr-3">{d.workingDays} D</h1>
              <h1 className="mr-3 text-red-600">
                -{d.totalDeduction}
              </h1>
            </div>

            <div className="sm:hidden flex justify-between border-b-[1.5px] border-x-[1.5px] border-[#E8D5B0] p-1 rounded-b-lg">
              <h1 className="mr-3">
                Total :{" "}
                {(
                  (d.totalLandMoney / totalWorkingDays) *
                  d.workingDays
                ).toFixed(2)}
              </h1>
              <h1
                className={`mr-3 ${(d.totalLandMoney / totalWorkingDays) * d.workingDays - d.totalDeduction < 0 ? "text-red-600" : "text-green-600"} underline`}
              >
                Final :{" "}
                {(
                  (d.totalLandMoney / totalWorkingDays) * d.workingDays -
                  d.totalDeduction
                ).toFixed(2)}
              </h1>
            </div>

            <div className="hidden sm:grid sm:grid-cols-5 text-center">
              <h1 className="mr-3 text-start">{d.worker}</h1>
              <h1 className="mr-3">{d.workingDays} D</h1>
              <h1 className="mr-3 text-red-600">
                -{d.totalDeduction}
              </h1>
              <h1 className="mr-3">
                {(
                  (d.totalLandMoney / totalWorkingDays) *
                  d.workingDays
                ).toFixed(2)}
              </h1>
              <h1 className={`mr-3 ${(d.totalLandMoney / totalWorkingDays) * d.workingDays - d.totalDeduction < 0 ? "text-red-600" : "text-green-600"} underline`}>
                {(
                  (d.totalLandMoney / totalWorkingDays) * d.workingDays -
                  d.totalDeduction
                ).toFixed(2)}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
