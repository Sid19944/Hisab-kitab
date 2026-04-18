import z from "zod";

export const landDetailSchema = z.object({
  owner: z.string().min(1,"Enter Land Owner Name"),
  location : z.string().min(1,"Enter Land Location"),
  area: z.number().min(1,"Enter Land Area"),
  money: z.number().min(100,"Enter Budget"),
  status: z.string(),
});
