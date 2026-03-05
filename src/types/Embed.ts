import * as z from "zod";

export const Embed = z.object({
    title: z.string()
        .default("New Transaction"),
    description: z.string(),
    color: z.int()
        .default(1994162),
    footer: z.string(),
})