"use client";

import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { toast } from "sonner";

interface Job {
  _id: string;
  jobName: string;
  workers?: { _id: string; name: string; mobileNumber: number };
  completedDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  user: string;
}

interface JobContext {
  jobs: Job[];
  fetchJobs: () => void;
  selectedJob: string | undefined;
  setSelectedJob: (job: string) => void;
}

const JobContext = createContext<JobContext | undefined>(undefined);

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<string | undefined>(undefined);

  const fetchJobs = useCallback(() => {
    axios
      .get(`/api/job/get-all-job`)
      .then((res) => {
        setJobs(res.data.jobs);
        setSelectedJob(res.data.jobs[0]._id);
      })
      .catch((err) => {
        const axiosErr = err as AxiosError<ApiResponse>;
        toast.error(axiosErr.response?.data.message);
      });
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <JobContext.Provider
      value={{ jobs, fetchJobs, selectedJob, setSelectedJob }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJob() {
  const context = useContext(JobContext);
  if (!context) throw new Error("useJob must be used inside jobProvider");
  return context;
}
