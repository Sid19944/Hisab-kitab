"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { landDetailSchema } from "@/schemas/landDetail";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "sonner";
import { useJob } from "@/context/JobContext";
import { LandDetail } from "@/models/landDetail";

function page() {
  const [addLand, setAddLand] = useState(false);
  const [lands, setLands] = useState<LandDetail[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedJob } = useJob();
  const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (addLand) {
        // small delay for animation to complete first
        setTimeout(() => {
          inputRef.current?.focus();
        }, 300);
      }
    }, [addLand]);

  const form = useForm<z.infer<typeof landDetailSchema>>({
    resolver: zodResolver(landDetailSchema),
    mode: "onSubmit",
    defaultValues: {
      owner: "",
      location: "",
      area: 0,
      money: 0,
      status: "PENDING",
    },
  });

  // add new Land
  const onSubmit = async (data: z.infer<typeof landDetailSchema>) => {
    setIsSubmitting(true);
    setAddLand(false);
    try {
      const result = await axios.post(`/api/land-detail/add`, data);
      toast.success(result.data.message);
    } catch (err) {
      const axiosErr = err as AxiosError<ApiResponse>;
      toast.error(
        axiosErr.response?.data.message ??
          "Failed to add new Land to Current Job",
      );
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  };

  const handleDeleteLand = async (landId: string) => {
    setIsSubmitting(true);
    try {
      const result = await axios.delete(`/api/land-detail/delete/${landId}`);
      toast.success(result.data.message);
    } catch (err) {
      const axiosErr = err as AxiosError<ApiResponse>;
      toast.error(axiosErr.response?.data.message ?? "Failed to Delete land");
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  };

  const handleRemoveFromJob = async (landId: string) => {
    setIsSubmitting(true);
    try {
      const result = await axios.put(`/api/land-detail/update`, {
        id: landId,
        job: "",
      });
      toast.success(result.data.message);
    } catch (err) {
      const axiosErr = err as AxiosError<ApiResponse>;
      toast.error(
        axiosErr.response?.data.message ??
          "Failed to add new Land to Current Job",
      );
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  };

  const handleAddToJob = async (landId: string) => {
    setIsSubmitting(true);
    try {
      const result = await axios.put(`/api/land-detail/update`, {
        id: landId,
        job: selectedJob,
      });
      toast.success(result.data.message);
    } catch (err) {
      const axiosErr = err as AxiosError<ApiResponse>;
      toast.error(
        axiosErr.response?.data.message ?? "Failed to Update to Current Job",
      );
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  };

  useEffect(() => {
    axios
      .get(`/api/land-detail/get-all`)
      .then((res) => {
        setLands(res.data.lands);
      })
      .catch((err) => {
        const axiosErr = err as AxiosError<ApiResponse>;
        toast.error(
          axiosErr.response?.data.message ?? "Failed to delete Worker",
        );
      });
  }, [isSubmitting]);

  return (
    <div
      id="land-detail"
      className={`flex-1 flex flex-col bg-[#FFFFFF]`}
      style={{
        backgroundImage: `linear-gradient(rgba(180, 145, 19, 0.2) 1px, transparent 1px),linear-gradient(90deg,rgba(180, 145, 19, 0.2) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    >
      <nav className="shadow-md bg-[#E2A364] flex justify-around font-mono tracking-tight items-center p-2">
        <h1 className="sm:text-2xl font-semibold ">All Lands</h1>

        <motion.div
          whileTap={{ y: 5 }}
          onClick={() => setAddLand(!addLand)}
          className="border cursor-pointer rounded-lg bg-[#2C1810] text-[#FFFFFF]  sm:text-2xl sm:px-3 px-1"
        >
          Add New Land
        </motion.div>
      </nav>

      <div className="flex flex-wrap justify-center p-1 gap-2">
        {lands.map((land: LandDetail, idx) => (
          <div
            key={idx}
            className="relative border w-fit px-6 py-3 rounded-lg bg-[#2C1810] text-[#E2A364]"
          >
            <X
              onClick={() => handleDeleteLand(land._id.toString())}
              className="absolute right-1 top-1 text-red-500 cursor-pointer"
            />
            <div className="mt-3">
              <div className="flex gap-2 justify-between border-b border-[rgba(146,167,200,0.5)]">
                <h1>Land Owner :</h1>
                <h1>{land.owner}</h1>
              </div>

              <div className="flex gap-2 justify-between border-b border-[rgba(146,167,200,0.5)]">
                <h1>Location :</h1>
                <h1>{land.location}</h1>
              </div>

              <div className="flex gap-2 justify-between border-b border-[rgba(146,167,200,0.5)]">
                <h1>Acers :</h1>
                <h1>{land.area}</h1>
              </div>
              <div className="flex gap-2 justify-between border-b border-[rgba(146,167,200,0.5)]">
                <h1>Budget :</h1>
                <h1>{land.money}</h1>
              </div>
              {/* <h1>{land._id.toString()}</h1> */}
            </div>

            {land.job === selectedJob ? (
              <motion.div
                className="border mt-2 cursor-pointer rounded-lg bg-[#2C1810] text-[#FFFFFF] px-2 tex-sm blur-[0.6px] border-red-500"
                onClick={() => handleRemoveFromJob(land._id.toString())}
              >
                Remove from Job
              </motion.div>
            ) : (
              <motion.div
                whileTap={{ y: 5 }}
                className="border mt-2 cursor-pointer rounded-lg bg-[#2C1810] text-[#FFFFFF] px-2 tex-sm"
                onClick={() => handleAddToJob(String(land._id))}
              >
                Add to Job
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* add new land div */}
      <AnimatePresence>
        {addLand && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: easeInOut }}
            className="border p-10 bg-[#2C1810] rounded-lg text-[] w-[95%] sm:max-w-[60%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-2 shadow-lg"
            style={{
              backgroundImage: `linear-gradient(rgba(180, 145, 19, 0.2) 1px, transparent 1px),linear-gradient(90deg, rgba(180, 145, 19, 0.2) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          >
            <div>
              <X
                className="text-white absolute top-[2%] right-[2%] cursor-pointer"
                onClick={() => setAddLand(!addLand)}
                style={{ scale: "1.2" }}
              />
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight rounded-lg text-[#e7e429] text-center">
                Add New Land
              </h1>
              <p className="text-[#FEFD99]">Fill in Land details below</p>
            </div>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="py-5 flex flex-col "
            >
              <FieldGroup>
                {/* <div className="flex gap-2 flex-col"> */}
                <Controller
                  name="owner"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="owner" className="text-[#FEFD99]">
                        Owner Name
                      </FieldLabel>
                      <Input
                        {...field}
                        id="owner"
                        ref={inputRef}
                        placeholder="Enter Land Owner Name"
                        className="bg-[#FFFFFF]"
                        autoComplete="off"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="location"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="location" className="text-[#FEFD99]">
                        Location
                      </FieldLabel>
                      <Input
                        {...field}
                        id="location"
                        placeholder="Village / City"
                        className="bg-[#FFFFFF]"
                        autoComplete="off"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                {/* </div> */}
                <div className="flex gap-2 sm:flex-row flex-col">
                  <Controller
                    name="area"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="area" className="text-[#FEFD99]">
                          Area (acres)
                        </FieldLabel>
                        <Input
                          {...field}
                          id="area"
                          type="number"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          placeholder="Enter Area of Land"
                          className="bg-[#FFFFFF]"
                          autoComplete="off"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="money"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="money" className="text-[#FEFD99]">
                          Total Budget ( ₹ )
                        </FieldLabel>
                        <Input
                          {...field}
                          id="money"
                          type="number"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          placeholder="Enter Money for Work"
                          className="bg-[#FFFFFF]"
                          autoComplete="off"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="status"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="status" className="text-[#FEFD99]">
                          Status
                        </FieldLabel>
                        <NativeSelect
                          className="bg-[#FFFFFF] rounded-lg"
                          {...field}
                          onChange={(e) => field.onChange(e)}
                        >
                          <NativeSelectOption value="PENDING">
                            Pending
                          </NativeSelectOption>
                          <NativeSelectOption value="IN_PROGRESS">
                            Under-Process
                          </NativeSelectOption>
                          <NativeSelectOption value="COMPLETED">
                            Completed
                          </NativeSelectOption>
                          <NativeSelectOption value="CANCELED">
                            Canceled
                          </NativeSelectOption>
                        </NativeSelect>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </FieldGroup>
              <div className="flex justify-around items-center mt-8">
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
                  Add Land
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
