import {Elysia, Context, status} from "elysia";
import { handlePayment } from "./handlers/paymentHandler";
import { PayloadObject } from "./types/SepayApiPayload";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.WEBHOOK_URL) {
    console.error("Error: WEBHOOK_URL not set. Please configure .env.");
    process.exit(1);
}
if (!process.env.PRESHARED_API_KEY) {
    console.log("Warning: PRESHARED_API_KEY is not set, do not use in production.\n");
}

const app =
    new Elysia()
        .onError(({ error }) => {
            console.log(error.toString());
            return {
                status: "failed",
                error: error
            }
        })

        .get("/", () => "welcome to maimai?")
        .post('/new-payment', handlePayment, {
            beforeHandle({ headers }) {
                if (process.env.PRESHARED_API_KEY) {
                    if (headers.authorization) {
                        const api_key = headers.authorization.split("Apikey ")[1];
                        if (api_key != process.env.PRESHARED_API_KEY) {
                            return status(401);
                        }
                    } else {
                        return status(401);
                    }
                } else {
                    console.log("Skipping auth, no api key")
                }
            },
            body: PayloadObject,
        })
        .listen(7272);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
