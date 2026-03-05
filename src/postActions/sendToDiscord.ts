import WebhookConfig from "../WebhookConfig";
import {TextWebhook} from "../types/TextWebhook";
import { Embed, EmbedFooter } from "../types/Embed";
import { EmbedWebhook } from "../types/EmbedWebhook";
import { PayloadObject } from "../types/SepayApiPayload";
import * as z from "zod";

export async function sendToDiscord(payload: z.infer<typeof PayloadObject>): Promise<Response | undefined> {
    const paymentData = PayloadObject.parse(payload);
    if (paymentData) {
        if (WebhookConfig.webhookType == "text") {
            const webhookData = TextWebhook.parse({
                    username: WebhookConfig.username,
                    content: `Received ${paymentData.transferAmount} VND with content: ${paymentData.content}`
                });
                console.log(`webhook data: ${JSON.stringify(webhookData)}`);
                if (process.env.WEBHOOK_URL) {
                    return await fetch(process.env.WEBHOOK_URL, {
                        method: "POST",
                        body: JSON.stringify(webhookData),
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                }
        } else if (WebhookConfig.webhookType == "embed") {
            const embeds = [
                Embed.parse({
                    description: `Received: \`${paymentData.transferAmount}\` VND\nContent: ${paymentData.content}`,
                    footer: EmbedFooter.parse({
                        text: "Webhook in development <(\")"
                    })
                })
            ]
            const webhookData = EmbedWebhook.parse({
                username: WebhookConfig.username,
                embeds: embeds,
            })
            console.log(`webhook data: ${JSON.stringify(webhookData)}`);
            if (process.env.WEBHOOK_URL) {
                return await fetch(process.env.WEBHOOK_URL, {
                    method: "POST",
                    body: JSON.stringify(webhookData),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            }
        } else throw new Error("Invalid webhook type")
    } else throw new Error("malformed payment data")
    return undefined;
}