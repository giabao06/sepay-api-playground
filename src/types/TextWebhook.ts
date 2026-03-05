import * as z from "zod";

export const TextWebhook = z.object({
    username: z.string(),
    avatar_url: z.url().optional(),
    content: z.string(),
})
