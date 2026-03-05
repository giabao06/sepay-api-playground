import * as z from "zod";
import { Embed } from "./Embed";

export const EmbedWebhook = z.object({
    username: z.string(),
    avatar_url: z.string().nullable(),
    embeds: [Embed],
})