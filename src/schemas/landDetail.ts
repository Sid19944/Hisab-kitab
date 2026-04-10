import z from "zod";

export const landDetailSchema = z.object({
  owner: z.string(),
  location : z.string(),
  area: z.number(),
  money: z.number().min(100),
  status: z.string(),
});
