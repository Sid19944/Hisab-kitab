"use client";

import { Deduction } from "@/models/deduction";
import { LandDetail } from "@/models/landDetail";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { Edit, IndianRupee, Plus, X } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, easeInOut, motion } from "framer-motion";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { Button } from "@/components/ui/button";
import { useJob } from "@/context/JobContext";

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

function page() {
  const [data, setData] = useState<data[]>([]);
  const [showDeduction, setShowDeduction] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [selectedWorker, setSelectedWorker] = useState("");
  const [workerId, setWorkerId] = useState("");
  const { selectedJob } = useJob();
  const [showEditDeduction, setShowEditDeduction] = useState(false);
  const amountRef = useRef<HTMLInputElement>(null);

  const WorkerWithAttendance = () => {
    axios
      .get(`/api/salary/get/${selectedJob}`)
      .then((res) => setData(res.data.workerWithAttendance))
      .catch((err) => {
        const axiosErr = err as AxiosError<ApiResponse>;
        toast.error(
          axiosErr.response?.data.message ??
            "Failed to add new Land to Current Job",
        );
      });
  };
  useEffect(() => {
    selectedJob && WorkerWithAttendance();
  }, [selectedJob]);

  useEffect(() => {
    if (showDeduction) {
      // small delay for animation to complete first
      setTimeout(() => {
        amountRef.current?.focus();
      }, 300);
    }
  }, [showDeduction]);

  const totalWorkingDays = data.reduce((sum, currVal) => {
    return sum + currVal.workingDays;
  }, 0);

  const clearData = () => {
    setShowDeduction(!showDeduction);
    setSelectedWorker("");
    setWorkerId("");
    setAmount(undefined);
    setDate(null);
    WorkerWithAttendance();
  };

  const handleAddDeduction = async () => {
    axios
      .post(`/api/deduction/add`, {
        job: selectedJob,
        workerId,
        amount,
        date,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        const axiosErr = err as AxiosError<ApiResponse>;
        toast.error(
          axiosErr.response?.data.message ??
            "Failed to add new Land to Current Job",
        );
      })
      .finally(() => {
        clearData();
      });
  };

  const deleteDeduction = async (id: string) => {
    axios
      .delete(`/api/deduction/delete/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        WorkerWithAttendance();
      })
      .catch((err) => {
        const axiosErr = err as AxiosError<ApiResponse>;
        toast.error(
          axiosErr.response?.data.message ??
            "Failed to add new Land to Current Job",
        );
      });
  };

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
        <div className="bg-[#efe4c1] p-2 hidden sm:grid sm:grid-cols-5 text-center rounded-lg font-semibold">
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
              <h1 className="mr-3 text-red-600 flex gap-1">
                -{d.totalDeduction}{" "}
                <Plus
                  className="rounded-full bg-red-200 active:bg-red-500"
                  onClick={() => {
                    setShowDeduction(!showDeduction);
                    setSelectedWorker(d.worker);
                    setWorkerId(d.workerId);
                  }}
                />
                <Edit
                  onClick={() => {
                    setShowEditDeduction(!showDeduction);
                    setSelectedWorker(d.worker);
                    setWorkerId(d.workerId);
                  }}
                />
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

            <div className="hidden sm:grid sm:grid-cols-5 text-center border-[1.5px] border-[#E8D5B0] p-1 rounded-lg">
              <h1 className="mr-3 text-start">{d.worker}</h1>
              <h1 className="mr-3">{d.workingDays} D</h1>
              <h1 className="mr-3 text-red-600 flex justify-center gap-1">
                -{d.totalDeduction}{" "}
                <Plus
                  className="rounded-full bg-red-200 active:bg-red-500"
                  onClick={() => {
                    setShowDeduction(!showDeduction);
                    setSelectedWorker(d.worker);
                    setWorkerId(d.workerId);
                  }}
                />
                <Edit
                  onClick={() => {
                    setShowEditDeduction(!showDeduction);
                    setSelectedWorker(d.worker);
                    setWorkerId(d.workerId);
                  }}
                />
              </h1>
              <h1 className="mr-3">
                {(
                  (d.totalLandMoney / totalWorkingDays) *
                  d.workingDays
                ).toFixed(2)}
              </h1>
              <h1
                className={`mr-3 ${(d.totalLandMoney / totalWorkingDays) * d.workingDays - d.totalDeduction < 0 ? "text-red-600" : "text-green-600"} underline`}
              >
                {(
                  (d.totalLandMoney / totalWorkingDays) * d.workingDays -
                  d.totalDeduction
                ).toFixed(2)}
              </h1>
            </div>
          </div>
        ))}
      </div>

      {/* Add Deduction div */}
      <AnimatePresence>
        {showDeduction && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: easeInOut }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-100 p-4 rounded-lg border border-gray-950 flex flex-col justify-center gap-2 w-[90%] sm:w-fit"
          >
            <X className="absolute right-2 top-2" onClick={clearData} />
            <h1 className="text-3xl text-center font-semibold mt-3">
              Add Deduction For
            </h1>
            <h1 className="text-xl font-semibold text-center">
              {selectedWorker.toUpperCase()}
            </h1>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <label htmlFor="amount" className="flex gap-1">
                  Amount <IndianRupee />
                </label>
                <input
                  type="number"
                  id="amount"
                  ref={amountRef}
                  className="border-2 border-amber-900 rounded-lg px-2 w-40"
                  defaultValue={amount}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setAmount(Number(e.target.value))
                  }
                />
              </div>
              {!amount && (
                <p className="text-sm text-red-500 text-center">
                  Enter Amount{" "}
                </p>
              )}
            </div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={date}
                onChange={(newDate) => setDate(newDate)}
              />
            </LocalizationProvider>
            <Button onClick={handleAddDeduction}>ADD</Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete deduction div */}
      <AnimatePresence>
        {showEditDeduction && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: easeInOut }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-100 p-4 rounded-lg border border-gray-950 flex flex-col justify-center gap-2 w-[90%] sm:w-fit"
          >
            <X
              className="absolute right-2 top-2"
              onClick={() => {
                setShowEditDeduction(!showEditDeduction);
                clearData();
              }}
            />
            <h1 className="text-3xl text-center font-semibold mt-3">
              Delete Deduction For
            </h1>
            <h1 className="text-xl font-semibold text-center">
              {selectedWorker.toUpperCase()}
            </h1>
            <div className="grid grid-cols-4 gap-2">
              {data
                .find((d) => d.workerId === workerId)
                ?.deductions.map((ded, idx) => (
                  <div
                    key={idx}
                    className="flex gap-1 border p-1 justify-around rounded-lg border-amber-800 text-red-500"
                  >
                    <h1>-{ded.amount}</h1>
                    <X onClick={() => deleteDeduction(ded._id)} />
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default page;
